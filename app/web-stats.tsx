import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function WebStatsScreen() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("week");

  // Mock data for charts
  const weekData = [
    { day: "Seg", score: 75 },
    { day: "Ter", score: 82 },
    { day: "Qua", score: 88 },
    { day: "Qui", score: 85 },
    { day: "Sex", score: 92 },
    { day: "Sáb", score: 89 },
    { day: "Dom", score: 95 },
  ];

  const maxScore = Math.max(...weekData.map((d) => d.score));

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-rose-50 via-white to-purple-50">
      {/* Header */}
      <View className="px-6 py-6 gap-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-foreground">Estatísticas</Text>
          <View className="w-6" />
        </View>

        {/* Time Range Selector */}
        <View className="flex-row gap-2">
          {["week", "month", "year"].map((range) => (
            <TouchableOpacity
              key={range}
              onPress={() => setTimeRange(range)}
              className={`flex-1 py-2 px-3 rounded-lg border ${
                timeRange === range
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 border-transparent"
                  : "bg-white border-border"
              }`}
            >
              <Text
                className={`text-xs font-bold text-center ${
                  timeRange === range ? "text-white" : "text-foreground"
                }`}
              >
                {range === "week"
                  ? "Semana"
                  : range === "month"
                  ? "Mês"
                  : "Ano"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Summary Cards */}
      <View className="px-6 py-4 gap-3">
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-2xl p-4 border border-blue-100 gap-2">
            <Text className="text-sm text-muted">Média Semanal</Text>
            <Text className="text-3xl font-bold text-blue-600">87%</Text>
            <Text className="text-xs text-green-600">↑ 5% vs semana anterior</Text>
          </View>

          <View className="flex-1 bg-white rounded-2xl p-4 border border-purple-100 gap-2">
            <Text className="text-sm text-muted">Melhor Score</Text>
            <Text className="text-3xl font-bold text-purple-600">95%</Text>
            <Text className="text-xs text-muted">Domingo passado</Text>
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-2xl p-4 border border-green-100 gap-2">
            <Text className="text-sm text-muted">Sessões</Text>
            <Text className="text-3xl font-bold text-green-600">7</Text>
            <Text className="text-xs text-muted">Praticou todos os dias</Text>
          </View>

          <View className="flex-1 bg-white rounded-2xl p-4 border border-red-100 gap-2">
            <Text className="text-sm text-muted">Streak</Text>
            <Text className="text-3xl font-bold text-red-600">7 🔥</Text>
            <Text className="text-xs text-muted">Dias consecutivos</Text>
          </View>
        </View>
      </View>

      {/* Chart Section */}
      <View className="px-6 py-6 gap-4">
        <Text className="text-lg font-bold text-foreground">Progresso Semanal</Text>

        <View className="bg-white rounded-2xl p-6 border border-border gap-6">
          {/* Bar Chart */}
          <View className="gap-4">
            <View className="flex-row items-end justify-between h-40 gap-2">
              {weekData.map((data, idx) => (
                <View key={idx} className="flex-1 items-center gap-2">
                  <View className="flex-1 w-full bg-gradient-to-t from-rose-500 to-purple-600 rounded-t-lg relative justify-end">
                    <View
                      className="w-full bg-gradient-to-t from-rose-500 to-purple-600 rounded-t-lg"
                      style={{
                        height: `${(data.score / maxScore) * 100}%`,
                      }}
                    />
                  </View>
                  <Text className="text-xs font-bold text-foreground">
                    {data.day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Legend */}
            <View className="flex-row items-center justify-center gap-4 pt-4 border-t border-border">
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-600" />
                <Text className="text-xs text-muted">Score de Pronúncia</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Performance by Module */}
      <View className="px-6 py-6 gap-4">
        <Text className="text-lg font-bold text-foreground">Performance por Módulo</Text>

        {[
          { name: "Greetings", score: 95, color: "from-blue-400 to-cyan-400" },
          {
            name: "Daily Routines",
            score: 82,
            color: "from-orange-400 to-red-400",
          },
          {
            name: "Dating & Love",
            score: 88,
            color: "from-rose-400 to-pink-400",
          },
          {
            name: "Food & Dining",
            score: 75,
            color: "from-yellow-400 to-orange-400",
          },
        ].map((module, idx) => (
          <View
            key={idx}
            className="bg-white rounded-xl p-4 border border-border gap-3"
          >
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-foreground">{module.name}</Text>
              <View className={`bg-gradient-to-r ${module.color} px-3 py-1 rounded-full`}>
                <Text className="text-sm font-bold text-white">{module.score}%</Text>
              </View>
            </View>

            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View
                className={`h-full bg-gradient-to-r ${module.color} rounded-full`}
                style={{ width: `${module.score}%` }}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Insights */}
      <View className="px-6 py-6 gap-4">
        <Text className="text-lg font-bold text-foreground">Insights</Text>

        <View className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200 gap-2">
          <View className="flex-row items-start gap-3">
            <Text className="text-2xl">💡</Text>
            <View className="flex-1 gap-1">
              <Text className="font-bold text-blue-900">Você está melhorando!</Text>
              <Text className="text-sm text-blue-800">
                Sua acurácia aumentou 12% na última semana. Continue praticando!
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200 gap-2">
          <View className="flex-row items-start gap-3">
            <Text className="text-2xl">🎯</Text>
            <View className="flex-1 gap-1">
              <Text className="font-bold text-purple-900">Foco no Dating</Text>
              <Text className="text-sm text-purple-800">
                Você tem 88% em Dating & Love. Que tal explorar Travel agora?
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 gap-2">
          <View className="flex-row items-start gap-3">
            <Text className="text-2xl">🔥</Text>
            <View className="flex-1 gap-1">
              <Text className="font-bold text-green-900">Streak Incrível!</Text>
              <Text className="text-sm text-green-800">
                Você tem 7 dias de streak. Mais 3 dias e desbloqueará um badge especial!
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* CTA */}
      <View className="px-6 py-8 gap-4">
        <TouchableOpacity className="bg-gradient-to-r from-rose-500 to-purple-600 py-4 rounded-xl items-center">
          <Text className="text-white font-bold text-lg">Continuar Praticando</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-white border border-border py-4 rounded-xl items-center">
          <Text className="text-foreground font-bold">Exportar Relatório</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
