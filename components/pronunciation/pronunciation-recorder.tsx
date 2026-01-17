import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { cn } from "@/lib/utils";

interface PronunciationRecorderProps {
  word: string;
  nativeAudioUrl: string;
  onRecordingComplete: (audioUri: string) => void;
  isAnalyzing?: boolean;
}

export function PronunciationRecorder({
  word,
  nativeAudioUrl,
  onRecordingComplete,
  isAnalyzing = false,
}: PronunciationRecorderProps) {
  const recorder = useAudioRecorder();
  const [isPlayingNative, setIsPlayingNative] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayNative = async () => {
    setIsPlayingNative(true);
    try {
      // Simular reprodução de áudio nativo
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setIsPlayingNative(false);
    }
  };

  const handleStartRecording = async () => {
    await recorder.startRecording();
  };

  const handleStopRecording = async () => {
    const audioUri = await recorder.stopRecording();
    if (audioUri) {
      onRecordingComplete(audioUri);
    }
  };

  const handlePlayRecording = async () => {
    await recorder.playRecording();
  };

  const handleDeleteRecording = async () => {
    await recorder.deleteRecording();
  };

  return (
    <View className="gap-6">
      {/* Instruction */}
      <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <Text className="text-sm font-semibold text-blue-900 mb-2">
          Como Funciona
        </Text>
        <Text className="text-sm text-blue-800 leading-relaxed">
          1. Ouça a pronúncia nativa
          {"\n"}
          2. Grave sua pronúncia
          {"\n"}
          3. Receba feedback detalhado
        </Text>
      </View>

      {/* Native Audio Player */}
      <View className="gap-2">
        <Text className="text-sm font-semibold text-foreground">
          Pronúncia Nativa
        </Text>
        <TouchableOpacity
          onPress={handlePlayNative}
          disabled={isPlayingNative}
          className="flex-row items-center gap-3 p-4 bg-surface rounded-xl border border-border active:bg-border/50"
        >
          <Text className="text-2xl">
            {isPlayingNative ? "⏸️" : "▶️"}
          </Text>
          <View className="flex-1">
            <Text className="font-semibold text-foreground">
              {word}
            </Text>
            <Text className="text-xs text-muted">
              Clique para ouvir a pronúncia
            </Text>
          </View>
          {isPlayingNative && (
            <ActivityIndicator color="#FF6B9D" size="small" />
          )}
        </TouchableOpacity>
      </View>

      {/* Recording Section */}
      <View className="gap-2">
        <Text className="text-sm font-semibold text-foreground">
          Sua Pronúncia
        </Text>

        {/* Recording Controls */}
        <View className="flex-row gap-3">
          {!recorder.isRecording && !recorder.audioUri ? (
            <TouchableOpacity
              onPress={handleStartRecording}
              disabled={isAnalyzing}
              className="flex-1 py-4 rounded-xl bg-primary items-center justify-center active:opacity-80 disabled:opacity-50"
            >
              <Text className="font-semibold text-white text-lg">
                🎤 Começar a Gravar
              </Text>
            </TouchableOpacity>
          ) : recorder.isRecording ? (
            <>
              <TouchableOpacity
                onPress={handleStopRecording}
                className="flex-1 py-4 rounded-xl bg-error items-center justify-center active:opacity-80"
              >
                <Text className="font-semibold text-white">
                  ⏹️ Parar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  recorder.isPaused
                    ? recorder.resumeRecording
                    : recorder.pauseRecording
                }
                className="flex-1 py-4 rounded-xl bg-warning items-center justify-center active:opacity-80"
              >
                <Text className="font-semibold text-white">
                  {recorder.isPaused ? "▶️" : "⏸️"}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={handlePlayRecording}
                className="flex-1 py-4 rounded-xl bg-secondary items-center justify-center active:opacity-80"
              >
                <Text className="font-semibold text-white">
                  ▶️ Ouvir
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteRecording}
                className="flex-1 py-4 rounded-xl bg-error/20 border border-error items-center justify-center active:bg-error/30"
              >
                <Text className="font-semibold text-error">
                  🗑️ Deletar
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Duration Display */}
        {(recorder.isRecording || recorder.audioUri) && (
          <View className="items-center py-2">
            <Text className="text-lg font-bold text-primary">
              {formatTime(recorder.duration)}
            </Text>
            {recorder.isRecording && (
              <Text className="text-xs text-muted mt-1">
                {recorder.isPaused ? "Pausado" : "Gravando..."}
              </Text>
            )}
          </View>
        )}

        {/* Error Message */}
        {recorder.error && (
          <View className="bg-error/10 border border-error rounded-lg p-3">
            <Text className="text-sm text-error font-semibold">
              Erro: {recorder.error}
            </Text>
          </View>
        )}
      </View>

      {/* Submit Button */}
      {recorder.audioUri && !isAnalyzing && (
        <TouchableOpacity
          onPress={() => onRecordingComplete(recorder.audioUri!)}
          className="py-4 rounded-xl bg-green-600 items-center justify-center active:opacity-80"
        >
          <Text className="font-semibold text-white text-lg">
            ✓ Analisar Pronúncia
          </Text>
        </TouchableOpacity>
      )}

      {isAnalyzing && (
        <View className="py-4 rounded-xl bg-primary/10 border border-primary items-center justify-center gap-2">
          <ActivityIndicator color="#FF6B9D" size="large" />
          <Text className="font-semibold text-primary">
            Analisando sua pronúncia...
          </Text>
        </View>
      )}
    </View>
  );
}
