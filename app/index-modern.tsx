import { ScrollView, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export default function LandingScreen() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [loading, isAuthenticated]);

  return (
    <ScreenContainer className="p-0">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Hero Section */}
        <View className="bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent px-6 py-12 gap-6">
          {/* Logo & Title */}
          <View className="items-center gap-3 mt-4">
            <Text className="text-6xl">💕</Text>
            <Text className="text-4xl font-bold text-foreground text-center">
              FluentUSA Love
            </Text>
            <Text className="text-lg text-muted text-center leading-relaxed">
              Seu caminho para a fluência em inglês americano
            </Text>
          </View>

          {/* CTA Button */}
          <View className="gap-3 mt-4">
            <Button
              label="Começar Agora"
              onPress={() => router.push("/onboarding")}
              size="lg"
              className="shadow-lg"
            />
            <Button
              label="Já tenho conta"
              variant="outline"
              onPress={() => {}}
              size="lg"
            />
          </View>
        </View>

        {/* Features Section */}
        <View className="px-6 py-12 gap-6">
          <Text className="text-2xl font-bold text-foreground">
            Por que FluentUSA Love?
          </Text>

          {/* Feature 1 */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">🎤</Text>
                <Text className="text-lg font-bold text-foreground flex-1">
                  Professor Virtual com Voz
                </Text>
              </View>
              <Text className="text-sm text-muted leading-relaxed">
                Converse com um professor de IA que fala inglês americano natural e expressivo, com feedback oral personalizado.
              </Text>
            </View>
          </Card>

          {/* Feature 2 */}
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">🎯</Text>
                <Text className="text-lg font-bold text-foreground flex-1">
                  Aprendizado Personalizado
                </Text>
              </View>
              <Text className="text-sm text-muted leading-relaxed">
                Teste de nivelamento inteligente que define seu nível CEFR e cria um plano personalizado para você.
              </Text>
            </View>
          </Card>

          {/* Feature 3 */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">🎮</Text>
                <Text className="text-lg font-bold text-foreground flex-1">
                  Gamificação Afetiva
                </Text>
              </View>
              <Text className="text-sm text-muted leading-relaxed">
                Ganhe badges românticas, mantenha seu streak e receba mensagens motivadoras personalizadas.
              </Text>
            </View>
          </Card>

          {/* Feature 4 */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <View className="gap-3">
              <View className="flex-row items-center gap-3">
                <Text className="text-4xl">📚</Text>
                <Text className="text-lg font-bold text-foreground flex-1">
                  12+ Módulos Temáticos
                </Text>
              </View>
              <Text className="text-sm text-muted leading-relaxed">
                De saudações básicas até expressões românticas, com conteúdo progressivo e imersivo.
              </Text>
            </View>
          </Card>
        </View>

        {/* Stats Section */}
        <View className="px-6 py-8 gap-4">
          <Text className="text-2xl font-bold text-foreground">
            Números que Falam
          </Text>

          <View className="flex-row gap-3">
            <Card className="flex-1 bg-gradient-to-br from-primary/10 to-primary/5">
              <View className="items-center gap-2">
                <Text className="text-3xl font-bold text-primary">12+</Text>
                <Text className="text-xs text-muted text-center">Módulos</Text>
              </View>
            </Card>

            <Card className="flex-1 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <View className="items-center gap-2">
                <Text className="text-3xl font-bold text-secondary">100%</Text>
                <Text className="text-xs text-muted text-center">Gratuito</Text>
              </View>
            </Card>

            <Card className="flex-1 bg-gradient-to-br from-accent/10 to-accent/5">
              <View className="items-center gap-2">
                <Text className="text-3xl font-bold text-accent">∞</Text>
                <Text className="text-xs text-muted text-center">Prática</Text>
              </View>
            </Card>
          </View>
        </View>

        {/* Testimonial Section */}
        <View className="px-6 py-8 gap-4">
          <Text className="text-2xl font-bold text-foreground">
            O que as pessoas dizem
          </Text>

          <Card className="border-2 border-primary">
            <View className="gap-3">
              <View className="flex-row gap-1">
                <Text>⭐</Text>
                <Text>⭐</Text>
                <Text>⭐</Text>
                <Text>⭐</Text>
                <Text>⭐</Text>
              </View>
              <Text className="text-sm text-foreground italic leading-relaxed">
                "FluentUSA Love me ajudou a ganhar confiança para falar inglês. A voz do professor é tão natural!"
              </Text>
              <Text className="text-xs font-bold text-muted">
                — Maria, São Paulo
              </Text>
            </View>
          </Card>

          <Card className="border-2 border-secondary">
            <View className="gap-3">
              <View className="flex-row gap-1">
                <Text>⭐</Text>
                <Text>⭐</Text>
                <Text>⭐</Text>
                <Text>⭐</Text>
                <Text>⭐</Text>
              </View>
              <Text className="text-sm text-foreground italic leading-relaxed">
                "Adorei os módulos temáticos! Aprendi expressões que realmente uso no dia a dia."
              </Text>
              <Text className="text-xs font-bold text-muted">
                — Carlos, Rio de Janeiro
              </Text>
            </View>
          </Card>
        </View>

        {/* CTA Section */}
        <View className="px-6 py-12 gap-4 bg-gradient-to-b from-transparent to-primary/10">
          <View className="items-center gap-4">
            <Text className="text-2xl font-bold text-foreground text-center">
              Pronto para começar sua jornada?
            </Text>
            <Text className="text-sm text-muted text-center">
              Teste de nivelamento em 10 minutos e comece hoje mesmo
            </Text>
          </View>

          <Button
            label="Começar Agora"
            onPress={() => router.push("/onboarding")}
            size="lg"
          />

          <Text className="text-xs text-muted text-center">
            Sem cartão de crédito necessário • 100% Gratuito
          </Text>
        </View>

        {/* Footer */}
        <View className="px-6 py-8 border-t border-border">
          <Text className="text-xs text-muted text-center">
            FluentUSA Love © 2024 • Feito com ❤️ para José
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
