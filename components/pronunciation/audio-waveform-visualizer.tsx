import { View, Text, Dimensions } from "react-native";
import { useEffect, useState } from "react";

interface AudioWaveformVisualizerProps {
  userAudioUrl: string;
  nativeAudioUrl: string;
  height?: number;
}

export function AudioWaveformVisualizer({
  userAudioUrl,
  nativeAudioUrl,
  height = 200,
}: AudioWaveformVisualizerProps) {
  const screenWidth = Dimensions.get("window").width;
  const [userWaveform, setUserWaveform] = useState<number[]>([]);
  const [nativeWaveform, setNativeWaveform] = useState<number[]>([]);

  useEffect(() => {
    // Simular geração de waveform
    // Em produção, seria necessário processar áudio real
    generateMockWaveform(userAudioUrl).then(setUserWaveform);
    generateMockWaveform(nativeAudioUrl).then(setNativeWaveform);
  }, [userAudioUrl, nativeAudioUrl]);

  const barWidth = 2;
  const barGap = 1;
  const barsPerRow = Math.floor((screenWidth - 32) / (barWidth + barGap));

  return (
    <View className="gap-4">
      {/* Waveform do Usuário */}
      <View className="gap-2">
        <Text className="text-sm font-semibold text-foreground">
          Sua Pronúncia
        </Text>
        <View
          className="bg-background rounded-lg border border-border p-3"
          style={{ height }}
        >
          <WaveformBars
            data={userWaveform}
            color="#FF6B9D"
            barWidth={barWidth}
            barGap={barGap}
            barsPerRow={barsPerRow}
            height={height - 24}
          />
        </View>
      </View>

      {/* Waveform Nativo */}
      <View className="gap-2">
        <Text className="text-sm font-semibold text-foreground">
          Pronúncia Nativa
        </Text>
        <View
          className="bg-background rounded-lg border border-border p-3"
          style={{ height }}
        >
          <WaveformBars
            data={nativeWaveform}
            color="#4CAF50"
            barWidth={barWidth}
            barGap={barGap}
            barsPerRow={barsPerRow}
            height={height - 24}
          />
        </View>
      </View>

      {/* Comparação Visual */}
      <View className="gap-2">
        <Text className="text-sm font-semibold text-foreground">
          Comparação
        </Text>
        <View className="bg-surface rounded-lg border border-border p-4 gap-3">
          <ComparisonMetric
            label="Similaridade Geral"
            value={calculateSimilarity(userWaveform, nativeWaveform)}
          />
          <ComparisonMetric
            label="Intensidade Média"
            value={calculateAverageIntensity(userWaveform)}
            comparison={calculateAverageIntensity(nativeWaveform)}
          />
          <ComparisonMetric
            label="Variação de Frequência"
            value={calculateFrequencyVariation(userWaveform)}
            comparison={calculateFrequencyVariation(nativeWaveform)}
          />
        </View>
      </View>
    </View>
  );
}

// Componente de barras de waveform
function WaveformBars({
  data,
  color,
  barWidth,
  barGap,
  barsPerRow,
  height,
}: {
  data: number[];
  color: string;
  barWidth: number;
  barGap: number;
  barsPerRow: number;
  height: number;
}) {
  if (data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-sm text-muted">Carregando waveform...</Text>
      </View>
    );
  }

  // Amostra os dados para caber na tela
  const sampledData = sampleArray(data, barsPerRow);
  const maxValue = Math.max(...sampledData, 1);

  return (
    <View className="flex-1 flex-row items-center justify-center gap-0.5">
      {sampledData.map((value, index) => {
        const barHeight = (value / maxValue) * (height - 10);
        const backgroundColor = getColorForValue(value / maxValue, color);

        return (
          <View
            key={index}
            className="rounded-full"
            style={{
              width: barWidth,
              height: barHeight,
              backgroundColor,
              marginHorizontal: barGap / 2,
            }}
          />
        );
      })}
    </View>
  );
}

// Componente de métrica de comparação
function ComparisonMetric({
  label,
  value,
  comparison,
}: {
  label: string;
  value: number;
  comparison?: number;
}) {
  const percentage = comparison ? (value / comparison) * 100 : 100;
  const isGood = percentage >= 80 && percentage <= 120;
  const color = isGood ? "text-green-600" : "text-orange-600";

  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-sm text-foreground">{label}</Text>
      <View className="flex-row items-center gap-2">
        <Text className={`font-semibold ${color}`}>{value.toFixed(1)}</Text>
        {comparison && (
          <>
            <Text className="text-xs text-muted">/</Text>
            <Text className="text-xs text-muted">{comparison.toFixed(1)}</Text>
            <Text className={`text-xs font-bold ${color}`}>
              {percentage.toFixed(0)}%
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

// Funções auxiliares
async function generateMockWaveform(audioUrl: string): Promise<number[]> {
  // Simular geração de waveform
  // Em produção, seria necessário processar áudio real com Web Audio API
  const length = 128;
  const waveform: number[] = [];

  for (let i = 0; i < length; i++) {
    const frequency = Math.sin((i / length) * Math.PI * 2);
    const amplitude = Math.sin((i / length) * Math.PI * 4);
    const noise = Math.random() * 0.2;
    waveform.push(Math.abs(frequency * amplitude + noise));
  }

  return waveform;
}

function sampleArray(arr: number[], sampleSize: number): number[] {
  if (arr.length <= sampleSize) {
    return arr;
  }

  const sampled: number[] = [];
  const step = arr.length / sampleSize;

  for (let i = 0; i < sampleSize; i++) {
    const index = Math.floor(i * step);
    sampled.push(arr[index]);
  }

  return sampled;
}

function getColorForValue(
  normalizedValue: number,
  baseColor: string
): string {
  // Retornar cor com opacidade baseada no valor
  if (normalizedValue > 0.8) {
    return baseColor; // Cor completa
  } else if (normalizedValue > 0.5) {
    return baseColor + "CC"; // 80% opacidade
  } else if (normalizedValue > 0.3) {
    return baseColor + "99"; // 60% opacidade
  } else {
    return baseColor + "66"; // 40% opacidade
  }
}

function calculateSimilarity(arr1: number[], arr2: number[]): number {
  if (arr1.length === 0 || arr2.length === 0) {
    return 0;
  }

  const minLength = Math.min(arr1.length, arr2.length);
  let similarity = 0;

  for (let i = 0; i < minLength; i++) {
    const diff = Math.abs(arr1[i] - arr2[i]);
    similarity += 1 - Math.min(diff, 1);
  }

  return (similarity / minLength) * 100;
}

function calculateAverageIntensity(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateFrequencyVariation(arr: number[]): number {
  if (arr.length < 2) return 0;

  let variation = 0;
  for (let i = 1; i < arr.length; i++) {
    variation += Math.abs(arr[i] - arr[i - 1]);
  }

  return variation / (arr.length - 1);
}
