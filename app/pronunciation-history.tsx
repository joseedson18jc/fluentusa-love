import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: number;
  word: string;
  date: string;
  score: number;
  duration: number; // segundos
  audioUrl: string;
  nativeAudioUrl: string;
  feedback?: string;
}

// Mock data
const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 1,
    word: "Hello",
    date: "2024-01-17",
    score: 92,
    duration: 2,
    audioUrl: "https://example.com/hello-user.mp3",
    nativeAudioUrl: "https://example.com/hello-native.mp3",
    feedback: "Excelente pronúncia!",
  },
  {
    id: 2,
    word: "World",
    date: "2024-01-17",
    score: 85,
    duration: 1.5,
    audioUrl: "https://example.com/world-user.mp3",
    nativeAudioUrl: "https://example.com/world-native.mp3",
    feedback: "Muito bom!",
  },
  {
    id: 3,
    word: "Hello",
    date: "2024-01-16",
    score: 78,
    duration: 2,
    audioUrl: "https://example.com/hello-user-2.mp3",
    nativeAudioUrl: "https://example.com/hello-native.mp3",
    feedback: "Bom, mas pode melhorar",
  },
  {
    id: 4,
    word: "Beautiful",
    date: "2024-01-16",
    score: 88,
    duration: 2.5,
    audioUrl: "https://example.com/beautiful-user.mp3",
    nativeAudioUrl: "https://example.com/beautiful-native.mp3",
    feedback: "Ótima entonação!",
  },
  {
    id: 5,
    word: "Love",
    date: "2024-01-15",
    score: 95,
    duration: 1.8,
    audioUrl: "https://example.com/love-user.mp3",
    nativeAudioUrl: "https://example.com/love-native.mp3",
    feedback: "Perfeito!",
  },
];

export default function PronunciationHistoryScreen() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "score" | "word">("date");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filtrar e ordenar dados
  const filteredHistory = useMemo(() => {
    let filtered = MOCK_HISTORY;

    // Filtrar por palavra
    if (searchWord) {
      filtered = filtered.filter((item) =>
        item.word.toLowerCase().includes(searchWord.toLowerCase())
      );
    }

    // Filtrar por data
    if (selectedDate) {
      filtered = filtered.filter((item) => item.date === selectedDate);
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "score") {
        return b.score - a.score;
      } else {
        return a.word.localeCompare(b.word);
      }
    });

    return filtered;
  }, [searchWord, selectedDate, sortBy]);

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCompare = () => {
    if (selectedItems.length < 2) {
      alert("Selecione pelo menos 2 gravações para comparar");
      return;
    }

    const selected = MOCK_HISTORY.filter((item) =>
      selectedItems.includes(item.id)
    );

    alert(`Comparando ${selectedItems.length} gravacoes`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 75) return "bg-blue-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-orange-100";
  };

  return (
    <ScreenContainer className="p-6">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-lg text-primary font-semibold">← Voltar</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground">
          Histórico de Pronúncia
        </Text>
        <View className="w-12" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Filtros */}
        <View className="gap-4 mb-6">
          {/* Busca por palavra */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Buscar Palavra
            </Text>
            <TextInput
              placeholder="Digite a palavra..."
              value={searchWord}
              onChangeText={setSearchWord}
              className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground"
              placeholderTextColor="#687076"
            />
          </View>

          {/* Filtros de data e ordenação */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setSortBy("date")}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg border",
                sortBy === "date"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              )}
            >
              <Text
                className={cn(
                  "text-xs font-semibold text-center",
                  sortBy === "date" ? "text-white" : "text-foreground"
                )}
              >
                Data
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortBy("score")}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg border",
                sortBy === "score"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              )}
            >
              <Text
                className={cn(
                  "text-xs font-semibold text-center",
                  sortBy === "score" ? "text-white" : "text-foreground"
                )}
              >
                Score
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortBy("word")}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg border",
                sortBy === "word"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              )}
            >
              <Text
                className={cn(
                  "text-xs font-semibold text-center",
                  sortBy === "word" ? "text-white" : "text-foreground"
                )}
              >
                Palavra
              </Text>
            </TouchableOpacity>
          </View>

          {/* Modo de visualização */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setViewMode("list")}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg border",
                viewMode === "list"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              )}
            >
              <Text
                className={cn(
                  "text-xs font-semibold text-center",
                  viewMode === "list" ? "text-white" : "text-foreground"
                )}
              >
                📋 Lista
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setViewMode("grid")}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg border",
                viewMode === "grid"
                  ? "bg-primary border-primary"
                  : "bg-surface border-border"
              )}
            >
              <Text
                className={cn(
                  "text-xs font-semibold text-center",
                  viewMode === "grid" ? "text-white" : "text-foreground"
                )}
              >
                🔲 Grade
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Estatísticas */}
        <View className="grid grid-cols-3 gap-2 mb-6">
          <View className="bg-blue-100 rounded-lg p-3 items-center">
            <Text className="text-2xl font-bold text-blue-600">
              {filteredHistory.length}
            </Text>
            <Text className="text-xs text-blue-700 mt-1">Tentativas</Text>
          </View>
          <View className="bg-green-100 rounded-lg p-3 items-center">
            <Text className="text-2xl font-bold text-green-600">
              {filteredHistory.length > 0
                ? Math.round(
                    filteredHistory.reduce((sum, item) => sum + item.score, 0) /
                      filteredHistory.length
                  )
                : 0}
              %
            </Text>
            <Text className="text-xs text-green-700 mt-1">Média</Text>
          </View>
          <View className="bg-purple-100 rounded-lg p-3 items-center">
            <Text className="text-2xl font-bold text-purple-600">
              {filteredHistory.length > 0
                ? Math.max(...filteredHistory.map((item) => item.score))
                : 0}
              %
            </Text>
            <Text className="text-xs text-purple-700 mt-1">Melhor</Text>
          </View>
        </View>

        {/* Lista de histórico */}
        <View className="gap-3 mb-6">
          {filteredHistory.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-lg font-semibold text-foreground mb-2">
                Nenhuma tentativa encontrada
              </Text>
              <Text className="text-sm text-muted">
                Comece a praticar pronúncia para ver seu histórico aqui
              </Text>
            </View>
          ) : (
            filteredHistory.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSelectItem(item.id)}
                className={cn(
                  "flex-row items-center gap-3 p-4 rounded-lg border-2",
                  selectedItems.includes(item.id)
                    ? "bg-primary/10 border-primary"
                    : "bg-surface border-border"
                )}
              >
                {/* Checkbox */}
                <View
                  className={cn(
                    "w-6 h-6 rounded border-2 items-center justify-center",
                    selectedItems.includes(item.id)
                      ? "bg-primary border-primary"
                      : "border-border"
                  )}
                >
                  {selectedItems.includes(item.id) && (
                    <Text className="text-white font-bold">✓</Text>
                  )}
                </View>

                {/* Conteúdo */}
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text className="text-lg font-bold text-foreground">
                      {item.word}
                    </Text>
                    <View
                      className={cn(
                        "px-2 py-1 rounded-full",
                        getScoreBg(item.score)
                      )}
                    >
                      <Text
                        className={cn(
                          "text-xs font-bold",
                          getScoreColor(item.score)
                        )}
                      >
                        {item.score}%
                      </Text>
                    </View>
                  </View>
                  <Text className="text-xs text-muted">
                    {new Date(item.date).toLocaleDateString("pt-BR")} •{" "}
                    {item.duration}s
                  </Text>
                </View>

                {/* Ícone de ação */}
                <Text className="text-xl">▶️</Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Botão de comparação */}
        {selectedItems.length >= 2 && (
          <TouchableOpacity
            onPress={handleCompare}
            className="bg-primary py-4 rounded-xl items-center justify-center mb-6"
          >
            <Text className="text-white font-bold text-lg">
              Comparar {selectedItems.length} Gravações
            </Text>
          </TouchableOpacity>
        )}

        {/* Spacer */}
        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
