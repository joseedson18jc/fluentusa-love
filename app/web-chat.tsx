import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
  hasAudio?: boolean;
}

export default function WebChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá José! Bem-vindo ao FluentUSA Love! 💕 Hoje vamos praticar expressões românticas. Você está pronto?",
      sender: "ai",
      timestamp: "14:30",
      hasAudio: true,
    },
    {
      id: 2,
      text: "Sim, estou pronto!",
      sender: "user",
      timestamp: "14:31",
    },
    {
      id: 3,
      text: "Ótimo! Vamos começar com uma frase simples. Tente dizer: 'I love you more than anything in the world'",
      sender: "ai",
      timestamp: "14:31",
      hasAudio: true,
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Simular resposta da IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "Excelente pronúncia! Seu pitch estava muito próximo ao nativo. Continue assim! 🌟",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        hasAudio: true,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-rose-50 via-white to-purple-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-border flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <View>
            <Text className="font-bold text-foreground">Professor Virtual</Text>
            <Text className="text-xs text-green-600">● Online</Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-200 to-purple-200 items-center justify-center">
          <Text className="text-lg">ℹ️</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            className={`px-6 py-3 flex-row ${
              item.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {item.sender === "ai" && (
              <View className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-200 to-purple-200 items-center justify-center mr-3 flex-shrink-0">
                <Text className="text-lg">🤖</Text>
              </View>
            )}

            <View
              className={`max-w-xs gap-2 ${
                item.sender === "user"
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 rounded-3xl rounded-tr-none px-4 py-3"
                  : "bg-surface rounded-3xl rounded-tl-none px-4 py-3 border border-border"
              }`}
            >
              <Text
                className={`text-base ${
                  item.sender === "user" ? "text-white" : "text-foreground"
                }`}
              >
                {item.text}
              </Text>

              {item.hasAudio && item.sender === "ai" && (
                <TouchableOpacity className="flex-row items-center gap-2 mt-1">
                  <Text className="text-lg">🔊</Text>
                  <Text className="text-xs text-primary font-semibold">
                    Ouvir
                  </Text>
                </TouchableOpacity>
              )}

              <Text
                className={`text-xs ${
                  item.sender === "user" ? "text-white/70" : "text-muted"
                }`}
              >
                {item.timestamp}
              </Text>
            </View>

            {item.sender === "user" && (
              <View className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 items-center justify-center ml-3 flex-shrink-0">
                <Text className="text-lg">👤</Text>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
        scrollEnabled={true}
      />

      {/* Feedback Card */}
      <View className="px-6 py-4 gap-3">
        <View className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 gap-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg">✨</Text>
            <Text className="font-bold text-green-700">Feedback de Pronúncia</Text>
          </View>
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-green-700">Acurácia</Text>
              <View className="flex-row items-center gap-2">
                <View className="h-2 w-24 bg-green-200 rounded-full overflow-hidden">
                  <View className="h-full w-4/5 bg-green-500 rounded-full" />
                </View>
                <Text className="text-sm font-bold text-green-600">92%</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-green-700">Naturalidade</Text>
              <View className="flex-row items-center gap-2">
                <View className="h-2 w-24 bg-green-200 rounded-full overflow-hidden">
                  <View className="h-full w-3/5 bg-blue-500 rounded-full" />
                </View>
                <Text className="text-sm font-bold text-blue-600">88%</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Input Area */}
      <View className="px-6 py-4 gap-3 bg-white border-t border-border">
        {/* Quick Responses */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-2"
        >
          {[
            "I love you",
            "You are beautiful",
            "I miss you",
            "Let's talk",
          ].map((response, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                setInputText(response);
              }}
              className="bg-surface px-4 py-2 rounded-full border border-border"
            >
              <Text className="text-sm text-foreground font-semibold">
                {response}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View className="flex-row items-center gap-3">
          {/* Microphone Button */}
          <TouchableOpacity
            onPress={() => setIsRecording(!isRecording)}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              isRecording
                ? "bg-red-500 animate-pulse"
                : "bg-gradient-to-r from-rose-500 to-purple-600"
            }`}
          >
            <Text className="text-xl">🎤</Text>
          </TouchableOpacity>

          {/* Text Input */}
          <View className="flex-1 flex-row items-center bg-surface rounded-full px-4 border border-border">
            <TextInput
              placeholder="Digite sua resposta..."
              value={inputText}
              onChangeText={setInputText}
              className="flex-1 py-3 text-foreground"
              placeholderTextColor="#687076"
            />
          </View>

          {/* Send Button */}
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
            className={`w-12 h-12 rounded-full items-center justify-center ${
              inputText.trim()
                ? "bg-gradient-to-r from-rose-500 to-purple-600"
                : "bg-gray-300"
            }`}
          >
            <Text className="text-xl">➤</Text>
          </TouchableOpacity>
        </View>

        {/* Recording Indicator */}
        {isRecording && (
          <View className="flex-row items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
            <View className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <Text className="text-sm text-red-600 font-semibold">
              Gravando sua voz...
            </Text>
          </View>
        )}

        <Text className="text-xs text-muted text-center">
          Clique no microfone para gravar sua pronúncia
        </Text>
      </View>
    </View>
  );
}
