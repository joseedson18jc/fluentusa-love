# Sistema de Feedback de Pronúncia - FluentUSA Love

## Visão Geral

O sistema de feedback de pronúncia é um componente central do FluentUSA Love que permite aos usuários praticar e melhorar sua pronúncia de inglês americano através de gravação de áudio, análise com IA e feedback detalhado.

## Arquitetura

### Backend (`server/pronunciation.ts`)

O backend fornece as seguintes funcionalidades:

#### `analyzePronunciation(word, userAudioUrl, nativeAudioUrl)`

Analisa a pronúncia do usuário comparando com a pronúncia nativa.

**Parâmetros:**
- `word` (string): A palavra a ser analisada
- `userAudioUrl` (string): URL do áudio gravado pelo usuário
- `nativeAudioUrl` (string): URL do áudio nativo para comparação

**Retorna:**
```typescript
{
  word: string;
  targetPronunciation: string;
  userPronunciation: string;
  accuracyScore: number; // 0-100
  feedback: {
    overall: string;
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  audioUrl: string;
  nativeAudioUrl: string;
  timestamp: Date;
}
```

#### `generateNativePronunciationAudio(word, voiceId?)`

Gera áudio de pronúncia nativa usando ElevenLabs TTS.

**Parâmetros:**
- `word` (string): A palavra a pronunciar
- `voiceId` (string, opcional): ID da voz ElevenLabs (padrão: voz americana masculina)

**Retorna:** URL do áudio gerado

#### `compareAudioSimilarity(audio1Url, audio2Url)`

Compara dois áudios e retorna um score de similaridade.

**Parâmetros:**
- `audio1Url` (string): URL do primeiro áudio
- `audio2Url` (string): URL do segundo áudio

**Retorna:** Score de similaridade (0-100)

### Frontend

#### Hook: `useAudioRecorder()`

Hook customizado para gravação de áudio com suporte completo a play/pause/resume.

**Retorna:**
```typescript
{
  isRecording: boolean;
  isPaused: boolean;
  duration: number; // em segundos
  audioUri: string | null;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<string | null>;
  pauseRecording: () => Promise<void>;
  resumeRecording: () => Promise<void>;
  resetRecording: () => void;
  playRecording: () => Promise<void>;
  deleteRecording: () => Promise<void>;
}
```

**Exemplo de uso:**
```tsx
const recorder = useAudioRecorder();

// Iniciar gravação
await recorder.startRecording();

// Parar gravação
const audioUri = await recorder.stopRecording();

// Reproduzir gravação
await recorder.playRecording();
```

#### Componente: `PronunciationRecorder`

Componente de interface para gravação de pronúncia com botões e controles.

**Props:**
```typescript
{
  word: string;
  nativeAudioUrl: string;
  onRecordingComplete: (audioUri: string) => void;
  isAnalyzing?: boolean;
}
```

**Recursos:**
- Botão para ouvir pronúncia nativa
- Gravação com start/stop/pause/resume
- Reprodução da gravação
- Exclusão da gravação
- Indicador de duração
- Tratamento de erros

#### Componente: `PronunciationFeedback`

Componente para exibição de feedback detalhado após análise.

**Props:**
```typescript
{
  word: string;
  accuracyScore: number;
  feedback: {
    overall: string;
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  onRetry?: () => void;
  onContinue?: () => void;
}
```

**Recursos:**
- Card de score com animação de entrada
- Feedback geral
- Seções expansíveis (Pontos Fortes, Melhorias, Dicas)
- Botões de ação (Tentar Novamente, Continuar)
- Design responsivo com cores baseadas no score

#### Tela: `pronunciation-practice.tsx`

Tela completa de prática de pronúncia integrada ao app.

**Funcionalidades:**
- Exibição da palavra a pronunciar
- Integração com `PronunciationRecorder`
- Análise simulada de pronúncia
- Exibição de feedback com `PronunciationFeedback`
- Navegação entre gravação e feedback

## Fluxo de Uso

1. **Usuário acessa tela de prática** → `pronunciation-practice.tsx`
2. **Vê a palavra a pronunciar** → Ex: "Hello"
3. **Ouve pronúncia nativa** → Via ElevenLabs TTS
4. **Grava sua pronúncia** → Hook `useAudioRecorder`
5. **Sistema analisa** → `analyzePronunciation()` no backend
6. **Recebe feedback** → `PronunciationFeedback` com score e dicas
7. **Pode tentar novamente** → Volta ao passo 3

## Integração com Módulos

Para integrar o sistema de pronúncia em um módulo:

```tsx
import { useRouter } from "expo-router";

export function LessonScreen() {
  const router = useRouter();

  const handlePronunciationPractice = (word: string) => {
    router.push({
      pathname: "/pronunciation-practice",
      params: {
        word,
        moduleId: "1",
        lessonId: "1",
      },
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => handlePronunciationPractice("Hello")}>
        <Text>Praticar Pronúncia</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## Análise com IA

A análise de pronúncia utiliza OpenAI LLM para:

1. **Transcrever áudio** - Converter áudio para texto
2. **Comparar transcrições** - Comparar pronúncia do usuário com nativa
3. **Gerar feedback** - Criar feedback personalizado com:
   - Score de acurácia (0-100)
   - Feedback geral
   - Pontos fortes (máximo 3)
   - Áreas para melhorar (máximo 3)
   - Dicas práticas (máximo 3)

### Prompt de Análise

```
Você é um especialista em pronúncia de inglês americano. Analise a pronúncia do usuário comparada com a pronúncia nativa.

Palavra: [word]
Pronúncia Nativa: [native]
Pronúncia do Usuário: [user]

Forneça:
1. Score de acurácia (0-100)
2. Feedback geral
3. Pontos fortes (máximo 3)
4. Áreas para melhorar (máximo 3)
5. Dicas práticas (máximo 3)
```

## Cache

O sistema implementa cache para otimizar performance:

- **Cache de análises**: Análises anteriores são armazenadas em memória
- **Cache de áudio**: Áudios nativos são cacheados para reutilização

```typescript
// Usar versão cacheada
const analysis = await analyzePronunciationCached(word, userAudioUrl, nativeAudioUrl);

// Limpar cache se necessário
clearPronunciationCache();
```

## Permissões Necessárias

### iOS
```xml
<key>NSMicrophoneUsageDescription</key>
<string>Precisamos de acesso ao microfone para gravar sua pronúncia</string>
```

### Android
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Próximos Passos

1. **Integração com ElevenLabs Real** - Ativar TTS real para pronúncia nativa
2. **Análise de Espectrograma** - Implementar análise de frequência para maior precisão
3. **Histórico de Pronúncia** - Armazenar histórico de tentativas do usuário
4. **Comparação Visual** - Mostrar espectrograma comparativo
5. **Leaderboard de Pronúncia** - Ranking de usuários por acurácia

## Troubleshooting

### Erro: "Permissão de microfone negada"
- Verificar permissões no `app.config.ts`
- Solicitar permissão explicitamente em tempo de execução

### Erro: "Áudio não gravado"
- Verificar se o dispositivo tem espaço em disco
- Testar em dispositivo real (simulador pode ter limitações)

### Análise retorna score baixo
- Verificar qualidade do áudio (sem ruído de fundo)
- Gravar em ambiente silencioso
- Tentar novamente com melhor dicção

## Referências

- [Expo Audio Documentation](https://docs.expo.dev/versions/latest/sdk/audio/)
- [ElevenLabs API](https://elevenlabs.io/docs)
- [OpenAI API](https://platform.openai.com/docs)
