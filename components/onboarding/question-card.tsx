import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { OnboardingQuestion } from "@/lib/onboarding-questions";

interface QuestionCardProps {
  question: OnboardingQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  selectedAnswer?: string;
  isCorrect?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  isAnswered,
  selectedAnswer,
  isCorrect,
}: QuestionCardProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSelectOption = (option: string) => {
    if (!isAnswered) {
      onAnswer(option);
    }
  };

  const handleSubmitText = () => {
    if (inputValue.trim() && !isAnswered) {
      onAnswer(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
      <View className="flex-1 gap-6 p-6">
        {/* Progress Bar */}
        <View className="gap-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-foreground">
              Questão {questionNumber} de {totalQuestions}
            </Text>
            <Text className="text-xs text-muted">{question.cefrLevel}</Text>
          </View>
          <View className="h-2 bg-surface rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{
                width: `${(questionNumber / totalQuestions) * 100}%`,
              }}
            />
          </View>
        </View>

        {/* Question */}
        <View className="gap-4">
          <Text className="text-xl font-bold text-foreground leading-relaxed">
            {question.question}
          </Text>

          {/* Question Type Badge */}
          <View className="flex-row gap-2">
            <View className="bg-secondary/20 px-3 py-1 rounded-full">
              <Text className="text-xs font-semibold text-secondary">
                {question.type === "multiple_choice" && "Múltipla Escolha"}
                {question.type === "fill_blank" && "Completar"}
                {question.type === "translation" && "Tradução"}
                {question.type === "listening" && "Listening"}
              </Text>
            </View>
          </View>
        </View>

        {/* Answer Options */}
        <View className="gap-3 flex-1">
          {question.type === "multiple_choice" && question.options && (
            <View className="gap-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === question.correctAnswer;

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectOption(option)}
                    disabled={isAnswered}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-colors",
                      isSelected && isCorrect
                        ? "bg-success/20 border-success"
                        : isSelected && !isCorrect
                          ? "bg-error/20 border-error"
                          : isAnswered && isCorrectOption
                            ? "bg-success/20 border-success"
                            : "bg-surface border-border hover:border-primary"
                    )}
                  >
                    <Text
                      className={cn(
                        "text-base font-medium",
                        isSelected && isCorrect
                          ? "text-success"
                          : isSelected && !isCorrect
                            ? "text-error"
                            : isAnswered && isCorrectOption
                              ? "text-success"
                              : "text-foreground"
                      )}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {question.type === "fill_blank" && (
            <View className="gap-3">
              <View className="flex-row gap-2 items-center">
                <Text className="text-base text-foreground">Resposta:</Text>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1 border-b-2 border-primary pb-2">
                  <Text
                    className={cn(
                      "text-lg font-semibold",
                      selectedAnswer
                        ? isCorrect
                          ? "text-success"
                          : "text-error"
                        : "text-foreground"
                    )}
                  >
                    {selectedAnswer || "..."}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {question.type === "translation" && (
            <View className="gap-3">
              <View className="flex-row gap-2 items-center">
                <Text className="text-base text-foreground">Tradução:</Text>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1 border-b-2 border-primary pb-2">
                  <Text
                    className={cn(
                      "text-lg font-semibold",
                      selectedAnswer
                        ? isCorrect
                          ? "text-success"
                          : "text-error"
                        : "text-foreground"
                    )}
                  >
                    {selectedAnswer || "..."}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Explanation (shown after answer) */}
        {isAnswered && (
          <View className="gap-3 p-4 bg-surface rounded-xl border border-border">
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-bold">
                {isCorrect ? "✓" : "✗"}
              </Text>
              <Text className="text-base font-semibold text-foreground">
                {isCorrect ? "Correto!" : "Incorreto"}
              </Text>
            </View>
            <Text className="text-sm text-muted leading-relaxed">
              {question.explanation}
            </Text>
          </View>
        )}

        {/* Submit Button (for text answers) */}
        {!isAnswered &&
          (question.type === "fill_blank" || question.type === "translation") && (
            <TouchableOpacity
              onPress={handleSubmitText}
              disabled={!inputValue.trim()}
              className={cn(
                "p-4 rounded-xl items-center",
                inputValue.trim() ? "bg-primary" : "bg-primary/50"
              )}
            >
              <Text className="text-white font-bold text-lg">Verificar Resposta</Text>
            </TouchableOpacity>
          )}
      </View>
    </ScrollView>
  );
}
