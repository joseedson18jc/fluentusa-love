import { View, Text, ScrollView, Dimensions } from "react-native";
import { useState } from "react";

interface PronunciationAttempt {
  date: string;
  word: string;
  score: number;
}

interface PronunciationProgressChartProps {
  attempts: PronunciationAttempt[];
  timeRange?: "week" | "month" | "all";
}

export function PronunciationProgressChart({
  attempts,
  timeRange = "month",
}: PronunciationProgressChartProps) {
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 32; // 16px padding on each side

  // Filtrar dados por período
  const filteredAttempts = filterAttemptsByTimeRange(attempts, timeRange);

  // Preparar dados para gráfico de linha (progresso ao longo do tempo)
  const progressData = prepareProgressData(filteredAttempts);

  // Preparar dados para gráfico de barras (score por palavra)
  const wordScoresData = prepareWordScoresData(filteredAttempts);

  // Calcular estatísticas
  const stats = calculateStats(filteredAttempts);

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="p-6 gap-6">
        {/* Estatísticas Resumidas */}
        <View className="grid grid-cols-2 gap-4">
          <StatCard
            label="Média de Score"
            value={`${stats.averageScore.toFixed(1)}%`}
            color="bg-blue-100"
            textColor="text-blue-600"
          />
          <StatCard
            label="Melhor Score"
            value={`${stats.bestScore}%`}
            color="bg-green-100"
            textColor="text-green-600"
          />
          <StatCard
            label="Total de Tentativas"
            value={stats.totalAttempts.toString()}
            color="bg-purple-100"
            textColor="text-purple-600"
          />
          <StatCard
            label="Melhoria"
            value={`${stats.improvement > 0 ? "+" : ""}${stats.improvement.toFixed(1)}%`}
            color={stats.improvement >= 0 ? "bg-green-100" : "bg-red-100"}
            textColor={stats.improvement >= 0 ? "text-green-600" : "text-red-600"}
          />
        </View>

        {/* Gráfico de Progresso */}
        {progressData.labels.length > 0 && (
          <View className="gap-2">
            <Text className="text-lg font-bold text-foreground">
              Progresso ao Longo do Tempo
            </Text>
            <View className="bg-surface rounded-2xl p-4 border border-border">
              <SimpleProgressVisualization data={progressData} />
            </View>
          </View>
        )}

        {/* Gráfico de Barras por Palavra */}
        {wordScoresData.labels.length > 0 && (
          <View className="gap-2">
            <Text className="text-lg font-bold text-foreground">
              Score por Palavra
            </Text>
            <View className="bg-surface rounded-2xl p-4 border border-border">
              <SimpleWordScoresVisualization data={wordScoresData} />
            </View>
          </View>
        )}

        {/* Histórico de Tentativas */}
        <View className="gap-2">
          <Text className="text-lg font-bold text-foreground">
            Histórico Recente
          </Text>
          <View className="gap-2">
            {filteredAttempts.slice(0, 5).map((attempt, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between p-3 bg-surface rounded-lg border border-border"
              >
                <View className="flex-1">
                  <Text className="font-semibold text-foreground">
                    {attempt.word}
                  </Text>
                  <Text className="text-xs text-muted">
                    {new Date(attempt.date).toLocaleDateString("pt-BR")}
                  </Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full ${getScoreBg(attempt.score)}`}
                >
                  <Text
                    className={`font-bold text-sm ${getScoreColor(attempt.score)}`}
                  >
                    {attempt.score}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Spacer */}
        <View className="h-4" />
      </View>
    </ScrollView>
  );
}

// Componente de visualização de progresso simples
function SimpleProgressVisualization({
  data,
}: {
  data: { labels: string[]; scores: number[] };
}) {
  const maxScore = Math.max(...data.scores, 100);

  return (
    <View className="gap-3">
      {data.labels.map((label, index) => (
        <View key={index} className="gap-1">
          <View className="flex-row justify-between">
            <Text className="text-sm font-semibold text-foreground">
              {label}
            </Text>
            <Text className="text-sm font-bold text-primary">
              {data.scores[index]}%
            </Text>
          </View>
          <View className="h-2 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary rounded-full"
              style={{
                width: `${(data.scores[index] / maxScore) * 100}%`,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

// Componente de visualização de scores por palavra
function SimpleWordScoresVisualization({
  data,
}: {
  data: { labels: string[]; scores: number[] };
}) {
  const maxScore = Math.max(...data.scores, 100);

  return (
    <View className="gap-2">
      {data.labels.map((label, index) => (
        <View
          key={index}
          className="flex-row items-center gap-3 p-3 bg-background rounded-lg"
        >
          <View className="flex-1">
            <Text className="font-semibold text-foreground">{label}</Text>
          </View>
          <View
            className="h-8 bg-primary rounded-lg flex-row items-center justify-center px-2"
            style={{
              width: (data.scores[index] / maxScore) * 80 + 20,
            }}
          >
            <Text className="text-xs font-bold text-white">
              {data.scores[index]}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// Componente de Card de Estatística
function StatCard({
  label,
  value,
  color,
  textColor,
}: {
  label: string;
  value: string;
  color: string;
  textColor: string;
}) {
  return (
    <View className={`rounded-xl p-4 ${color}`}>
      <Text className="text-xs text-muted mb-1">{label}</Text>
      <Text className={`text-2xl font-bold ${textColor}`}>{value}</Text>
    </View>
  );
}

// Funções auxiliares
function filterAttemptsByTimeRange(
  attempts: PronunciationAttempt[],
  timeRange: "week" | "month" | "all"
): PronunciationAttempt[] {
  const now = new Date();
  let cutoffDate = new Date();

  if (timeRange === "week") {
    cutoffDate.setDate(now.getDate() - 7);
  } else if (timeRange === "month") {
    cutoffDate.setMonth(now.getMonth() - 1);
  }

  return attempts.filter((attempt) => {
    const attemptDate = new Date(attempt.date);
    return timeRange === "all" || attemptDate >= cutoffDate;
  });
}

function prepareProgressData(attempts: PronunciationAttempt[]) {
  // Agrupar por data e calcular média
  const byDate = new Map<string, number[]>();

  attempts.forEach((attempt) => {
    const date = new Date(attempt.date).toLocaleDateString("pt-BR");
    if (!byDate.has(date)) {
      byDate.set(date, []);
    }
    byDate.get(date)!.push(attempt.score);
  });

  const labels = Array.from(byDate.keys()).slice(-7); // Últimos 7 dias
  const scores = labels.map((date) => {
    const dayScores = byDate.get(date) || [];
    return dayScores.length > 0
      ? Math.round(dayScores.reduce((a, b) => a + b, 0) / dayScores.length)
      : 0;
  });

  return { labels, scores };
}

function prepareWordScoresData(attempts: PronunciationAttempt[]) {
  // Agrupar por palavra e calcular média
  const byWord = new Map<string, number[]>();

  attempts.forEach((attempt) => {
    if (!byWord.has(attempt.word)) {
      byWord.set(attempt.word, []);
    }
    byWord.get(attempt.word)!.push(attempt.score);
  });

  const labels = Array.from(byWord.keys()).slice(0, 5); // Top 5 palavras
  const scores = labels.map((word) => {
    const wordScores = byWord.get(word) || [];
    return wordScores.length > 0
      ? Math.round(wordScores.reduce((a, b) => a + b, 0) / wordScores.length)
      : 0;
  });

  return { labels, scores };
}

function calculateStats(attempts: PronunciationAttempt[]) {
  if (attempts.length === 0) {
    return {
      averageScore: 0,
      bestScore: 0,
      totalAttempts: 0,
      improvement: 0,
    };
  }

  const scores = attempts.map((a) => a.score);
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const bestScore = Math.max(...scores);
  const totalAttempts = attempts.length;

  // Calcular melhoria (últimas 5 vs primeiras 5)
  const firstHalf = scores.slice(0, Math.ceil(scores.length / 2));
  const secondHalf = scores.slice(Math.ceil(scores.length / 2));

  const firstAvg =
    firstHalf.length > 0
      ? firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
      : 0;
  const secondAvg =
    secondHalf.length > 0
      ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
      : 0;

  const improvement = secondAvg - firstAvg;

  return {
    averageScore,
    bestScore,
    totalAttempts,
    improvement,
  };
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-yellow-600";
  return "text-orange-600";
}

function getScoreBg(score: number) {
  if (score >= 90) return "bg-green-100";
  if (score >= 75) return "bg-blue-100";
  if (score >= 60) return "bg-yellow-100";
  return "bg-orange-100";
}
