import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para landing page web
    router.replace("/web-landing");
  }, [router]);

  return null;
}
