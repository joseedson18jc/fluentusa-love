import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { QuestionCard } from "@/components/onboarding/question-card";
import { ONBOARDING_QUESTIONS, calculateCEFRLevel, calculateScore } from "@/lib/onboarding-questions";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/hooks/use-auth";

type OnboardingStep = "welcome" | "test" | "result";

export default function OnboardingScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const submitTestMutation = trpc.onboarding.submitTest.useMutation({
    onSuccess: (data) => {
      setStep("result");
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const totalQuestions = ONBOARDING_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(([qId, answer]) => {
    const question = ONBOARDING_QUESTIONS.find((q) => q.id === qId);
    return question && answer.toLowerCase() === question.correctAnswer.toLowerCase();
  }).length;

  const score = calculateScore(correctCount, totalQuestions);
  const cefrLevel = calculateCEFRLevel(score);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsLoading(true);
    await submitTestMutation.mutateAsync({ answers });
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep("test");
  };

  const handleContinue = () => {
    router.push("/(tabs)");
  };

  // Welcome Step
  if (step === "welcome") {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <View className="gap-6 items-center">
          <Text className="text-5xl">💕</Text>
          <Text className="text-3xl font-bold text-foreground text-center">
            Bem-vindo, {user?.name || "José"}!
          </Text>
          <Text className="text-base text-muted text-center leading-relaxed">
            Vamos descobrir seu nível de inglês com um teste de nivelamento rápido e divertido.
          </Text>
          <Text className="text-sm text-muted text-center">
            30 questões • ~15 minutos • Todos os níveis
          </Text>

          <TouchableOpacity
            className="bg-primary px-8 py-4 rounded-full mt-6 w-full items-center"
            onPress={() => setStep("test")}
          >
            <Text className="text-white font-bold text-lg">Começar Teste 🚀</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-8 py-4 rounded-full border-2 border-primary w-full items-center"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-primary font-bold text-lg">Pular por Agora</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  // Test Step
  if (step === "test") {
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const selectedAnswer = answers[currentQuestion.id];
  const isCorrect: boolean | undefined = isAnswered
    ? (selectedAnswer ? selectedAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase() : false)
    : undefined;

    return (
      <ScreenContainer className="p-6">
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          onAnswer={handleAnswer}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
        />

        {/* Navigation Buttons */}
        <View className="gap-3 mt-6">
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 p-4 rounded-xl border-2 border-border items-center disabled:opacity-50"
            >
              <Text className="text-foreground font-semibold">← Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              disabled={!isAnswered || isLoading}
              className="flex-1 p-4 rounded-xl bg-primary items-center disabled:opacity-50"
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold">
                  {currentQuestionIndex === totalQuestions - 1 ? "Finalizar" : "Próxima →"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Progress Indicator */}
          <Text className="text-center text-sm text-muted">
            {answeredCount} de {totalQuestions} respondidas
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  // Result Step
  if (step === "result") {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <View className="gap-6 items-center">
          {/* Celebration */}
          <Text className="text-6xl">🎉</Text>

          <Text className="text-3xl font-bold text-foreground text-center">
            Parabéns!
          </Text>

          {/* Score */}
          <View className="gap-2 items-center">
            <Text className="text-sm text-muted">Sua pontuação</Text>
            <Text className="text-5xl font-bold text-primary">{score}%</Text>
          </View>

          {/* CEFR Level */}
          <View className="gap-2 items-center bg-surface rounded-2xl p-6 w-full">
            <Text className="text-sm text-muted">Seu Nível CEFR</Text>
            <Text className="text-4xl font-bold text-foreground">{cefrLevel}</Text>
            <Text className="text-xs text-muted mt-2">
              {cefrLevel === "A1" && "Iniciante"}
              {cefrLevel === "A2" && "Elementar"}
              {cefrLevel === "B1" && "Intermediário"}
              {cefrLevel === "B2" && "Intermediário-Avançado"}
              {cefrLevel === "C1" && "Avançado"}
              {cefrLevel === "C2" && "Fluente"}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row gap-4 w-full">
            <View className="flex-1 bg-success/20 rounded-xl p-4 items-center">
              <Text className="text-2xl font-bold text-success">{correctCount}</Text>
              <Text className="text-xs text-muted mt-1">Corretas</Text>
            </View>
            <View className="flex-1 bg-error/20 rounded-xl p-4 items-center">
              <Text className="text-2xl font-bold text-error">{totalQuestions - correctCount}</Text>
              <Text className="text-xs text-muted mt-1">Incorretas</Text>
            </View>
          </View>

          {/* Message */}
          <Text className="text-center text-base text-muted leading-relaxed">
            Você está pronto para começar a aprender! Seu plano personalizado foi criado com base no seu nível.
          </Text>

          {/* Buttons */}
          <TouchableOpacity
            className="bg-primary px-8 py-4 rounded-full w-full items-center mt-4"
            onPress={handleContinue}
          >
            <Text className="text-white font-bold text-lg">Ir para Dashboard 🚀</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-8 py-4 rounded-full border-2 border-primary w-full items-center"
            onPress={handleStartAgain}
          >
            <Text className="text-primary font-bold text-lg">Fazer Teste Novamente</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return null;
}
