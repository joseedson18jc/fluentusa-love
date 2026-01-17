import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PronunciationFeedbackProps {
  word: string;
  accuracyScore: number;
  feedback: {
    overall: string;
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  onRetry?: () => void;
  onContinue?: () => void;
}

export function PronunciationFeedback({
  word,
  accuracyScore,
  feedback,
  onRetry,
  onContinue,
}: PronunciationFeedbackProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Animar entrada do score
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excelente!";
    if (score >= 75) return "Muito Bom!";
    if (score >= 60) return "Bom!";
    return "Tente Novamente";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 75) return "bg-blue-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-orange-100";
  };

  const FeedbackSection = ({
    title,
    items,
    emoji,
  }: {
    title: string;
    items: string[];
    emoji: string;
  }) => {
    const isExpanded = expandedSection === title;

    return (
      <View className="mb-4 rounded-xl bg-surface border border-border overflow-hidden">
        <TouchableOpacity
          onPress={() => setExpandedSection(isExpanded ? null : title)}
          className="flex-row items-center justify-between p-4 active:bg-border/50"
        >
          <View className="flex-row items-center gap-3 flex-1">
            <Text className="text-2xl">{emoji}</Text>
            <View>
              <Text className="font-semibold text-foreground">{title}</Text>
              <Text className="text-xs text-muted">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </Text>
            </View>
          </View>
          <Text className="text-lg text-muted">
            {isExpanded ? "−" : "+"}
          </Text>
        </TouchableOpacity>

        {isExpanded && items.length > 0 && (
          <View className="border-t border-border px-4 py-3 gap-2">
            {items.map((item, index) => (
              <View key={index} className="flex-row gap-3">
                <Text className="text-primary font-bold">•</Text>
                <Text className="text-sm text-foreground flex-1 leading-relaxed">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="p-6 gap-6">
        {/* Score Card */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
          className={cn(
            "rounded-3xl p-8 items-center gap-4",
            getScoreBg(accuracyScore)
          )}
        >
          <Text className="text-6xl font-bold text-foreground">
            {accuracyScore}%
          </Text>
          <Text className={cn("text-2xl font-bold", getScoreColor(accuracyScore))}>
            {getScoreLabel(accuracyScore)}
          </Text>
          <Text className="text-sm text-muted text-center">
            Sua pronúncia de "{word}"
          </Text>
        </Animated.View>

        {/* Overall Feedback */}
        <View className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
          <Text className="text-sm font-semibold text-primary mb-2">
            Feedback Geral
          </Text>
          <Text className="text-base text-foreground leading-relaxed">
            {feedback.overall}
          </Text>
        </View>

        {/* Strengths */}
        {feedback.strengths.length > 0 && (
          <FeedbackSection
            title="Pontos Fortes"
            items={feedback.strengths}
            emoji="⭐"
          />
        )}

        {/* Improvements */}
        {feedback.improvements.length > 0 && (
          <FeedbackSection
            title="Áreas para Melhorar"
            items={feedback.improvements}
            emoji="🎯"
          />
        )}

        {/* Tips */}
        {feedback.tips.length > 0 && (
          <FeedbackSection
            title="Dicas Práticas"
            items={feedback.tips}
            emoji="💡"
          />
        )}

        {/* Action Buttons */}
        <View className="flex-row gap-3 mt-6">
          {onRetry && (
            <TouchableOpacity
              onPress={onRetry}
              className="flex-1 py-4 rounded-xl border-2 border-primary items-center active:bg-primary/10"
            >
              <Text className="font-semibold text-primary">Tentar Novamente</Text>
            </TouchableOpacity>
          )}

          {onContinue && (
            <TouchableOpacity
              onPress={onContinue}
              className="flex-1 py-4 rounded-xl bg-primary items-center active:opacity-80"
            >
              <Text className="font-semibold text-white">Continuar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Spacer */}
        <View className="h-4" />
      </View>
    </ScrollView>
  );
}
