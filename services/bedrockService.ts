import OpenAI from 'openai';

// Load environment variables for Amazon Bedrock Mantle OpenAI-compatible endpoints
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
const baseURL = import.meta.env.VITE_BEDROCK_CHAT_BASE_URL || 'https://bedrock-mantle.ap-south-1.api.aws/v1';

export type ModelPurpose = 'questions' | 'report' | 'default';

export const AI_MODELS: Record<ModelPurpose, string> = {
  questions: import.meta.env.VITE_BEDROCK_MODEL_QUESTIONS || 'nvidia.nemotron-nano-9b-v2',
  report: import.meta.env.VITE_BEDROCK_MODEL_REPORT || 'nvidia.nemotron-nano-3-30b',
  default: import.meta.env.VITE_BEDROCK_MODEL_DEFAULT || 'zai.glm-4.7-flash',
};

// Initialize OpenAI client
export const aiClient = new OpenAI({
  apiKey,
  baseURL,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'OpenAI-Project': import.meta.env.VITE_ANTHROPIC_WORKSPACE_ID || 'default',
  },
});

/** Resolves model ID by workload purpose */
export function getModelByPurpose(purpose: ModelPurpose): string {
  return AI_MODELS[purpose] || AI_MODELS.default;
}

/** Strips internal reasoning/thinking tags, markdown artifacts, and conversational prefixes for natural speech */
export function cleanReasoningContent(text: string): string {
  if (!text) return '';
  // 1. Remove complete <think>...</think> blocks
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '');
  // 2. In case model outputs only text after an opening or closing think tag
  if (cleaned.includes('</think>')) {
    cleaned = cleaned.split('</think>').pop() || '';
  }
  // 3. Remove any remaining stray <think> or </think> tags
  cleaned = cleaned.replace(/<\/?think>/gi, '');
  // 4. Strip markdown bold/italics symbols for smooth speech
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
  // 5. Remove conversational role prefix labels if model outputs them (e.g. "Interviewer:", "AI:")
  cleaned = cleaned.replace(/^(?:Interviewer|AI|Assistant|Recruiter|Speaker):\s*/i, '');
  // 6. Strip enclosing outer quotes if any
  cleaned = cleaned.replace(/^["']\s*|\s*["']$/g, '');
  return cleaned.trim();
}

/** Single Model Invocation Function (uses default model) */
export async function generateSingleModelResponse(prompt: string): Promise<string | null> {
  const response = await aiClient.chat.completions.create({
    model: AI_MODELS.default,
    messages: [
      { role: 'system', content: 'You are a helpful AI assistant.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
  });

  const raw = response.choices[0]?.message?.content ?? null;
  return raw ? cleanReasoningContent(raw) : null;
}

/** Core Multi-Model Chat Completion Call */
export async function callAIModel(
  purpose: ModelPurpose,
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  temperature = 0.5,
  maxTokens?: number
): Promise<string> {
  const targetModel = getModelByPurpose(purpose);
  console.log(`[Bedrock AI Call] Purpose: ${purpose} | Selected Model: ${targetModel}`);

  // Ensure messages array is never empty and contains at least one user message
  const validMessages = messages.filter(m => m && m.content && m.content.trim().length > 0);
  if (validMessages.length === 0) {
    validMessages.push({ role: 'user', content: 'Hello' });
  } else if (validMessages.length === 1 && validMessages[0].role === 'system') {
    // If only system message is present, add a user prompt so backend template doesn't error with "list object has no element -1"
    validMessages.push({ role: 'user', content: 'Please proceed according to the system instructions.' });
  }

  const params: OpenAI.Chat.ChatCompletionCreateParamsNonStreaming = {
    model: targetModel,
    messages: validMessages,
    temperature,
  };
  if (maxTokens) {
    params.max_tokens = maxTokens;
  }

  const response = await aiClient.chat.completions.create(params);
  const raw = response.choices[0]?.message?.content ?? '';
  return cleanReasoningContent(raw);
}

/** One-shot text generation */
export async function bedrockGenerateText(
  systemPrompt: string,
  userPrompt: string,
  purpose: ModelPurpose = 'default',
  temperature = 0.5,
  maxTokens?: number
): Promise<string> {
  return callAIModel(
    purpose,
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt || 'Please proceed.' },
    ],
    temperature,
    maxTokens
  );
}

/** Multi-turn chat conversation */
export async function bedrockChat(
  systemPrompt: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  purpose: ModelPurpose = 'default',
  temperature = 0.7
): Promise<string> {
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [];
  if (systemPrompt && systemPrompt.trim()) {
    messages.push({ role: 'system', content: systemPrompt.trim() });
  }
  
  if (history && history.length > 0) {
    for (const h of history) {
      if (h && h.content && h.content.trim()) {
        messages.push({
          role: h.role === 'assistant' ? 'assistant' : 'user',
          content: h.content.trim(),
        });
      }
    }
  }

  // Ensure there is at least one user message
  const hasUserMessage = messages.some(m => m.role === 'user');
  if (!hasUserMessage) {
    messages.push({ role: 'user', content: 'Please start the conversation.' });
  }

  return callAIModel(
    purpose,
    messages,
    temperature
  );
}

/** Resume extraction helper */
export function extractResumeText(base64Resume: string, mimeType: string, maxChars = 5000): string {
  if (!base64Resume) return '';
  const isTextBased = mimeType.startsWith('text/') || mimeType === 'application/json';
  let raw = '';
  if (isTextBased) {
    try { raw = atob(base64Resume); } catch { raw = base64Resume; }
  } else {
    try {
      const decoded = atob(base64Resume);
      const printable = decoded.split('').filter(c => c.charCodeAt(0) >= 32 && c.charCodeAt(0) < 127).length;
      if (printable / decoded.length > 0.2) raw = decoded;
    } catch { /* ignore binary */ }
  }
  if (!raw) return '(Resume binary/unreadable format. Evaluate based on provided details.)';
  return raw.length > maxChars ? raw.slice(0, maxChars) + '…' : raw;
}

/** Resume-aware prompt execution */
export async function bedrockGenerateWithResume(
  systemPrompt: string,
  textPrompt: string,
  base64Resume: string,
  mimeType: string,
  purpose: ModelPurpose = 'default',
  temperature = 0.5,
  maxTokens?: number,
  resumeTextContent?: string
): Promise<string> {
  const resumeText = resumeTextContent || extractResumeText(base64Resume, mimeType);
  const fullUserMessage = resumeText ? `${textPrompt}\n\n[Resume]\n${resumeText}` : textPrompt;
  return bedrockGenerateText(systemPrompt, fullUserMessage, purpose, temperature, maxTokens);
}
