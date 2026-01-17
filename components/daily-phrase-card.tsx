import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DailyPhrase } from "@/lib/daily-phrases";

interface DailyPhraseCardProps {
  phrase: DailyPhrase;
  isPlayingAudio?: boolean;
  onPlayAudio?: () => void;
  onStopAudio?: () => void;
}

export function DailyPhraseCard({
  phrase,
  isPlayingAudio = false,
  onPlayAudio,
  onStopAudio,
}: DailyPhraseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case "motivation":
        return "💪";
      case "love":
        return "💕";
      case "learning":
        return "📚";
      case "success":
        return "🏆";
      case "friendship":
        return "👥";
      default:
        return "✨";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "A1":
        return "bg-success/20 text-success";
      case "A2":
        return "bg-success/30 text-success";
      case "B1":
        return "bg-warning/20 text-warning";
      case "B2":
        return "bg-warning/30 text-warning";
      case "C1":
        return "bg-error/20 text-error";
      case "C2":
        return "bg-error/30 text-error";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.7}
      className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 mb-6"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-2">
          <Text className="text-3xl">{getCategoryEmoji(phrase.category)}</Text>
          <Text className="text-lg font-bold text-foreground">Frase do Dia</Text>
        </View>
        <View className={cn("px-3 py-1 rounded-full", getDifficultyColor(phrase.difficulty))}>
          <Text className="text-xs font-bold">{phrase.difficulty}</Text>
        </View>
      </View>

      {/* English Phrase */}
      <View className="mb-4">
        <Text className="text-sm text-muted mb-2">Em Inglês:</Text>
        <Text className="text-xl font-bold text-foreground leading-relaxed">
          "{phrase.english}"
        </Text>
      </View>

      {/* Portuguese Translation */}
      <View className="mb-4 p-3 bg-surface rounded-lg border border-border">
        <Text className="text-sm text-muted mb-1">Tradução:</Text>
        <Text className="text-base text-foreground">
          "{phrase.portuguese}"
        </Text>
      </View>

      {/* Audio Button */}
      <TouchableOpacity
        onPress={isPlayingAudio ? onStopAudio : onPlayAudio}
        className="flex-row items-center justify-center gap-2 p-3 bg-primary rounded-lg mb-4"
      >
        {isPlayingAudio ? (
          <>
            <ActivityIndicator color="white" />
            <Text className="text-white font-semibold">Pausar áudio</Text>
          </>
        ) : (
          <>
            <Text className="text-lg">🔊</Text>
            <Text className="text-white font-semibold">Ouvir pronúncia</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Expanded Content */}
      {isExpanded && (
        <View className="gap-4 pt-4 border-t border-border">
          {/* Pronunciation */}
          <View>
            <Text className="text-sm text-muted font-semibold mb-1">Pronúncia:</Text>
            <Text className="text-base text-foreground italic">
              {phrase.pronunciation}
            </Text>
          </View>

          {/* Meaning */}
          <View>
            <Text className="text-sm text-muted font-semibold mb-1">Significado:</Text>
            <Text className="text-base text-foreground leading-relaxed">
              {phrase.meaning}
            </Text>
          </View>

          {/* Example */}
          <View>
            <Text className="text-sm text-muted font-semibold mb-1">Exemplo:</Text>
            <View className="p-3 bg-surface rounded-lg border border-border">
              <Text className="text-base text-foreground italic">
                "{phrase.example}"
              </Text>
            </View>
          </View>

          {/* Tips */}
          <View className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <Text className="text-sm text-secondary font-semibold mb-1">💡 Dica:</Text>
            <Text className="text-sm text-foreground">
              Use esta frase em suas conversas para praticar a pronúncia e a entonação
              americana.
            </Text>
          </View>
        </View>
      )}

      {/* Expand Indicator */}
      <View className="items-center mt-2">
        <Text className="text-xs text-muted">
          {isExpanded ? "▲ Recolher" : "▼ Expandir"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
