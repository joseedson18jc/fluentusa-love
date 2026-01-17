# Funcionalidades Avançadas - FluentUSA Love

## Visão Geral

Este documento descreve as funcionalidades avançadas implementadas no FluentUSA Love para análise profunda de pronúncia, histórico de progresso e visualizações intuitivas.

## 1. Integração com OpenAI Whisper API

### Descrição

O Whisper é um modelo de reconhecimento de fala robusto que transcreve áudio com alta precisão, suportando múltiplos idiomas e sotaques.

### Funcionalidades

#### `transcribeAudioWithWhisper(audioUrl, language)`

Transcreve um arquivo de áudio usando a API Whisper.

**Parâmetros:**
- `audioUrl` (string): URL do arquivo de áudio
- `language` (string): Código do idioma (padrão: "en")

**Retorna:** Texto transcrito

**Exemplo:**
```typescript
const transcription = await transcribeAudioWithWhisper(
  "https://example.com/audio.mp3",
  "en"
);
console.log(transcription); // "Hello, how are you?"
```

#### `transcribeAudioWithConfidence(audioUrl, language)`

Transcreve áudio e retorna um score de confiança.

**Retorna:**
```typescript
{
  text: string;
  confidence: number; // 0-100
}
```

#### `analyzeAudioQuality(audioUrl)`

Analisa a qualidade do áudio gravado.

**Retorna:**
```typescript
{
  quality: "low" | "medium" | "high";
  noiseLevel: number; // 0-100
  clarity: number; // 0-100
  recommendation: string;
}
```

### Cache de Transcrições

Para otimizar performance, transcrições são cacheadas em memória:

```typescript
// Usar versão cacheada
const transcription = await transcribeAudioCached(audioUrl, language);

// Limpar cache se necessário
clearTranscriptionCache();
```

## 2. Histórico de Pronúncia

### Schema do Banco de Dados

```sql
CREATE TABLE pronunciation_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  word VARCHAR(255) NOT NULL,
  moduleId INT,
  lessonId INT,
  accuracyScore INT,
  userAudioUrl TEXT,
  nativeAudioUrl TEXT,
  userTranscription TEXT,
  nativeTranscription TEXT,
  feedback JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tipos TypeScript

```typescript
interface PronunciationHistory {
  id: number;
  userId: number;
  word: string;
  moduleId?: number;
  lessonId?: number;
  accuracyScore?: number;
  userAudioUrl?: string;
  nativeAudioUrl?: string;
  userTranscription?: string;
  nativeTranscription?: string;
  feedback?: {
    overall: string;
    strengths: string[];
    improvements: string[];
    tips: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Armazenar Tentativa

```typescript
import { db } from "@/server/db";
import { pronunciationHistory } from "@/drizzle/schema";

const attempt = await db.insert(pronunciationHistory).values({
  userId: 1,
  word: "Hello",
  accuracyScore: 85,
  userAudioUrl: "https://...",
  nativeAudioUrl: "https://...",
  userTranscription: "hello",
  nativeTranscription: "hello",
  feedback: {
    overall: "Great pronunciation!",
    strengths: ["Clear enunciation"],
    improvements: ["Slight accent"],
    tips: ["Practice more"],
  },
});
```

## 3. Gráfico de Progresso

### Componente: `PronunciationProgressChart`

Exibe progresso de pronúncia com múltiplas visualizações.

**Props:**
```typescript
{
  attempts: PronunciationAttempt[];
  timeRange?: "week" | "month" | "all";
}
```

**Exemplo de Uso:**
```tsx
import { PronunciationProgressChart } from "@/components/pronunciation/pronunciation-progress-chart";

export function ProgressScreen() {
  const attempts = [
    { date: "2024-01-15", word: "Hello", score: 75 },
    { date: "2024-01-16", word: "Hello", score: 82 },
    { date: "2024-01-17", word: "World", score: 88 },
  ];

  return (
    <PronunciationProgressChart
      attempts={attempts}
      timeRange="month"
    />
  );
}
```

### Estatísticas Calculadas

- **Média de Score**: Média aritmética de todos os scores
- **Melhor Score**: Score máximo alcançado
- **Total de Tentativas**: Número total de gravações
- **Melhoria**: Diferença entre primeira e segunda metade das tentativas

### Visualizações

1. **Progresso ao Longo do Tempo**: Gráfico de linha mostrando evolução diária
2. **Score por Palavra**: Gráfico de barras com média por palavra
3. **Histórico Recente**: Lista das 5 últimas tentativas

## 4. Visualização de Espectrograma

### Componente: `AudioWaveformVisualizer`

Exibe waveform comparativo entre áudio do usuário e nativo.

**Props:**
```typescript
{
  userAudioUrl: string;
  nativeAudioUrl: string;
  height?: number;
}
```

**Exemplo de Uso:**
```tsx
import { AudioWaveformVisualizer } from "@/components/pronunciation/audio-waveform-visualizer";

export function ComparisonScreen() {
  return (
    <AudioWaveformVisualizer
      userAudioUrl="https://example.com/user-audio.mp3"
      nativeAudioUrl="https://example.com/native-audio.mp3"
      height={200}
    />
  );
}
```

### Métricas de Comparação

1. **Similaridade Geral**: Percentual de similaridade entre waveforms (0-100%)
2. **Intensidade Média**: Amplitude média do áudio (0-1)
3. **Variação de Frequência**: Mudanças de frequência ao longo do tempo

### Cores

- **Usuário**: Rosa (#FF6B9D)
- **Nativo**: Verde (#4CAF50)
- **Opacidade**: Baseada na intensidade do áudio

## 5. Comparação de Transcrições

### Função: `compareTranscriptions(transcription1, transcription2)`

Compara duas transcrições usando distância de Levenshtein.

**Retorna:** Score de similaridade (0-100)

**Exemplo:**
```typescript
import { compareTranscriptions } from "@/server/whisper";

const similarity = compareTranscriptions(
  "hello world",
  "hello word"
);
console.log(similarity); // ~95
```

### Algoritmo

1. Normalizar ambas as transcrições (lowercase, remover pontuação)
2. Calcular distância de Levenshtein
3. Converter para percentual de similaridade

## 6. Fluxo de Análise Completo

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Usuário grava pronúncia                                  │
│    ↓                                                         │
│ 2. Áudio enviado para servidor                              │
│    ↓                                                         │
│ 3. Análise de qualidade de áudio                            │
│    ├─ Noise level                                           │
│    ├─ Clarity                                               │
│    └─ Recomendações                                         │
│    ↓                                                         │
│ 4. Transcrição com Whisper                                  │
│    ├─ Transcrição do usuário                                │
│    └─ Transcrição nativa                                    │
│    ↓                                                         │
│ 5. Comparação de transcrições                               │
│    └─ Score de similaridade                                 │
│    ↓                                                         │
│ 6. Análise com IA                                           │
│    ├─ Feedback geral                                        │
│    ├─ Pontos fortes                                         │
│    ├─ Áreas para melhorar                                   │
│    └─ Dicas práticas                                        │
│    ↓                                                         │
│ 7. Armazenar no banco de dados                              │
│    └─ Histórico de pronúncia                                │
│    ↓                                                         │
│ 8. Exibir feedback ao usuário                               │
│    ├─ Score animado                                         │
│    ├─ Waveform comparativo                                  │
│    ├─ Métricas de comparação                                │
│    └─ Recomendações                                         │
│    ↓                                                         │
│ 9. Atualizar gráfico de progresso                           │
│    ├─ Histórico de tentativas                               │
│    ├─ Estatísticas                                          │
│    └─ Tendências                                            │
└─────────────────────────────────────────────────────────────┘
```

## 7. Integração com Módulos

Para adicionar análise de pronúncia a um módulo:

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
    <TouchableOpacity
      onPress={() => handlePronunciationPractice("Hello")}
    >
      <Text>Praticar Pronúncia</Text>
    </TouchableOpacity>
  );
}
```

## 8. Variáveis de Ambiente Necessárias

```bash
# OpenAI API Key (para Whisper)
OPENAI_API_KEY=sk-...

# Opcional: ElevenLabs API Key (para pronúncia nativa)
ELEVENLABS_API_KEY=...
```

## 9. Performance e Otimizações

### Cache

- Transcrições são cacheadas em memória
- Waveforms são amostrados para performance
- Histórico é paginado (últimas 100 tentativas)

### Limites

- Máximo 5 minutos de áudio por gravação
- Máximo 1000 tentativas por usuário em cache
- Análise de qualidade é assíncrona

## 10. Troubleshooting

### Erro: "Transcrição vazia"

**Causa:** Áudio de muito baixa qualidade ou muito curto

**Solução:**
- Verificar qualidade do áudio
- Garantir que o áudio tem pelo menos 0.5 segundos
- Gravar em ambiente silencioso

### Erro: "Similaridade muito baixa"

**Causa:** Pronúncia muito diferente da nativa

**Solução:**
- Ouvir pronúncia nativa novamente
- Praticar lentamente
- Verificar se está pronunciando a palavra correta

### Performance Lenta

**Causa:** Muitas requisições simultâneas

**Solução:**
- Usar cache de transcrições
- Limitar análises a 1 por vez
- Implementar rate limiting

## 11. Próximos Passos

1. **Análise Espectral Real** - Implementar FFT para análise de frequência precisa
2. **Comparação de Pitch** - Detectar diferenças de tom entre usuário e nativo
3. **Feedback de Prosódia** - Analisar ritmo e entonação
4. **Leaderboard** - Ranking de usuários por acurácia
5. **Badges Avançadas** - Conquistas baseadas em progresso

## Referências

- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
