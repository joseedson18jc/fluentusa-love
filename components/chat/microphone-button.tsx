import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MicrophoneButtonProps {
  isListening: boolean;
  onPress: () => void;
  onRelease: () => void;
  disabled?: boolean;
}

export function MicrophoneButton({
  isListening,
  onPress,
  onRelease,
  disabled = false,
}: MicrophoneButtonProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  // Animar ondas sonoras
  useEffect(() => {
    if (!isListening) return;

    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 300);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <View className="items-center gap-4">
      {/* Animated Sound Waves */}
      {isListening && (
        <View className="absolute items-center justify-center">
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              className={cn(
                "absolute rounded-full border-2 border-primary",
                animationPhase > index ? "opacity-100" : "opacity-0"
              )}
              style={{
                width: 80 + index * 40,
                height: 80 + index * 40,
              }}
            />
          ))}
        </View>
      )}

      {/* Microphone Button */}
      <TouchableOpacity
        onPressIn={onPress}
        onPressOut={onRelease}
        disabled={disabled}
        className={cn(
          "w-20 h-20 rounded-full items-center justify-center transition-colors",
          isListening ? "bg-error" : "bg-primary",
          disabled && "opacity-50"
        )}
      >
        {isListening ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <Text className="text-4xl">🎤</Text>
        )}
      </TouchableOpacity>

      {/* Status Text */}
      <Text className="text-sm text-muted">
        {isListening ? "Gravando..." : "Toque para falar"}
      </Text>
    </View>
  );
}
