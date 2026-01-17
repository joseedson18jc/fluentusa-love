import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  audioUrl?: string;
  timestamp?: Date;
  feedback?: {
    correction?: string;
    explanation?: string;
  };
}

export function ChatMessage({
  role,
  content,
  audioUrl,
  timestamp,
  feedback,
}: ChatMessageProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isUser = role === "user";

  return (
    <View
      className={cn(
        "flex-row gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <View className="w-8 h-8 rounded-full bg-primary items-center justify-center flex-shrink-0">
          <Text className="text-lg">🤖</Text>
        </View>
      )}

      {/* Message Bubble */}
      <View
        className={cn(
          "max-w-xs rounded-2xl p-4 flex-shrink",
          isUser ? "bg-primary rounded-br-none" : "bg-surface border border-border rounded-bl-none"
        )}
      >
        {/* Main Content */}
        <Text
          className={cn(
            "text-base leading-relaxed",
            isUser ? "text-white" : "text-foreground"
          )}
        >
          {content}
        </Text>

        {/* Feedback (for assistant messages) */}
        {!isUser && feedback && (
          <View className="mt-3 pt-3 border-t border-border">
            {feedback.correction && (
              <View className="mb-2">
                <Text className="text-xs text-muted font-semibold mb-1">
                  Correção:
                </Text>
                <Text className="text-sm text-foreground">
                  {feedback.correction}
                </Text>
              </View>
            )}
            {feedback.explanation && (
              <View>
                <Text className="text-xs text-muted font-semibold mb-1">
                  Explicação:
                </Text>
                <Text className="text-sm text-muted">
                  {feedback.explanation}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <TouchableOpacity
            onPress={() => setIsPlayingAudio(!isPlayingAudio)}
            className="mt-3 flex-row items-center gap-2 p-2 bg-black/10 rounded-lg"
          >
            <Text className="text-lg">
              {isPlayingAudio ? "⏸️" : "▶️"}
            </Text>
            <Text className="text-xs text-muted flex-1">
              {isPlayingAudio ? "Pausar" : "Ouvir"} áudio
            </Text>
          </TouchableOpacity>
        )}

        {/* Timestamp */}
        {timestamp && (
          <Text className="text-xs text-muted mt-2">
            {timestamp.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </View>

      {/* User Avatar */}
      {isUser && (
        <View className="w-8 h-8 rounded-full bg-secondary items-center justify-center flex-shrink-0">
          <Text className="text-lg">👤</Text>
        </View>
      )}
    </View>
  );
}
