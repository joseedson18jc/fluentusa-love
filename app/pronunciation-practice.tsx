import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { PronunciationRecorder } from "@/components/pronunciation/pronunciation-recorder";
import { PronunciationFeedback } from "@/components/pronunciation/pronunciation-feedback";
import { useState, useEffect } from "react";

interface PronunciationAnalysis {
  word: string;
  accuracyScore: number;
  feedback: {
    overall: string;
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  audioUrl: string;
  nativeAudioUrl: string;
}

export default function PronunciationPracticeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { word = "Hello", moduleId = "1", lessonId = "1" } = params;

  const [stage, setStage] = useState<"recording" | "feedback">("recording");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PronunciationAnalysis | null>(null);
  const [nativeAudioUrl, setNativeAudioUrl] = useState(
    "https://example.com/audio-native.mp3"
  );

  // Simular geração de áudio nativo
  useEffect(() => {
    const generateNativeAudio = async () => {
      // Em produção, isso chamaria generateNativePronunciationAudio
      // Por enquanto, apenas simulamos
      setNativeAudioUrl(`https://example.com/native-${word}.mp3`);
    };

    generateNativeAudio();
  }, [word]);

  const handleRecordingComplete = async (audioUri: string) => {
    setIsAnalyzing(true);

    try {
      // Simular análise de pronúncia
      // Em produção, isso chamaria analyzePronunciation no backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const mockAnalysis: PronunciationAnalysis = {
        word: String(word),
        accuracyScore: Math.floor(Math.random() * 40) + 60, // 60-100
        feedback: {
          overall: `Ótima tentativa! Sua pronúncia de "${word}" está muito boa.`,
          strengths: [
            "Entonação clara e natural",
            "Ritmo apropriado",
            "Pronúncia das consoantes perfeita",
          ],
          improvements: [
            "Tente alongar a vogal um pouco mais",
            "Reduza a velocidade para melhor clareza",
          ],
          tips: [
            "Pratique em frente a um espelho para ver o movimento dos lábios",
            "Ouça a pronúncia nativa várias vezes antes de gravar",
            "Grave-se e compare com a pronúncia nativa",
          ],
        },
        audioUrl: audioUri,
        nativeAudioUrl,
      };

      setAnalysis(mockAnalysis);
      setStage("feedback");
    } catch (error) {
      console.error("Erro ao analisar pronúncia:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetry = () => {
    setAnalysis(null);
    setStage("recording");
  };

  const handleContinue = () => {
    // Navegar para próxima palavra ou voltar
    router.back();
  };

  return (
    <ScreenContainer className="p-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-lg text-primary font-semibold">← Voltar</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground">
          Prática de Pronúncia
        </Text>
        <View className="w-12" />
      </View>

      {stage === "recording" ? (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Word Display */}
          <View className="items-center gap-3 mb-8 mt-4">
            <Text className="text-5xl font-bold text-primary">
              {word}
            </Text>
            <Text className="text-sm text-muted">
              Pronuncie esta palavra
            </Text>
          </View>

          {/* Recorder Component */}
          <PronunciationRecorder
            word={String(word)}
            nativeAudioUrl={nativeAudioUrl}
            onRecordingComplete={handleRecordingComplete}
            isAnalyzing={isAnalyzing}
          />

          {/* Tips Section */}
          <View className="mt-8 bg-surface rounded-2xl p-4 border border-border">
            <Text className="font-semibold text-foreground mb-3">
              💡 Dicas para Melhor Pronúncia
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Relax and speak naturally
            </Text>
            <Text className="text-sm text-muted leading-relaxed mb-2">
              • Avoid background noise
            </Text>
            <Text className="text-sm text-muted leading-relaxed">
              • Speak clearly into the microphone
            </Text>
          </View>
        </ScrollView>
      ) : analysis ? (
        <PronunciationFeedback
          word={analysis.word}
          accuracyScore={analysis.accuracyScore}
          feedback={analysis.feedback}
          onRetry={handleRetry}
          onContinue={handleContinue}
        />
      ) : null}
    </ScreenContainer>
  );
}
