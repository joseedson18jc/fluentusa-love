import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export default function WebDashboardScreen() {
  const router = useRouter();
  const [userName] = useState("José");
  const [stats] = useState({
    level: "B1",
    points: 2450,
    streak: 7,
    accuracy: 87,
  });

  const [badges] = useState([
    { id: 1, icon: "⭐", name: "Perfeição", color: "bg-yellow-100" },
    { id: 2, icon: "❤️", name: "Streak 7 Dias", color: "bg-red-100" },
    { id: 3, icon: "🚀", name: "Salto de Progresso", color: "bg-blue-100" },
    { id: 4, icon: "💪", name: "Dedicado", color: "bg-purple-100" },
  ]);

  const [recentActivities] = useState([
    { id: 1, word: "Beautiful", score: 92, date: "Hoje" },
    { id: 2, word: "Love", score: 95, date: "Ontem" },
    { id: 3, word: "Hello", score: 88, date: "2 dias atrás" },
  ]);

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-rose-50 via-white to-purple-50">
      {/* Header */}
      <View className="px-6 py-6 gap-4">
        <View className="flex-row items-center justify-between">
          <View className="gap-1">
            <Text className="text-sm text-muted">Bem-vindo de volta,</Text>
            <Text className="text-3xl font-bold text-foreground">{userName} 💕</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-purple-200 items-center justify-center"
          >
            <Text className="text-xl">⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Frase do Dia */}
        <TouchableOpacity className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-6 gap-3">
          <Text className="text-white text-sm font-semibold opacity-90">
            Frase do Dia
          </Text>
          <Text className="text-white text-xl font-bold">
            "I love you more than words can say"
          </Text>
          <Text className="text-white/80 text-sm">
            Eu te amo mais do que palavras podem dizer
          </Text>
          <TouchableOpacity className="mt-2 flex-row items-center gap-2">
            <Text className="text-white text-sm font-semibold">Ouvir 🔊</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View className="px-6 py-4 gap-3">
        <View className="flex-row gap-3">
          {/* Level */}
          <View className="flex-1 bg-white rounded-2xl p-4 border border-blue-100 gap-2">
            <Text className="text-2xl">🎯</Text>
            <Text className="text-xs text-muted">Nível</Text>
            <Text className="text-2xl font-bold text-blue-600">{stats.level}</Text>
          </View>

          {/* Points */}
          <View className="flex-1 bg-white rounded-2xl p-4 border border-purple-100 gap-2">
            <Text className="text-2xl">⭐</Text>
            <Text className="text-xs text-muted">Pontos</Text>
            <Text className="text-2xl font-bold text-purple-600">
              {stats.points.toLocaleString()}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-3">
          {/* Streak */}
          <View className="flex-1 bg-white rounded-2xl p-4 border border-red-100 gap-2">
            <Text className="text-2xl">🔥</Text>
            <Text className="text-xs text-muted">Streak</Text>
            <Text className="text-2xl font-bold text-red-600">{stats.streak}d</Text>
          </View>

          {/* Accuracy */}
          <View className="flex-1 bg-white rounded-2xl p-4 border border-green-100 gap-2">
            <Text className="text-2xl">✅</Text>
            <Text className="text-xs text-muted">Acurácia</Text>
            <Text className="text-2xl font-bold text-green-600">
              {stats.accuracy}%
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="px-6 py-4 gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-foreground">
            Progresso para C1
          </Text>
          <Text className="text-xs font-bold text-primary">65%</Text>
        </View>
        <View className="h-3 bg-border rounded-full overflow-hidden">
          <View
            className="h-full bg-gradient-to-r from-rose-500 to-purple-600 rounded-full"
            style={{ width: "65%" }}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 py-6 gap-3">
        <Text className="text-lg font-bold text-foreground">Ações Rápidas</Text>

        <TouchableOpacity
          onPress={() => router.push("/pronunciation-practice")}
          className="bg-white rounded-2xl p-4 flex-row items-center justify-between border border-rose-100 active:opacity-80"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-rose-100 items-center justify-center">
              <Text className="text-2xl">🎤</Text>
            </View>
            <View>
              <Text className="font-bold text-foreground">Praticar Pronúncia</Text>
              <Text className="text-xs text-muted">Melhore sua entonação</Text>
            </View>
          </View>
          <Text className="text-xl">→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/chat")}
          className="bg-white rounded-2xl p-4 flex-row items-center justify-between border border-purple-100 active:opacity-80"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-purple-100 items-center justify-center">
              <Text className="text-2xl">💬</Text>
            </View>
            <View>
              <Text className="font-bold text-foreground">Chat com Professor</Text>
              <Text className="text-xs text-muted">Conversa com IA</Text>
            </View>
          </View>
          <Text className="text-xl">→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/modules-list")}
          className="bg-white rounded-2xl p-4 flex-row items-center justify-between border border-blue-100 active:opacity-80"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-blue-100 items-center justify-center">
              <Text className="text-2xl">📚</Text>
            </View>
            <View>
              <Text className="font-bold text-foreground">Explorar Módulos</Text>
              <Text className="text-xs text-muted">12+ temas disponíveis</Text>
            </View>
          </View>
          <Text className="text-xl">→</Text>
        </TouchableOpacity>
      </View>

      {/* Badges Section */}
      <View className="px-6 py-6 gap-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-foreground">Badges Desbloqueados</Text>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Text className="text-sm text-primary font-semibold">Ver Todos →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-3"
        >
          {badges.map((badge) => (
            <View
              key={badge.id}
              className={`${badge.color} rounded-2xl p-4 items-center gap-2 w-24 border border-border`}
            >
              <Text className="text-3xl">{badge.icon}</Text>
              <Text className="text-xs font-bold text-center text-foreground">
                {badge.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Recent Activity */}
      <View className="px-6 py-6 gap-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-foreground">Atividade Recente</Text>
          <TouchableOpacity onPress={() => router.push("/pronunciation-history")}>
            <Text className="text-sm text-primary font-semibold">Ver Histórico →</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-2">
          {recentActivities.map((activity) => (
            <View
              key={activity.id}
              className="bg-white rounded-xl p-4 flex-row items-center justify-between border border-border"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-purple-100 items-center justify-center">
                  <Text className="text-lg">🎤</Text>
                </View>
                <View>
                  <Text className="font-bold text-foreground">{activity.word}</Text>
                  <Text className="text-xs text-muted">{activity.date}</Text>
                </View>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-sm font-bold text-green-600">
                  {activity.score}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Schedule Section */}
      <View className="px-6 py-6 gap-4 mb-8">
        <Text className="text-lg font-bold text-foreground">Seu Calendário</Text>

        <View className="bg-white rounded-2xl p-6 border border-border gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-foreground">Próxima Sessão</Text>
            <Text className="text-sm text-muted">Quarta-feira</Text>
          </View>

          <View className="flex-row gap-2">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, idx) => (
              <View
                key={idx}
                className={`flex-1 py-3 rounded-lg items-center justify-center ${
                  idx === 2
                    ? "bg-gradient-to-r from-rose-500 to-purple-600"
                    : idx === 0 || idx === 2 || idx === 4
                    ? "bg-primary/10"
                    : "bg-surface"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    idx === 2 ? "text-white" : "text-foreground"
                  }`}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          <Text className="text-xs text-muted text-center">
            Pratique 3x por semana para manter seu streak! 🔥
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
