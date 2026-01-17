import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Badge, getNextBadges, MilestoneProgress } from "@/lib/milestone-badges";
import { useState } from "react";

interface BadgeDisplayProps {
  unlockedBadges: Badge[];
  progress: MilestoneProgress;
  onBadgePress?: (badge: Badge) => void;
}

export function BadgeDisplay({
  unlockedBadges,
  progress,
  onBadgePress,
}: BadgeDisplayProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const nextBadges = getNextBadges(progress);

  return (
    <View className="gap-6">
      {/* Badges Desbloqueados */}
      <View className="gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-foreground">
            Badges Desbloqueados
          </Text>
          <View className="bg-primary/10 px-3 py-1 rounded-full">
            <Text className="text-sm font-bold text-primary">
              {unlockedBadges.length}
            </Text>
          </View>
        </View>

        {unlockedBadges.length === 0 ? (
          <View className="bg-surface rounded-lg p-6 items-center">
            <Text className="text-sm text-muted">
              Comece a praticar para desbloquear badges!
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2"
          >
            {unlockedBadges.map((badge) => (
              <TouchableOpacity
                key={badge.id}
                onPress={() => {
                  setSelectedBadge(badge);
                  onBadgePress?.(badge);
                }}
                className="items-center gap-2"
              >
                <View
                  className={`w-20 h-20 rounded-2xl ${badge.color} items-center justify-center border-2 border-primary`}
                >
                  <Text className="text-4xl">{badge.icon}</Text>
                </View>
                <Text className="text-xs font-semibold text-foreground text-center w-20">
                  {badge.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Próximos Badges */}
      {nextBadges.length > 0 && (
        <View className="gap-3">
          <Text className="text-lg font-bold text-foreground">
            Próximos Badges
          </Text>

          {nextBadges.map((badge) => (
            <View
              key={badge.id}
              className="bg-surface rounded-lg p-4 border border-border gap-3"
            >
              <View className="flex-row items-center gap-3">
                <View
                  className={`w-16 h-16 rounded-xl ${badge.color} items-center justify-center opacity-60`}
                >
                  <Text className="text-3xl">{badge.icon}</Text>
                </View>

                <View className="flex-1 gap-1">
                  <Text className="font-bold text-foreground">
                    {badge.name}
                  </Text>
                  <Text className="text-xs text-muted">
                    {badge.description}
                  </Text>
                  <Text className="text-xs font-semibold text-primary">
                    {badge.requirement}
                  </Text>
                </View>
              </View>

              {/* Barra de Progresso */}
              {badge.progress !== undefined && (
                <View className="gap-1">
                  <View className="flex-row justify-between">
                    <Text className="text-xs text-muted">Progresso</Text>
                    <Text className="text-xs font-bold text-primary">
                      {Math.round(badge.progress)}%
                    </Text>
                  </View>
                  <View className="h-2 bg-border rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${badge.progress}%`,
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Detalhes do Badge Selecionado */}
      {selectedBadge && (
        <View className="bg-primary/10 rounded-lg p-4 border border-primary gap-3">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-lg bg-primary items-center justify-center">
              <Text className="text-2xl">{selectedBadge.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-foreground">
                {selectedBadge.name}
              </Text>
              <Text className="text-xs text-muted">
                {selectedBadge.description}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between pt-2 border-t border-primary/20">
            <Text className="text-xs text-muted">Tipo:</Text>
            <View className="px-2 py-1 rounded-full bg-primary/20">
              <Text className="text-xs font-semibold text-primary">
                {selectedBadge.type}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

/**
 * Componente de animação de desbloqueio de badge
 */
export function BadgeUnlockAnimation({
  badge,
  onComplete,
}: {
  badge: Badge;
  onComplete?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleClose}
        className="w-full h-full items-center justify-center"
      >
        <View className="bg-white rounded-3xl p-8 items-center gap-6 w-80">
          {/* Ícone Grande */}
          <View className="w-32 h-32 rounded-full bg-yellow-100 items-center justify-center border-4 border-yellow-400">
            <Text className="text-8xl">{badge.icon}</Text>
          </View>

          {/* Texto */}
          <View className="gap-2 items-center">
            <Text className="text-2xl font-bold text-foreground">
              Parabéns!
            </Text>
            <Text className="text-lg font-bold text-primary">
              {badge.name}
            </Text>
            <Text className="text-sm text-muted text-center">
              {badge.description}
            </Text>
          </View>

          {/* Botão */}
          <TouchableOpacity
            onPress={handleClose}
            className="w-full bg-primary py-3 rounded-lg items-center"
          >
            <Text className="text-white font-bold">Continuar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
