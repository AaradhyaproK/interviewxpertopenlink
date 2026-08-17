// ── Bedrock AI Service Wrapper (Formerly Grok Service) ──────────────────────
// Re-routes all AI calls to Amazon Bedrock Mantle OpenAI-compatible endpoints
// with purpose-based model routing:
// - Questions generation -> VITE_BEDROCK_MODEL_QUESTIONS
// - Candidate report -> VITE_BEDROCK_MODEL_REPORT
// - Default / Copilot -> VITE_BEDROCK_MODEL_DEFAULT

import {
  bedrockGenerateText,
  bedrockGenerateWithResume,
  bedrockChat,
  ModelPurpose
} from './bedrockService';

const MAX_TOKENS_QUESTIONS = 500;
const MAX_TOKENS_FEEDBACK = 1200;

/** One-shot text generation */
export async function grokGenerateText(
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.5,
  maxTokens?: number,
  purpose: ModelPurpose = 'default'
): Promise<string> {
  return bedrockGenerateText(systemPrompt, userPrompt, purpose, temperature, maxTokens);
}

/** Resume-aware generation */
export async function grokGenerateWithResume(
  systemPrompt: string,
  textPrompt: string,
  base64Resume: string,
  mimeType: string,
  temperature = 0.5,
  maxTokens?: number,
  resumeTextContent?: string,
  purpose: ModelPurpose = 'default'
): Promise<string> {
  return bedrockGenerateWithResume(
    systemPrompt,
    textPrompt,
    base64Resume,
    mimeType,
    purpose,
    temperature,
    maxTokens,
    resumeTextContent
  );
}

/** Multi-turn chat */
export async function grokChat(
  systemPrompt: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  temperature = 0.7,
  purpose: ModelPurpose = 'default'
): Promise<string> {
  return bedrockChat(systemPrompt, history, purpose, temperature);
}

export const BUDGET = {
  QUESTIONS: MAX_TOKENS_QUESTIONS,
  FEEDBACK: MAX_TOKENS_FEEDBACK,
};
