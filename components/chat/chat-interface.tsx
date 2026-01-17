import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./chat-message";
import { MicrophoneButton } from "./microphone-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { generateSpeechCached } from "@/server/elevenlabs";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  audioUrl?: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  moduleId: number;
  lessonId: number;
  onClose: () => void;
}

export function ChatInterface({
  moduleId,
  lessonId,
  onClose,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Mutations
  // const chatMutation = trpc.chat.sendMessage.useMutation();
  // const generateAudioMutation = trpc.chat.generateAudio.useMutation();

  // Initial message
  useEffect(() => {
    const initialMessage: Message = {
      id: "initial",
      role: "assistant",
      content: "Olá! Bem-vindo a esta lição. Vamos praticar juntos! 😊",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);

    // Generate audio for initial message
    generateAudioForMessage(initialMessage.content);
  }, []);

  const generateAudioForMessage = async (text: string) => {
    try {
      // In a real app, this would call ElevenLabs API
      // For now, we'll just simulate it
      console.log("Generating audio for:", text);
    } catch (error) {
      console.error("Erro ao gerar áudio:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Send to AI (mock for now)
      const response = {
        message: "That's great! I love your enthusiasm. Can you tell me more about that?",
      };

      // Add assistant response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Generate audio for response
      await generateAudioForMessage(response.message);

      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Desculpe, ocorreu um erro. Tente novamente.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrophonePress = async () => {
    setIsListening(!isListening);

    if (!isListening) {
      // Start listening
      // In a real app, this would use Web Speech API
      console.log("Iniciando reconhecimento de voz...");

      // Simulate voice input
      setTimeout(() => {
        setInputText("I love learning English with you");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-border bg-surface">
        <View className="flex-1">
          <Text className="text-lg font-bold text-foreground">Professor Virtual</Text>
          <Text className="text-xs text-muted">Prática de Conversação</Text>
        </View>
        <TouchableOpacity
          onPress={onClose}
          className="w-10 h-10 rounded-full bg-error/10 items-center justify-center"
        >
          <Text className="text-lg">✕</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-4"
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            audioUrl={message.audioUrl}
            timestamp={message.timestamp}
          />
        ))}

        {isLoading && (
          <View className="flex-row gap-2 items-center py-4">
            <ActivityIndicator color="#FF6B9D" size="small" />
            <Text className="text-sm text-muted">Professor está pensando...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View className="px-4 py-4 border-t border-border bg-surface gap-3">
        <View className="flex-row gap-2 items-end">
          <View className="flex-1">
            <Input
              placeholder="Digite sua resposta..."
              value={inputText}
              onChangeText={setInputText}
              keyboardType="default"
            />
          </View>

          <MicrophoneButton
            isListening={isListening}
            onPress={handleMicrophonePress}
            onRelease={() => {}}
          />

          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="w-12 h-12 rounded-xl bg-primary items-center justify-center disabled:opacity-50"
          >
            <Text className="text-xl">→</Text>
          </TouchableOpacity>
        </View>

        {isListening && (
          <View className="items-center py-2">
            <Text className="text-xs text-primary font-semibold">
              🎤 Escutando...
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
