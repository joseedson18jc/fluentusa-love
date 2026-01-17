import { View, Text, TouchableOpacity, Image } from "react-native";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  id: number;
  title: string;
  emoji: string;
  description: string;
  difficulty: string;
  color: string;
  lessonsCount: number;
  isCompleted?: boolean;
  progress?: number;
  onPress: () => void;
}

export function ModuleCard({
  id,
  title,
  emoji,
  description,
  difficulty,
  color,
  lessonsCount,
  isCompleted = false,
  progress = 0,
  onPress,
}: ModuleCardProps) {
  const difficultyColors = {
    A1: "bg-green-100 text-green-700",
    A2: "bg-blue-100 text-blue-700",
    B1: "bg-yellow-100 text-yellow-700",
    B2: "bg-orange-100 text-orange-700",
    C1: "bg-red-100 text-red-700",
    C2: "bg-purple-100 text-purple-700",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="mb-4"
    >
      <View className={cn(
        "rounded-2xl p-5 overflow-hidden border border-border",
        "bg-gradient-to-br",
        color,
        "shadow-sm"
      )}>
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <Text className="text-4xl mb-2">{emoji}</Text>
            <Text className="text-xl font-bold text-white">{title}</Text>
          </View>
          {isCompleted && (
            <View className="bg-white/20 rounded-full p-2">
              <Text className="text-xl">✓</Text>
            </View>
          )}
        </View>

        {/* Description */}
        <Text className="text-sm text-white/80 mb-4 leading-relaxed">
          {description}
        </Text>

        {/* Footer */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-2">
            <View className={cn("px-3 py-1 rounded-full", difficultyColors[difficulty as keyof typeof difficultyColors])}>
              <Text className="text-xs font-bold">{difficulty}</Text>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text className="text-xs text-white font-semibold">{lessonsCount} aulas</Text>
            </View>
          </View>

          {progress > 0 && (
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text className="text-xs text-white font-semibold">{progress}%</Text>
            </View>
          )}
        </View>

        {/* Progress Bar */}
        {progress > 0 && (
          <View className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
            <View
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
