import axios from "axios";
import * as fs from "fs";
import * as path from "path";

/**
 * Transcrever áudio usando OpenAI Whisper API
 */
export async function transcribeAudioWithWhisper(
  audioUrl: string,
  language: string = "en"
): Promise<string> {
  try {
    // Download do áudio
    const audioBuffer = await downloadAudio(audioUrl);

    // Criar FormData para enviar para Whisper
    const formData = new FormData();
    const blob = new Blob([audioBuffer as any], { type: "audio/mpeg" });
    formData.append("file", blob as any, "audio.mp3");
    formData.append("model", "whisper-1");
    formData.append("language", language);

    // Chamar Whisper API
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.text || "";
  } catch (error) {
    console.error("Erro ao transcrever com Whisper:", error);
    throw error;
  }
}

/**
 * Transcrever áudio e retornar também a confiança
 */
export async function transcribeAudioWithConfidence(
  audioUrl: string,
  language: string = "en"
): Promise<{ text: string; confidence: number }> {
  try {
    const text = await transcribeAudioWithWhisper(audioUrl, language);

    // Estimar confiança baseado no comprimento e qualidade
    // Em produção, seria necessário usar a API de detalhes do Whisper
    const confidence = Math.min(100, Math.max(0, text.length * 2));

    return {
      text,
      confidence,
    };
  } catch (error) {
    console.error("Erro ao transcrever com confiança:", error);
    throw error;
  }
}

/**
 * Download de áudio de uma URL
 */
async function downloadAudio(audioUrl: string): Promise<Buffer> {
  try {
    const response = await axios.get(audioUrl, {
      responseType: "arraybuffer",
      timeout: 30000,
    });

    return Buffer.from(response.data);
  } catch (error) {
    console.error("Erro ao fazer download de áudio:", error);
    throw error;
  }
}

/**
 * Cache de transcrições
 */
const transcriptionCache = new Map<string, string>();

export async function transcribeAudioCached(
  audioUrl: string,
  language: string = "en"
): Promise<string> {
  const cacheKey = `${audioUrl}-${language}`;

  if (transcriptionCache.has(cacheKey)) {
    return transcriptionCache.get(cacheKey)!;
  }

  const transcription = await transcribeAudioWithWhisper(audioUrl, language);
  transcriptionCache.set(cacheKey, transcription);

  return transcription;
}

/**
 * Limpar cache de transcrições
 */
export function clearTranscriptionCache(): void {
  transcriptionCache.clear();
}

/**
 * Análise de qualidade de áudio
 */
export async function analyzeAudioQuality(audioUrl: string): Promise<{
  quality: "low" | "medium" | "high";
  noiseLevel: number;
  clarity: number;
  recommendation: string;
}> {
  try {
    const audioBuffer = await downloadAudio(audioUrl);

    // Análise simplificada baseada no tamanho do buffer
    // Em produção, seria necessário análise espectral real
    const fileSize = audioBuffer.length;
    const duration = fileSize / (44100 * 2); // Estimativa

    let quality: "low" | "medium" | "high" = "medium";
    let noiseLevel = 30;
    let clarity = 70;
    let recommendation = "Qualidade de áudio aceitável";

    if (fileSize < 50000) {
      quality = "low";
      noiseLevel = 60;
      clarity = 40;
      recommendation = "Áudio muito curto ou de baixa qualidade. Tente novamente em um ambiente mais silencioso.";
    } else if (fileSize > 500000) {
      quality = "high";
      noiseLevel = 10;
      clarity = 95;
      recommendation = "Excelente qualidade de áudio!";
    }

    return {
      quality,
      noiseLevel,
      clarity,
      recommendation,
    };
  } catch (error) {
    console.error("Erro ao analisar qualidade de áudio:", error);
    return {
      quality: "medium",
      noiseLevel: 50,
      clarity: 60,
      recommendation: "Não foi possível analisar qualidade do áudio",
    };
  }
}

/**
 * Comparar duas transcrições e retornar similaridade
 */
export function compareTranscriptions(
  transcription1: string,
  transcription2: string
): number {
  // Normalizar transcrições
  const norm1 = normalizeText(transcription1);
  const norm2 = normalizeText(transcription2);

  // Calcular similaridade usando Levenshtein distance
  const distance = levenshteinDistance(norm1, norm2);
  const maxLength = Math.max(norm1.length, norm2.length);

  // Converter distância para score de similaridade (0-100)
  const similarity = Math.max(0, 100 - (distance / maxLength) * 100);

  return Math.round(similarity);
}

/**
 * Normalizar texto para comparação
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remover pontuação
    .replace(/\s+/g, " ") // Normalizar espaços
    .trim();
}

/**
 * Calcular distância de Levenshtein entre duas strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
