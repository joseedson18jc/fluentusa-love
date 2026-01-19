import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function WebModulesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const modules = [
    {
      id: 1,
      icon: "👋",
      title: "Greetings",
      description: "Saudações e apresentações",
      level: "A1",
      lessons: 8,
      progress: 100,
      color: "from-blue-400 to-cyan-400",
      category: "basics",
    },
    {
      id: 2,
      icon: "🏠",
      title: "Daily Routines",
      description: "Rotina diária em inglês",
      level: "A1-A2",
      lessons: 10,
      progress: 65,
      color: "from-orange-400 to-red-400",
      category: "daily",
    },
    {
      id: 3,
      icon: "❤️",
      title: "Dating & Love",
      description: "Expressões românticas e namoro",
      level: "B1-B2",
      lessons: 12,
      progress: 45,
      color: "from-rose-400 to-pink-400",
      category: "special",
    },
    {
      id: 4,
      icon: "🍽️",
      title: "Food & Dining",
      description: "Comida, restaurantes e bebidas",
      level: "A2-B1",
      lessons: 9,
      progress: 30,
      color: "from-yellow-400 to-orange-400",
      category: "daily",
    },
    {
      id: 5,
      icon: "🎬",
      title: "Entertainment",
      description: "Filmes, música e diversão",
      level: "B1-B2",
      lessons: 11,
      progress: 0,
      color: "from-purple-400 to-indigo-400",
      category: "culture",
    },
    {
      id: 6,
      icon: "🌍",
      title: "Travel",
      description: "Viagens, turismo e direções",
      level: "B1-B2",
      lessons: 10,
      progress: 0,
      color: "from-green-400 to-emerald-400",
      category: "daily",
    },
    {
      id: 7,
      icon: "💼",
      title: "Business",
      description: "Inglês para negócios",
      level: "B2-C1",
      lessons: 14,
      progress: 0,
      color: "from-slate-400 to-gray-400",
      category: "advanced",
    },
    {
      id: 8,
      icon: "🎓",
      title: "Academic",
      description: "Inglês acadêmico e formal",
      level: "B2-C2",
      lessons: 12,
      progress: 0,
      color: "from-teal-400 to-cyan-400",
      category: "advanced",
    },
  ];

  const categories = [
    { id: "all", label: "Todos", icon: "📚" },
    { id: "basics", label: "Básico", icon: "🎯" },
    { id: "daily", label: "Diário", icon: "🏠" },
    { id: "special", label: "Especial", icon: "💕" },
    { id: "culture", label: "Cultura", icon: "🎬" },
    { id: "advanced", label: "Avançado", icon: "🚀" },
  ];

  const filteredModules =
    selectedCategory === "all"
      ? modules
      : modules.filter((m) => m.category === selectedCategory);

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200";
    if (progress < 50) return "bg-yellow-400";
    if (progress < 100) return "bg-blue-400";
    return "bg-green-400";
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-rose-50 via-white to-purple-50">
      {/* Header */}
      <View className="px-6 py-6 gap-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-foreground">Módulos</Text>
          <View className="w-6" />
        </View>

        <Text className="text-base text-muted">
          Escolha um módulo para começar a aprender. Cada módulo tem lições progressivas.
        </Text>
      </View>

      {/* Category Filter */}
      <View className="px-6 py-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-2"
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full border flex-row items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-rose-500 to-purple-600 border-transparent"
                  : "bg-white border-border"
              }`}
            >
              <Text className="text-lg">{cat.icon}</Text>
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

      {/* Modules Grid */}
      <View className="px-6 py-6 gap-4 pb-8">
        {filteredModules.map((module) => (
          <TouchableOpacity
            key={module.id}
            onPress={() => router.push("/chat")}
            className="bg-white rounded-2xl overflow-hidden border border-border active:opacity-80"
          >
            {/* Header com Gradient */}
            <View
              className={`bg-gradient-to-r ${module.color} p-6 gap-3 relative overflow-hidden`}
            >
              {/* Decoração */}
              <View className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />

              <View className="flex-row items-start justify-between relative z-10">
                <View className="gap-2 flex-1">
                  <Text className="text-4xl">{module.icon}</Text>
                  <View>
                    <Text className="text-white text-2xl font-bold">
                      {module.title}
                    </Text>
                    <Text className="text-white/80 text-sm">
                      {module.description}
                    </Text>
                  </View>
                </View>
                <View className="bg-white/20 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-bold">
                    {module.level}
                  </Text>
                </View>
              </View>
            </View>

            {/* Content */}
            <View className="p-6 gap-4">
              {/* Stats */}
              <View className="flex-row gap-6">
                <View className="gap-1">
                  <Text className="text-xs text-muted">Lições</Text>
                  <Text className="text-lg font-bold text-foreground">
                    {module.lessons}
                  </Text>
                </View>
                <View className="gap-1">
                  <Text className="text-xs text-muted">Progresso</Text>
                  <Text className="text-lg font-bold text-foreground">
                    {module.progress}%
                  </Text>
                </View>
                {module.progress === 100 && (
                  <View className="gap-1">
                    <Text className="text-xs text-muted">Status</Text>
                    <Text className="text-lg font-bold text-green-600">✓ Completo</Text>
                  </View>
                )}
              </View>

              {/* Progress Bar */}
              <View className="gap-2">
                <View className="h-2 bg-border rounded-full overflow-hidden">
                  <View
                    className={`h-full ${getProgressColor(module.progress)} rounded-full`}
                    style={{ width: `${module.progress}%` }}
                  />
                </View>
                <Text className="text-xs text-muted text-right">
                  {module.progress === 0
                    ? "Não iniciado"
                    : module.progress === 100
                    ? "Concluído!"
                    : `${module.lessons - Math.ceil((module.lessons * module.progress) / 100)} lições restantes`}
                </Text>
              </View>

              {/* Button */}
              <TouchableOpacity className="bg-gradient-to-r from-rose-500 to-purple-600 py-3 rounded-lg items-center mt-2">
                <Text className="text-white font-bold">
                  {module.progress === 0
                    ? "Começar"
                    : module.progress === 100
                    ? "Revisar"
                    : "Continuar"}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
