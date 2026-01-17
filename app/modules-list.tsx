import { ScrollView, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { ModuleCard } from "@/components/module-card";
import { MODULES } from "@/lib/modules";
import { useState, useMemo } from "react";

type Category = "all" | "basic" | "daily" | "social" | "practical" | "professional" | "special";
type Difficulty = "all" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export default function ModulesListScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("all");

  const categories: Array<{ id: Category; label: string; emoji: string }> = [
    { id: "all", label: "Todos", emoji: "🎯" },
    { id: "basic", label: "Básico", emoji: "📚" },
    { id: "daily", label: "Diário", emoji: "🌅" },
    { id: "social", label: "Social", emoji: "💬" },
    { id: "practical", label: "Prático", emoji: "🛠️" },
    { id: "professional", label: "Profissional", emoji: "💼" },
    { id: "special", label: "Especial", emoji: "💕" },
  ];

  const difficulties: Array<{ id: Difficulty; label: string }> = [
    { id: "all", label: "Todos" },
    { id: "A1", label: "A1" },
    { id: "A2", label: "A2" },
    { id: "B1", label: "B1" },
    { id: "B2", label: "B2" },
    { id: "C1", label: "C1" },
    { id: "C2", label: "C2" },
  ];

  const filteredModules = useMemo(() => {
    return MODULES.filter((module) => {
      const categoryMatch = selectedCategory === "all" || module.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === "all" || module.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  return (
    <ScreenContainer className="p-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mb-4">
            <Text className="text-lg text-primary font-semibold">← Voltar</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-foreground mb-2">Módulos</Text>
          <Text className="text-sm text-muted">
            {filteredModules.length} módulo{filteredModules.length !== 1 ? "s" : ""} disponível{filteredModules.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {/* Category Filter */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-foreground mb-3">Categoria</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            className="gap-2"
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full border-2 flex-row items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <Text>{cat.emoji}</Text>
                <Text
                  className={`text-sm font-semibold ${
                    selectedCategory === cat.id ? "text-white" : "text-foreground"
                  }`}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Difficulty Filter */}
        <View className="mb-8">
          <Text className="text-sm font-semibold text-foreground mb-3">Nível</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            className="gap-2"
          >
            {difficulties.map((diff) => (
              <TouchableOpacity
                key={diff.id}
                onPress={() => setSelectedDifficulty(diff.id)}
                className={`px-4 py-2 rounded-full border-2 ${
                  selectedDifficulty === diff.id
                    ? "bg-secondary border-secondary"
                    : "bg-surface border-border"
                }`}
              >
                <Text
                  className={`text-sm font-bold ${
                    selectedDifficulty === diff.id ? "text-white" : "text-foreground"
                  }`}
                >
                  {diff.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Modules Grid */}
        {filteredModules.length > 0 ? (
          <View className="gap-4">
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                emoji={module.emoji}
                description={module.description}
                difficulty={module.difficulty}
                color={`bg-gradient-to-br ${module.color}`}
                lessonsCount={module.lessons.length}
                progress={Math.floor(Math.random() * 100)}
                onPress={() => {
                  // Navegar para módulo
                  console.log(`Módulo ${module.id} selecionado`);
                }}
              />
            ))}
          </View>
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-4xl mb-4">🔍</Text>
            <Text className="text-lg font-semibold text-foreground mb-2">
              Nenhum módulo encontrado
            </Text>
            <Text className="text-sm text-muted text-center">
              Tente ajustar os filtros de categoria ou nível
            </Text>
          </View>
        )}

        {/* Footer */}
        <View className="py-8">
          <Text className="text-xs text-muted text-center">
            Dica: Comece pelos módulos básicos (A1) e progra da para níveis mais avançados
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
