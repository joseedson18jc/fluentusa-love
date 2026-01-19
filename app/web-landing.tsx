import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

export default function WebLandingScreen() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  return (
    <ScrollView
      className="flex-1 bg-gradient-to-b from-rose-50 via-white to-purple-50"
      onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      {/* Header Navigation */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <View className="flex-row items-center gap-2">
          <Text className="text-2xl">💕</Text>
          <Text className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
            FluentUSA Love
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/onboarding")}
          className="bg-gradient-to-r from-rose-500 to-purple-600 px-6 py-2 rounded-full"
        >
          <Text className="text-white font-bold text-sm">Começar</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View className="px-6 py-16 items-center gap-8">
        <View className="gap-4 items-center">
          <View className="w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-200 to-purple-200 items-center justify-center">
            <Text className="text-6xl">💕</Text>
          </View>
          <Text className="text-5xl font-bold text-center text-foreground">
            Fluência em Inglês{"\n"}com Amor
          </Text>
          <Text className="text-lg text-muted text-center max-w-md">
            Um presente personalizado de aprendizado para José. Aprenda inglês americano de forma gamificada, divertida e romântica.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/onboarding")}
          className="w-full bg-gradient-to-r from-rose-500 to-purple-600 py-4 rounded-2xl items-center shadow-lg"
        >
          <Text className="text-white font-bold text-lg">Começar Agora 🚀</Text>
        </TouchableOpacity>

        {/* Stats */}
        <View className="flex-row gap-4 w-full mt-8">
          <View className="flex-1 bg-white rounded-2xl p-4 items-center border border-rose-100">
            <Text className="text-3xl font-bold text-rose-600">12+</Text>
            <Text className="text-xs text-muted mt-1">Módulos</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 items-center border border-purple-100">
            <Text className="text-3xl font-bold text-purple-600">∞</Text>
            <Text className="text-xs text-muted mt-1">Prática</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 items-center border border-blue-100">
            <Text className="text-3xl font-bold text-blue-600">🎤</Text>
            <Text className="text-xs text-muted mt-1">Voz Real</Text>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View className="px-6 py-16 gap-8">
        <Text className="text-3xl font-bold text-foreground">
          Por que FluentUSA Love?
        </Text>

        {/* Feature 1 */}
        <View className="bg-white rounded-2xl p-6 gap-4 border border-rose-100 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-rose-100 items-center justify-center">
              <Text className="text-2xl">🎤</Text>
            </View>
            <Text className="text-lg font-bold text-foreground flex-1">
              Pronúncia com IA
            </Text>
          </View>
          <Text className="text-sm text-muted">
            Grava sua voz, recebe feedback de pronúncia com análise de pitch e comparação com nativo.
          </Text>
        </View>

        {/* Feature 2 */}
        <View className="bg-white rounded-2xl p-6 gap-4 border border-purple-100 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-purple-100 items-center justify-center">
              <Text className="text-2xl">🎯</Text>
            </View>
            <Text className="text-lg font-bold text-foreground flex-1">
              Gamificação Afetiva
            </Text>
          </View>
          <Text className="text-sm text-muted">
            Badges românticos, streaks, pontos e mensagens personalizadas para manter motivação.
          </Text>
        </View>

        {/* Feature 3 */}
        <View className="bg-white rounded-2xl p-6 gap-4 border border-blue-100 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-blue-100 items-center justify-center">
              <Text className="text-2xl">📚</Text>
            </View>
            <Text className="text-lg font-bold text-foreground flex-1">
              Conteúdo Progressivo
            </Text>
          </View>
          <Text className="text-sm text-muted">
            12+ módulos temáticos de A1 a C2, com vocabulário prático e expressões americanas reais.
          </Text>
        </View>

        {/* Feature 4 */}
        <View className="bg-white rounded-2xl p-6 gap-4 border border-green-100 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-green-100 items-center justify-center">
              <Text className="text-2xl">💬</Text>
            </View>
            <Text className="text-lg font-bold text-foreground flex-1">
              Chat com Professor IA
            </Text>
          </View>
          <Text className="text-sm text-muted">
            Conversas naturais com feedback oral em voz americana expressiva via ElevenLabs.
          </Text>
        </View>

        {/* Feature 5 */}
        <View className="bg-white rounded-2xl p-6 gap-4 border border-yellow-100 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-yellow-100 items-center justify-center">
              <Text className="text-2xl">📊</Text>
            </View>
            <Text className="text-lg font-bold text-foreground flex-1">
              Histórico Detalhado
            </Text>
          </View>
          <Text className="text-sm text-muted">
            Acompanhe seu progresso com gráficos, filtros avançados e comparação de tentativas.
          </Text>
        </View>

        {/* Feature 6 */}
        <View className="bg-white rounded-2xl p-6 gap-4 border border-pink-100 shadow-sm">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-xl bg-pink-100 items-center justify-center">
              <Text className="text-2xl">❤️</Text>
            </View>
            <Text className="text-lg font-bold text-foreground flex-1">
              100% Personalizado
            </Text>
          </View>
          <Text className="text-sm text-muted">
            Um presente único feito especialmente para você, José. Sem anúncios, sem custos.
          </Text>
        </View>
      </View>

      {/* Modules Preview */}
      <View className="px-6 py-16 gap-8 bg-gradient-to-b from-transparent to-rose-50/50">
        <Text className="text-3xl font-bold text-foreground">
          Módulos de Aprendizado
        </Text>

        <View className="gap-3">
          {[
            { icon: "👋", title: "Greetings", desc: "Saudações e apresentações" },
            { icon: "🏠", title: "Daily Routines", desc: "Rotina diária em inglês" },
            { icon: "❤️", title: "Dating & Love", desc: "Expressões românticas" },
            { icon: "🍽️", title: "Food & Dining", desc: "Comida e restaurantes" },
            { icon: "🎬", title: "Entertainment", desc: "Filmes e diversão" },
            { icon: "🌍", title: "Travel", desc: "Viagens e turismo" },
          ].map((module, idx) => (
            <View
              key={idx}
              className="bg-white rounded-xl p-4 flex-row items-center gap-4 border border-border"
            >
              <View className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-100 to-purple-100 items-center justify-center">
                <Text className="text-2xl">{module.icon}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-foreground">{module.title}</Text>
                <Text className="text-xs text-muted">{module.desc}</Text>
              </View>
              <Text className="text-lg">→</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View className="px-6 py-16 gap-6 items-center">
        <View className="gap-3 items-center">
          <Text className="text-3xl font-bold text-center text-foreground">
            Pronto para começar?
          </Text>
          <Text className="text-base text-muted text-center">
            Faça o teste de nivelamento e descubra seu nível de inglês em 5 minutos.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/onboarding")}
          className="w-full bg-gradient-to-r from-rose-500 to-purple-600 py-4 rounded-2xl items-center shadow-lg"
        >
          <Text className="text-white font-bold text-lg">Começar Teste 🚀</Text>
        </TouchableOpacity>

        <Text className="text-xs text-muted text-center">
          Sem registro necessário • Teste de 30 questões • Resultado instantâneo
        </Text>
      </View>

      {/* Footer */}
      <View className="px-6 py-12 gap-4 items-center border-t border-border bg-surface">
        <View className="flex-row items-center gap-2">
          <Text className="text-2xl">💕</Text>
          <Text className="font-bold text-foreground">FluentUSA Love</Text>
        </View>
        <Text className="text-xs text-muted text-center">
          Um presente de aprendizado personalizado para José{"\n"}Feito com ❤️ usando IA e tecnologia moderna
        </Text>
        <Text className="text-xs text-muted mt-4">
          © 2024 FluentUSA Love • Todos os direitos reservados
        </Text>
      </View>
    </ScrollView>
  );
}
