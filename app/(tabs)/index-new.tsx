import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { DailyPhraseCard } from "@/components/daily-phrase-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";
import { getDailyPhrase } from "@/lib/daily-phrases";
import { useEffect, useState } from "react";

export default function DashboardScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [dailyPhrase] = useState(() => getDailyPhrase());
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Queries
  const { data: profile, isLoading: profileLoading } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: stats } = trpc.profile.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading || profileLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#FF6B9D" />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="gap-1">
            <Text className="text-sm text-muted">Bem-vindo de volta,</Text>
            <Text className="text-2xl font-bold text-foreground">{user?.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="w-12 h-12 rounded-full bg-primary items-center justify-center"
          >
            <Text className="text-xl">⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Card */}
        {profile && (
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10">
            <View className="gap-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-sm text-muted mb-1">Seu Nível</Text>
                  <Text className="text-3xl font-bold text-primary">{profile.cefrLevel}</Text>
                </View>
                <View className="items-center">
                  <Text className="text-4xl mb-2">🏆</Text>
                  <Text className="text-xs text-muted">Nível</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-xs text-muted">Progresso</Text>
                  <Text className="text-xs font-bold text-primary">75%</Text>
                </View>
                <View className="h-2 bg-border rounded-full overflow-hidden">
                  <View className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
                </View>
              </View>

              {/* Stats Row */}
              <View className="flex-row gap-3">
                <View className="flex-1 bg-white/50 rounded-lg p-3 items-center">
                  <Text className="text-lg font-bold text-foreground">{profile.totalPoints}</Text>
                  <Text className="text-xs text-muted">Pontos</Text>
                </View>
                <View className="flex-1 bg-white/50 rounded-lg p-3 items-center">
                  <Text className="text-lg font-bold text-success">{profile.currentStreak}</Text>
                  <Text className="text-xs text-muted">Dias 🔥</Text>
                </View>
              </View>
            </View>
          </Card>
        )}

        {/* CTA Button */}
        <Button
          label="Iniciar Sessão de Hoje"
          onPress={() => router.push("/chat")}
          size="lg"
          className="mb-6"
        />

        {/* Daily Phrase */}
        <DailyPhraseCard
          phrase={dailyPhrase}
          isPlayingAudio={isPlayingAudio}
          onPlayAudio={() => {
            setIsPlayingAudio(true);
            setTimeout(() => setIsPlayingAudio(false), 3000);
          }}
          onStopAudio={() => setIsPlayingAudio(false)}
        />

        {/* Stats Summary */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
            <Text className="text-2xl font-bold text-foreground">{stats?.totalSessions || 0}</Text>
            <Text className="text-xs text-muted mt-1">Sessões</Text>
          </View>
          <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
            <Text className="text-2xl font-bold text-foreground">{stats?.totalDuration || 0}m</Text>
            <Text className="text-xs text-muted mt-1">Tempo Total</Text>
          </View>
        </View>

        {/* Recent Badges */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-foreground">Badges Recentes</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text className="text-sm text-primary">Ver Tudo →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-3"
            contentContainerStyle={{ gap: 12 }}
          >
            {[
              { emoji: "🎯", title: "Iniciante" },
              { emoji: "⭐", title: "Primeira Sessão" },
              { emoji: "🔥", title: "Streak 7 dias" },
            ].map((badge, idx) => (
              <Card key={idx} className="w-24 items-center p-4">
                <Text className="text-3xl mb-2">{badge.emoji}</Text>
                <Text className="text-xs text-center text-muted">{badge.title}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Quick Links */}
        <View className="gap-3 mb-6">
          <TouchableOpacity
            onPress={() => {}}
            className="bg-surface border border-border rounded-xl p-4 flex-row items-center justify-between"
          >
            <View className="gap-1">
              <Text className="font-semibold text-foreground">Módulos de Aprendizado</Text>
              <Text className="text-xs text-muted">12 módulos disponíveis</Text>
            </View>
            <Text className="text-xl">→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            className="bg-surface border border-border rounded-xl p-4 flex-row items-center justify-between"
          >
            <View className="gap-1">
              <Text className="font-semibold text-foreground">Tarefas Leves</Text>
              <Text className="text-xs text-muted">Pratique nos dias off</Text>
            </View>
            <Text className="text-xl">→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
