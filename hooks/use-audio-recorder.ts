import { useEffect, useState, useRef, useCallback } from "react";
import * as Audio from "expo-audio";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioUri: string | null;
  error: string | null;
}

export interface UseAudioRecorderReturn extends AudioRecorderState {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  pauseRecording: () => Promise<void>;
  resumeRecording: () => Promise<void>;
  resetRecording: () => void;
  playRecording: () => Promise<void>;
  deleteRecording: () => Promise<void>;
}

/**
 * Hook para gravação de áudio com expo-audio
 */
export function useAudioRecorder(): UseAudioRecorderReturn {
  const [state, setState] = useState<AudioRecorderState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioUri: null,
    error: null,
  });

  const recorderRef = useRef<any>(null);
  const soundRef = useRef<any>(null);
  const durationIntervalRef = useRef<any>(null);

  // Inicializar permissões de áudio
  useEffect(() => {
    const initAudio = async () => {
      try {
        await (Audio as any).requestPermissionsAsync?.();
      await (Audio as any).setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      } as any);
      } catch (error) {
        console.error("Erro ao inicializar áudio:", error);
        setState((prev) => ({
          ...prev,
          error: "Erro ao inicializar áudio",
        }));
      }
    };

    initAudio();

    return () => {
      // Cleanup
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      // Parar qualquer gravação anterior
      if (recorderRef.current) {
        await recorderRef.current.stopAndUnloadAsync();
      }

      // Criar nova gravação
      const recording = new (Audio as any).Recording();

      // Usar opções padrão de alta qualidade
      await recording.prepareToRecordAsync({
        isMeteringEnabled: true,
      } as any);

      await recording.startAsync();
      recorderRef.current = recording;

      setState((prev) => ({
        ...prev,
        isRecording: true,
        isPaused: false,
        duration: 0,
        error: null,
      }));

      // Atualizar duração a cada 100ms
      const interval = setInterval(async () => {
        if (recorderRef.current) {
          const status = await recorderRef.current.getStatusAsync();
          setState((prev) => ({
            ...prev,
            duration: Math.floor(status.durationMillis / 1000),
          }));
        }
      }, 100);
      durationIntervalRef.current = interval;
    } catch (error) {
      console.error("Erro ao iniciar gravação:", error);
      setState((prev) => ({
        ...prev,
        error: "Erro ao iniciar gravação",
      }));
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    try {
      if (!recorderRef.current) {
        return null;
      }

      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }

      await recorderRef.current.stopAndUnloadAsync();

      const uri = recorderRef.current.getURI();
      recorderRef.current = null;

      setState((prev) => ({
        ...prev,
        isRecording: false,
        isPaused: false,
        audioUri: uri || null,
      }));

      return uri || null;
    } catch (error) {
      console.error("Erro ao parar gravação:", error);
      setState((prev) => ({
        ...prev,
        error: "Erro ao parar gravação",
      }));
      return null;
    }
  }, []);

  const pauseRecording = useCallback(async () => {
    try {
      if (recorderRef.current && !state.isPaused) {
        await recorderRef.current.pauseAsync();

        if (durationIntervalRef.current) {
          clearInterval(durationIntervalRef.current);
        }

        setState((prev) => ({
          ...prev,
          isPaused: true,
        }));
      }
    } catch (error) {
      console.error("Erro ao pausar gravação:", error);
      setState((prev) => ({
        ...prev,
        error: "Erro ao pausar gravação",
      }));
    }
  }, [state.isPaused]);

  const resumeRecording = useCallback(async () => {
    try {
      if (recorderRef.current && state.isPaused) {
        await recorderRef.current.startAsync();

        setState((prev) => ({
          ...prev,
          isPaused: false,
        }));

        // Retomar atualização de duração
        const interval = setInterval(async () => {
          if (recorderRef.current) {
            const status = await recorderRef.current.getStatusAsync();
            setState((prev) => ({
              ...prev,
              duration: Math.floor(status.durationMillis / 1000),
            }));
          }
        }, 100);
        durationIntervalRef.current = interval;
      }
    } catch (error) {
      console.error("Erro ao retomar gravação:", error);
      setState((prev) => ({
        ...prev,
        error: "Erro ao retomar gravação",
      }));
    }
  }, [state.isPaused]);

  const resetRecording = useCallback(() => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }

    setState({
      isRecording: false,
      isPaused: false,
      duration: 0,
      audioUri: null,
      error: null,
    });
  }, []);

  const playRecording = useCallback(async () => {
    try {
      if (!state.audioUri) {
        return;
      }

      // Parar som anterior se existir
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await (Audio as any).Sound?.createAsync({ uri: state.audioUri });
      soundRef.current = sound;

      await sound.playAsync();
    } catch (error) {
      console.error("Erro ao reproduzir gravação:", error);
      setState((prev) => ({
        ...prev,
        error: "Erro ao reproduzir gravação",
      }));
    }
  }, [state.audioUri]);

  const deleteRecording = useCallback(async () => {
    try {
      if (state.audioUri && Platform.OS !== "web") {
        await FileSystem.deleteAsync(state.audioUri, { idempotent: true });
      }

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      resetRecording();
    } catch (error) {
      console.error("Erro ao deletar gravação:", error);
      setState((prev) => ({
        ...prev,
        error: "Erro ao deletar gravação",
      }));
    }
  }, [state.audioUri, resetRecording]);

  return {
    ...state,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    playRecording,
    deleteRecording,
  };
}
