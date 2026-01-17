import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export default function DashboardScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // Queries
  const { data: profile, isLoading: profileLoading } = trpc.profile.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: stats, isLoading: statsLoading } = trpc.profile.getStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: schedule } = trpc.schedule.get.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // TODO: Redirecionar para onboarding quando tela estiver implementada
  // useEffect(() => {
  //   if (!authLoading && isAuthenticated && !profileLoading && !profile) {
  //     router.push("/onboarding/welcome");
  //   }
  // }, [authLoading, isAuthenticated, profileLoading, profile, router]);

  if (authLoading || profileLoading || statsLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#FF6B9D" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <View className="items-center gap-4">
          <Text className="text-4xl font-bold text-foreground">FluentUSA Love 💕</Text>
          <Text className="text-base text-muted text-center">
            Seu caminho para a fluência em inglês americano
          </Text>
          <Text className="text-sm text-muted mt-4">
            Por favor, faça login usando o sistema de autenticação do Manus
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  const cefrLevel = stats?.cefrLevel || "B1";
  const totalPoints = stats?.totalPoints || 0;
  const currentStreak = stats?.currentStreak || 0;

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-foreground">Olá, {user?.name || "José"}! 💕</Text>
            <Text className="text-base text-muted">Pronto para praticar hoje?</Text>
          </View>

          {/* Progress Card */}
          <View className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
            <Text className="text-lg font-semibold text-foreground mb-4">Seu Progresso</Text>
            
            <View className="gap-4">
              {/* CEFR Level */}
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Nível CEFR</Text>
                <Text className="text-2xl font-bold text-primary">{cefrLevel}</Text>
              </View>

              {/* Points */}
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Pontos</Text>
                <Text className="text-xl font-semibold text-foreground">{totalPoints.toLocaleString()}</Text>
              </View>

              {/* Streak */}
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Streak</Text>
                <Text className="text-xl font-semibold text-secondary">🔥 {currentStreak} dias</Text>
              </View>
            </View>
          </View>

          {/* Schedule Calendar */}
          <View className="bg-surface rounded-2xl p-6 shadow-sm border border-border">
            <Text className="text-lg font-semibold text-foreground mb-4">Calendário Semanal</Text>
            
            <View className="flex-row justify-between">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => {
                const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                const isActive = schedule?.[dayKeys[index] as keyof typeof schedule];
                
                return (
                  <View
                    key={day}
                    className={`w-10 h-10 rounded-full items-center justify-center ${
                      isActive ? "bg-primary" : "bg-background border border-border"
                    }`}
                  >
                    <Text className={`text-xs font-semibold ${isActive ? "text-white" : "text-muted"}`}>
                      {day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Start Session Button */}
          <View className="bg-primary px-8 py-5 rounded-full items-center shadow-lg opacity-50">
            <Text className="text-white font-bold text-lg">Iniciar Sessão de Hoje 🚀</Text>
            <Text className="text-white text-xs mt-1">(Em breve)</Text>
          </View>

          {/* Stats Summary */}
          <View className="flex-row gap-4">
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-2xl font-bold text-foreground">{stats?.totalSessions || 0}</Text>
              <Text className="text-xs text-muted mt-1">Sessões</Text>
            </View>
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-2xl font-bold text-foreground">{stats?.completedModules || 0}</Text>
              <Text className="text-xs text-muted mt-1">Módulos</Text>
            </View>
            <View className="flex-1 bg-surface rounded-xl p-4 border border-border">
              <Text className="text-2xl font-bold text-foreground">{stats?.badgesCount || 0}</Text>
              <Text className="text-xs text-muted mt-1">Badges</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
