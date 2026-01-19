import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Usar setTimeout para garantir que o router está pronto
    const timer = setTimeout(() => {
      router.replace("/web-landing");
    }, 100);
    return () => clearTimeout(timer);
  }, [router]);

  return <View className="flex-1 bg-white" />;
}
