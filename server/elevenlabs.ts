import axios from "axios";
import { storagePut } from "./storage";

/**
 * Gerar áudio com ElevenLabs
 */
export async function generateSpeech(
  text: string,
  voiceId?: string,
  modelId?: string
): Promise<string> {
  const VOICE_ID = voiceId || process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // Rachel
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  const MODEL_ID = modelId || process.env.ELEVENLABS_MODEL_ID || "eleven_monolingual_v1";

  if (!API_KEY) {
    console.warn("ELEVENLABS_API_KEY não configurada, usando mock");
    return "https://example.com/audio-mock.mp3";
  }

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true,
        },
      },
      {
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Upload para S3
    const audioBuffer = Buffer.from(response.data);
    const timestamp = Date.now();
    const filename = `audio/tts-${timestamp}-${Math.random().toString(36).substr(2, 9)}.mp3`;

    const { url } = await storagePut(filename, audioBuffer, "audio/mpeg");

    return url;
  } catch (error) {
    console.error("Erro ao gerar áudio ElevenLabs:", error);
    // Retornar URL de mock em caso de erro
    return "https://example.com/audio-error.mp3";
  }
}

/**
 * Cache de áudio para evitar gerar o mesmo áudio múltiplas vezes
 */
const audioCache = new Map<string, string>();

export async function generateSpeechCached(
  text: string,
  voiceId?: string
): Promise<string> {
  const cacheKey = `${text.toLowerCase()}-${voiceId || "default"}`;

  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey)!;
  }

  const audioUrl = await generateSpeech(text, voiceId);
  audioCache.set(cacheKey, audioUrl);

  return audioUrl;
}

/**
 * Limpar cache de áudio
 */
export function clearAudioCache(): void {
  audioCache.clear();
}

/**
 * Gerar múltiplos áudios em paralelo
 */
export async function generateMultipleSpeech(
  texts: string[],
  voiceId?: string
): Promise<string[]> {
  return Promise.all(texts.map((text) => generateSpeechCached(text, voiceId)));
}
