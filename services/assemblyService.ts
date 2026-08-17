/**
 * services/assemblyService.ts
 * AssemblyAI Audio Upload & High-Accuracy Speech-to-Text Engine
 */

const ASSEMBLYAI_API_KEY = import.meta.env.VITE_ASSEMBLYAI_API_KEY || '4a07d7f7399f447b9ff969c458df945f';
const UPLOAD_ENDPOINT = 'https://api.assemblyai.com/v2/upload';
const TRANSCRIPT_ENDPOINT = 'https://api.assemblyai.com/v2/transcript';

/** Upload raw audio Blob directly to AssemblyAI */
export async function uploadAudioToAssemblyAI(audioBlob: Blob): Promise<string> {
  const response = await fetch(UPLOAD_ENDPOINT, {
    method: 'POST',
    headers: {
      'authorization': ASSEMBLYAI_API_KEY,
      'content-type': 'application/octet-stream',
    },
    body: audioBlob,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AssemblyAI Upload Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.upload_url;
}

/** Request and poll transcription until completion */
export async function transcribeAudioBlobWithAssemblyAI(
  audioBlob: Blob,
  languageCode = 'en'
): Promise<string> {
  try {
    // 1. Upload audio
    const uploadUrl = await uploadAudioToAssemblyAI(audioBlob);

    // 2. Submit transcription job
    const submitBody: any = {
      audio_url: uploadUrl,
      language_code: languageCode,
      punctuate: true,
      format_text: true,
    };
    if (languageCode !== 'en') {
      submitBody.speech_model = 'nano';
    }

    const startRes = await fetch(TRANSCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'authorization': ASSEMBLYAI_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(submitBody),
    });

    if (!startRes.ok) {
      const errText = await startRes.text();
      throw new Error(`AssemblyAI Transcript Error: ${errText}`);
    }

    const { id: transcriptId } = await startRes.json();

    // 3. Poll for result (max 20 attempts ~ 15 seconds)
    for (let i = 0; i < 25; i++) {
      await new Promise((r) => setTimeout(r, 750));

      const pollRes = await fetch(`${TRANSCRIPT_ENDPOINT}/${transcriptId}`, {
        headers: { authorization: ASSEMBLYAI_API_KEY },
      });

      if (!pollRes.ok) continue;

      const pollData = await pollRes.json();
      if (pollData.status === 'completed') {
        return (pollData.text || '').trim();
      }
      if (pollData.status === 'error') {
        throw new Error(pollData.error || 'Transcription failed');
      }
    }

    return '';
  } catch (err: any) {
    console.error('[AssemblyAI] Transcription error:', err);
    throw err;
  }
}
