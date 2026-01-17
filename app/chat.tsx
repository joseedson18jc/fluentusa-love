import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { ChatMessage } from "@/components/chat/chat-message";
import { MicrophoneButton } from "@/components/chat/microphone-button";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  audioUrl?: string;
  feedback?: {
    correction?: string;
    explanation?: string;
  };
  timestamp: Date;
}

export default function ChatScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moduleId] = useState(1); // TODO: passar como parâmetro
  const [lessonNumber] = useState(1); // TODO: passar como parâmetro
  const scrollViewRef = useRef<ScrollView>(null);

  const { transcript, isListening, startListening, stopListening, resetTranscript } =
    useSpeechRecognition({
      language: "pt-BR",
      onResult: (text) => {
        // Adicionar transcrição à mensagem do usuário
        console.log("Transcrição:", text);
      },
    });

  // Queries e Mutations
  const startChatMutation = trpc.sessions.startChat.useMutation();
  const processResponseMutation = trpc.sessions.processResponse.useMutation();

  // Inicializar chat
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const result = await startChatMutation.mutateAsync({
          moduleId,
          lessonNumber,
        });

        // Adicionar mensagem inicial do professor
        const greeting = typeof result.greeting === 'string' ? result.greeting : 'Olá! Vamos começar a praticar?';
        const assistantMessage: Message = {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: greeting,
          timestamp: new Date(),
        };

        setMessages([assistantMessage]);

        // TODO: Gerar áudio com ElevenLabs
        // const audioUrl = await generateSpeech(result.greeting);
        // assistantMessage.audioUrl = audioUrl;
      } catch (error) {
        console.error("Erro ao inicializar chat:", error);
      }
    };

    initializeChat();
  }, [moduleId, lessonNumber]);

  // Scroll para última mensagem
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleMicrophonePress = () => {
    startListening();
  };

  const handleMicrophoneRelease = async () => {
    stopListening();

    if (!transcript.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: transcript,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    resetTranscript();
    setIsLoading(true);

    try {
      // Processar resposta com IA
      const result = await processResponseMutation.mutateAsync({
        userMessage: transcript,
        conversationHistory: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      // Adicionar resposta do professor
      const teacherResponse = typeof result.teacherResponse === 'string' ? result.teacherResponse : 'Ótimo trabalho!';
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: teacherResponse,
        timestamp: new Date(),
        feedback: {
          correction: "Sua pronúncia está melhorando!",
          explanation: "Você usou bem o tempo passado nessa frase.",
        },
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // TODO: Gerar áudio com ElevenLabs
      // const audioUrl = await generateSpeech(result.teacherResponse);
      // assistantMessage.audioUrl = audioUrl;
    } catch (error) {
      console.error("Erro ao processar resposta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScreenContainer className="p-6">
        {/* Header */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xl font-bold text-foreground">
              Módulo 1: Greetings
            </Text>
            <TouchableOpacity className="px-3 py-1 bg-surface rounded-full">
              <Text className="text-xs text-muted">Lição 1/8</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-muted">
            Praticando conversação com seu professor virtual
          </Text>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 mb-6"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View className="flex-1 items-center justify-center gap-4">
              <Text className="text-4xl">👋</Text>
              <Text className="text-lg font-semibold text-foreground text-center">
                Olá, {user?.name}!
              </Text>
              <Text className="text-sm text-muted text-center">
                Toque no microfone para começar a conversar
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  audioUrl={message.audioUrl}
                  timestamp={message.timestamp}
                  feedback={message.feedback}
                />
              ))}
              {isLoading && (
                <View className="flex-row gap-3 items-center">
                  <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                    <Text className="text-lg">🤖</Text>
                  </View>
                  <ActivityIndicator color="#FF6B9D" />
                  <Text className="text-sm text-muted">Pensando...</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {/* Microphone Button */}
        <View className="items-center">
          <MicrophoneButton
            isListening={isListening}
            onPress={handleMicrophonePress}
            onRelease={handleMicrophoneRelease}
            disabled={isLoading}
          />

          {/* Transcript Display */}
          {transcript && (
            <View className="mt-4 p-4 bg-surface rounded-xl w-full border border-border">
              <Text className="text-xs text-muted font-semibold mb-1">
                Sua resposta:
              </Text>
              <Text className="text-base text-foreground">{transcript}</Text>
            </View>
          )}
        </View>

        {/* Session Info */}
        <View className="mt-6 p-4 bg-surface rounded-xl border border-border">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-xs text-muted">Tempo de sessão</Text>
              <Text className="text-lg font-bold text-foreground">12:34</Text>
            </View>
            <View>
              <Text className="text-xs text-muted">Pontos</Text>
              <Text className="text-lg font-bold text-primary">+250</Text>
            </View>
            <TouchableOpacity className="px-4 py-2 bg-primary rounded-full">
              <Text className="text-white text-sm font-semibold">Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
