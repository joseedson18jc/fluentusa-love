/**
 * Módulo de análise de pitch (tom) para detecção de entonação
 * Detecta diferenças de frequência fundamental entre áudio do usuário e nativo
 */

export interface PitchAnalysis {
  fundamentalFrequency: number; // Hz
  averagePitch: number; // Hz
  pitchRange: {
    min: number; // Hz
    max: number; // Hz
  };
  stability: number; // 0-100 (quanto mais estável, melhor)
  vibrato: {
    detected: boolean;
    frequency: number; // Hz
    depth: number; // cents
  };
  intonationAccuracy: number; // 0-100
}

export interface PitchComparison {
  userPitch: PitchAnalysis;
  nativePitch: PitchAnalysis;
  pitchDifference: number; // cents
  intonationScore: number; // 0-100
  feedback: {
    overall: string;
    strengths: string[];
    improvements: string[];
  };
}

/**
 * Analisar pitch de um arquivo de áudio
 * Simula análise usando padrões de frequência
 */
export async function analyzePitch(audioUrl: string): Promise<PitchAnalysis> {
  try {
    // Em produção, seria necessário processar áudio real com FFT
    // Por enquanto, simulamos com padrões realistas

    const fundamentalFrequency = simulateFundamentalFrequency();
    const averagePitch = fundamentalFrequency + Math.random() * 20 - 10;
    const stability = Math.random() * 30 + 70; // 70-100
    const vibratoDetected = Math.random() > 0.5;

    return {
      fundamentalFrequency,
      averagePitch,
      pitchRange: {
        min: fundamentalFrequency - 50,
        max: fundamentalFrequency + 50,
      },
      stability,
      vibrato: {
        detected: vibratoDetected,
        frequency: vibratoDetected ? 5 + Math.random() * 2 : 0, // 5-7 Hz típico
        depth: vibratoDetected ? 50 + Math.random() * 50 : 0, // 50-100 cents
      },
      intonationAccuracy: Math.random() * 40 + 60, // 60-100
    };
  } catch (error) {
    console.error("Erro ao analisar pitch:", error);
    throw error;
  }
}

/**
 * Comparar pitch entre áudio do usuário e nativo
 */
export async function comparePitch(
  userAudioUrl: string,
  nativeAudioUrl: string
): Promise<PitchComparison> {
  try {
    const userPitch = await analyzePitch(userAudioUrl);
    const nativePitch = await analyzePitch(nativeAudioUrl);

    // Calcular diferença em cents (1 semitom = 100 cents)
    const pitchDifference = calculateCentsDifference(
      userPitch.fundamentalFrequency,
      nativePitch.fundamentalFrequency
    );

    // Calcular score de entonação
    const intonationScore = calculateIntonationScore(
      userPitch,
      nativePitch,
      pitchDifference
    );

    // Gerar feedback
    const feedback = generatePitchFeedback(
      userPitch,
      nativePitch,
      pitchDifference,
      intonationScore
    );

    return {
      userPitch,
      nativePitch,
      pitchDifference,
      intonationScore,
      feedback,
    };
  } catch (error) {
    console.error("Erro ao comparar pitch:", error);
    throw error;
  }
}

/**
 * Calcular diferença em cents entre duas frequências
 * 1 semitom = 100 cents
 */
function calculateCentsDifference(freq1: number, freq2: number): number {
  if (freq1 <= 0 || freq2 <= 0) return 0;
  return 1200 * Math.log2(freq1 / freq2);
}

/**
 * Calcular score de entonação (0-100)
 */
function calculateIntonationScore(
  userPitch: PitchAnalysis,
  nativePitch: PitchAnalysis,
  pitchDifference: number
): number {
  // Fatores:
  // 1. Diferença de pitch (ideal: < 50 cents)
  // 2. Estabilidade (ideal: > 80)
  // 3. Vibrato (se presente no nativo, deve estar presente no usuário)

  let score = 100;

  // Penalidade por diferença de pitch
  const pitchDiffPenalty = Math.min(50, Math.abs(pitchDifference) / 2);
  score -= pitchDiffPenalty;

  // Penalidade por falta de estabilidade
  const stabilityPenalty = Math.max(0, 80 - userPitch.stability) * 0.3;
  score -= stabilityPenalty;

  // Penalidade por vibrato inconsistente
  if (nativePitch.vibrato.detected && !userPitch.vibrato.detected) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Gerar feedback de pitch
 */
function generatePitchFeedback(
  userPitch: PitchAnalysis,
  nativePitch: PitchAnalysis,
  pitchDifference: number,
  intonationScore: number
): { overall: string; strengths: string[]; improvements: string[] } {
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Análise de pitch
  if (Math.abs(pitchDifference) < 25) {
    strengths.push("Pitch muito próximo ao nativo");
  } else if (Math.abs(pitchDifference) < 50) {
    strengths.push("Pitch razoavelmente próximo");
  } else {
    improvements.push(
      pitchDifference > 0
        ? "Seu pitch está mais alto que o nativo. Tente falar mais grave."
        : "Seu pitch está mais baixo que o nativo. Tente falar mais agudo."
    );
  }

  // Análise de estabilidade
  if (userPitch.stability > 85) {
    strengths.push("Excelente estabilidade de pitch");
  } else if (userPitch.stability > 75) {
    strengths.push("Boa estabilidade de pitch");
  } else {
    improvements.push(
      "Sua entonação oscila muito. Tente manter um pitch mais consistente."
    );
  }

  // Análise de vibrato
  if (nativePitch.vibrato.detected) {
    if (userPitch.vibrato.detected) {
      strengths.push("Vibrato natural detectado");
    } else {
      improvements.push(
        "Adicione um pouco de vibrato para soar mais natural (como no nativo)."
      );
    }
  }

  // Gerar feedback geral
  let overall = "";
  if (intonationScore >= 90) {
    overall =
      "Excelente entonação! Seu pitch e ritmo estão muito próximos do nativo.";
  } else if (intonationScore >= 75) {
    overall =
      "Boa entonação! Com pequenos ajustes, você soará muito mais natural.";
  } else if (intonationScore >= 60) {
    overall =
      "Entonação aceitável. Continue praticando para melhorar a consistência.";
  } else {
    overall =
      "Trabalhe na entonação. Ouça o nativo várias vezes e tente imitar o pitch.";
  }

  return {
    overall,
    strengths,
    improvements,
  };
}

/**
 * Simular frequência fundamental realista
 * Vozes masculinas: 85-180 Hz
 * Vozes femininas: 165-255 Hz
 */
function simulateFundamentalFrequency(): number {
  // Simular voz masculina (mais comum em exemplos)
  return 100 + Math.random() * 80; // 100-180 Hz
}

/**
 * Detectar padrão de entonação (declarativa, interrogativa, etc)
 */
export function detectIntonationPattern(
  pitchAnalysis: PitchAnalysis
): "declarative" | "interrogative" | "emphatic" | "neutral" {
  const { fundamentalFrequency, pitchRange } = pitchAnalysis;
  const range = pitchRange.max - pitchRange.min;

  // Entonação interrogativa: pitch sobe no final (range alto)
  if (range > 100) {
    return "interrogative";
  }

  // Entonação enfática: pitch muito alto ou muito baixo
  if (fundamentalFrequency > 150 || fundamentalFrequency < 100) {
    return "emphatic";
  }

  // Entonação declarativa: pitch cai no final (padrão)
  return "declarative";
}

/**
 * Calcular score de naturalidade baseado em pitch
 * Considera vibrato, estabilidade e padrão de entonação
 */
export function calculateNaturalnessScore(pitchAnalysis: PitchAnalysis): number {
  let score = 50; // Base

  // Vibrato natural adiciona naturalidade
  if (pitchAnalysis.vibrato.detected) {
    score += 20;
  }

  // Estabilidade boa
  if (pitchAnalysis.stability > 80) {
    score += 15;
  }

  // Pitch range apropriado
  const range = pitchAnalysis.pitchRange.max - pitchAnalysis.pitchRange.min;
  if (range > 50 && range < 150) {
    score += 15;
  }

  return Math.min(100, score);
}

/**
 * Cache de análises de pitch
 */
const pitchCache = new Map<string, PitchAnalysis>();

export async function analyzePitchCached(
  audioUrl: string
): Promise<PitchAnalysis> {
  if (pitchCache.has(audioUrl)) {
    return pitchCache.get(audioUrl)!;
  }

  const analysis = await analyzePitch(audioUrl);
  pitchCache.set(audioUrl, analysis);

  return analysis;
}

export function clearPitchCache(): void {
  pitchCache.clear();
}
