import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

type VoiceGender = "male" | "female";
type NotificationType = "email" | "push" | "none";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // State
  const [voiceGender, setVoiceGender] = useState<VoiceGender>("female");
  const [speechSpeed, setSpeechSpeed] = useState(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 3, 5]); // Mon, Wed, Fri
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationType, setNotificationType] = useState<NotificationType>("push");
  const [isSaving, setIsSaving] = useState(false);

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

  // Queries
  const { data: profile } = trpc.profile.get.useQuery();
  const updateSettingsMutation = trpc.profile.updateVoiceSettings.useMutation();

  // Load settings
  useEffect(() => {
    if (profile) {
      setVoiceGender((profile.preferredVoice as VoiceGender) || "female");
      setSpeechSpeed(profile.voiceSpeed || 1);
    }
  }, [profile]);

  const handleToggleDay = (dayIndex: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex].sort()
    );
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await updateSettingsMutation.mutateAsync({
        preferredVoice: voiceGender,
        voiceSpeed: speechSpeed,
      });

      Alert.alert("Sucesso", "Configurações salvas com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar configurações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Tem certeza que deseja sair?", [
      { text: "Cancelar", onPress: () => {} },
      {
        text: "Sair",
        onPress: async () => {
          await logout();
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-lg">← Voltar</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-foreground">Perfil & Configurações</Text>
        </View>

        {/* User Info */}
        <Card className="mb-6">
          <View className="gap-4">
            <View className="items-center">
              <View className="w-16 h-16 rounded-full bg-primary items-center justify-center mb-3">
                <Text className="text-3xl">👤</Text>
              </View>
              <Text className="text-xl font-bold text-foreground">{user?.name}</Text>
              <Text className="text-sm text-muted">{user?.email}</Text>
            </View>

            {profile && (
              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">Nível CEFR:</Text>
                  <Text className="text-sm font-bold text-primary">{profile.cefrLevel}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">Pontos Totais:</Text>
                  <Text className="text-sm font-bold text-foreground">{profile.totalPoints}</Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted">Streak Atual:</Text>
                  <Text className="text-sm font-bold text-success">{profile.currentStreak} dias 🔥</Text>
                </View>
              </View>
            )}
          </View>
        </Card>

        {/* Voice Settings */}
        <Text className="text-lg font-bold text-foreground mb-3">🎤 Voz do Professor</Text>
        <Card className="mb-6">
          <View className="gap-4">
            <View>
              <Text className="text-sm text-muted mb-2">Gênero da Voz</Text>
              <View className="flex-row gap-3">
                {(["female", "male"] as const).map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    onPress={() => setVoiceGender(gender)}
                    className={`flex-1 p-3 rounded-lg border-2 items-center ${
                      voiceGender === gender
                        ? "border-primary bg-primary/10"
                        : "border-border bg-surface"
                    }`}
                  >
                    <Text className="text-2xl mb-1">{gender === "female" ? "👩" : "👨"}</Text>
                    <Text className={`text-sm font-semibold ${
                      voiceGender === gender ? "text-primary" : "text-foreground"
                    }`}>
                      {gender === "female" ? "Feminina" : "Masculina"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text className="text-sm text-muted mb-2">Velocidade da Fala</Text>
              <View className="flex-row gap-2 items-center">
                <Text className="text-sm">Lenta</Text>
                <View className="flex-1 flex-row gap-2">
                  {[0.75, 1, 1.25, 1.5].map((speed) => (
                    <TouchableOpacity
                      key={speed}
                      onPress={() => setSpeechSpeed(speed)}
                      className={`flex-1 p-2 rounded-lg ${
                        speechSpeed === speed
                          ? "bg-primary"
                          : "bg-surface border border-border"
                      }`}
                    >
                      <Text className={`text-xs text-center font-semibold ${
                        speechSpeed === speed ? "text-white" : "text-foreground"
                      }`}>
                        {speed}x
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text className="text-sm">Rápida</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Schedule Settings */}
        <Text className="text-lg font-bold text-foreground mb-3">📅 Dias de Prática</Text>
        <Card className="mb-6">
          <View className="gap-3">
            <Text className="text-sm text-muted">Escolha 3 dias por semana para suas sessões</Text>
            <View className="flex-row gap-2 flex-wrap">
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleToggleDay(index)}
                  className={`flex-1 min-w-[45%] p-3 rounded-lg border-2 items-center ${
                    selectedDays.includes(index)
                      ? "border-primary bg-primary/10"
                      : "border-border bg-surface"
                  }`}
                >
                  <Text className={`text-sm font-semibold ${
                    selectedDays.includes(index) ? "text-primary" : "text-foreground"
                  }`}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        {/* Notification Settings */}
        <Text className="text-lg font-bold text-foreground mb-3">🔔 Notificações</Text>
        <Card className="mb-6">
          <View className="gap-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-foreground">Ativar Notificações</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#D1D5DB", true: "#FF6B9D" }}
              />
            </View>

            {notificationsEnabled && (
              <View>
                <Text className="text-sm text-muted mb-2">Tipo de Notificação</Text>
                <View className="gap-2">
                  {(["push", "email", "none"] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setNotificationType(type)}
                      className={`p-3 rounded-lg border-2 flex-row items-center gap-3 ${
                        notificationType === type
                          ? "border-primary bg-primary/10"
                          : "border-border bg-surface"
                      }`}
                    >
                      <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                        notificationType === type
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}>
                        {notificationType === type && (
                          <Text className="text-white text-xs">✓</Text>
                        )}
                      </View>
                      <Text className={`text-sm font-semibold ${
                        notificationType === type ? "text-primary" : "text-foreground"
                      }`}>
                        {type === "push" ? "Push (Celular)" : type === "email" ? "Email" : "Nenhuma"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </Card>

        {/* Action Buttons */}
        <View className="gap-3 mb-6">
            <Button
            label={isSaving ? "Salvando..." : "Salvar Voz"}
            onPress={handleSaveSettings}
            disabled={isSaving}
            loading={isSaving}
          />

          <Button
            label="Sair da Conta"
            variant="outline"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
