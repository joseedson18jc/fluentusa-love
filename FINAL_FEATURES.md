# Funcionalidades Finais - FluentUSA Love

## Visão Geral

Este documento descreve as três funcionalidades finais implementadas no FluentUSA Love para completar a experiência de aprendizado avançado.

## 1. Análise de Pitch (Entonação)

### Descrição

O módulo de análise de pitch detecta diferenças de tom e entonação entre a pronúncia do usuário e a pronúncia nativa, fornecendo feedback detalhado sobre naturalidade.

### Arquivo: `server/pitch-analysis.ts`

### Funcionalidades Principais

#### `analyzePitch(audioUrl)`

Analisa o pitch de um arquivo de áudio.

**Retorna:**
```typescript
{
  fundamentalFrequency: number;      // Hz (frequência fundamental)
  averagePitch: number;              // Hz (pitch médio)
  pitchRange: {
    min: number;                     // Hz (pitch mínimo)
    max: number;                     // Hz (pitch máximo)
  };
  stability: number;                 // 0-100 (estabilidade do pitch)
  vibrato: {
    detected: boolean;               // Vibrato detectado?
    frequency: number;               // Hz (frequência do vibrato)
    depth: number;                   // cents (profundidade)
  };
  intonationAccuracy: number;        // 0-100 (acurácia de entonação)
}
```

#### `comparePitch(userAudioUrl, nativeAudioUrl)`

Compara pitch entre áudio do usuário e nativo.

**Retorna:**
```typescript
{
  userPitch: PitchAnalysis;
  nativePitch: PitchAnalysis;
  pitchDifference: number;           // cents (diferença de pitch)
  intonationScore: number;           // 0-100 (score de entonação)
  feedback: {
    overall: string;
    strengths: string[];
    improvements: string[];
  };
}
```

### Padrões de Entonação Detectados

- **Declarativa**: Pitch cai no final (padrão em afirmações)
- **Interrogativa**: Pitch sobe no final (padrão em perguntas)
- **Enfática**: Pitch muito alto ou muito baixo (ênfase)
- **Neutra**: Pitch consistente

### Métricas de Qualidade

| Métrica | Excelente | Bom | Aceitável | Precisa Melhorar |
|---------|-----------|-----|-----------|------------------|
| Diferença de Pitch | < 25 cents | 25-50 cents | 50-100 cents | > 100 cents |
| Estabilidade | > 85% | 75-85% | 60-75% | < 60% |
| Vibrato | Natural | Presente | Ausente | Excessivo |

### Exemplo de Uso

```typescript
import { comparePitch } from "@/server/pitch-analysis";

const comparison = await comparePitch(
  "https://example.com/user-audio.mp3",
  "https://example.com/native-audio.mp3"
);

console.log(`Pitch Difference: ${comparison.pitchDifference} cents`);
console.log(`Intonation Score: ${comparison.intonationScore}%`);
console.log(`Feedback: ${comparison.feedback.overall}`);
```

## 2. Histórico Detalhado com Filtros

### Descrição

Tela completa que permite ao usuário visualizar, filtrar e comparar todas as suas tentativas anteriores de pronúncia.

### Arquivo: `app/pronunciation-history.tsx`

### Funcionalidades

#### Visualização de Histórico

- **Lista**: Visualização em linha com informações completas
- **Grade**: Visualização em grid para comparação rápida

#### Filtros Disponíveis

1. **Busca por Palavra**: Filtrar por nome da palavra
2. **Ordenação**:
   - Por Data (mais recente primeiro)
   - Por Score (maior primeiro)
   - Por Palavra (A-Z)

#### Estatísticas Exibidas

- **Tentativas**: Total de gravações
- **Média**: Score médio de todas as tentativas
- **Melhor**: Score mais alto alcançado

#### Seleção Múltipla

- Selecionar múltiplas gravações
- Comparar lado a lado
- Visualizar evolução

### Estrutura de Dados

```typescript
interface HistoryItem {
  id: number;
  word: string;
  date: string;
  score: number;
  duration: number;
  audioUrl: string;
  nativeAudioUrl: string;
  feedback?: string;
}
```

### Exemplo de Uso

```tsx
import PronunciationHistoryScreen from "@/app/pronunciation-history";

// Componente já inclui:
// - Filtros de busca
// - Ordenação
// - Seleção múltipla
// - Comparação de gravações
```

## 3. Badges de Milestones

### Descrição

Sistema de gamificação com badges que desbloqueia conquistas baseadas no progresso do usuário, mantendo a motivação alta.

### Arquivo: `lib/milestone-badges.ts`

### Categorias de Badges

#### 🎤 Badges de Pronúncia (10 pontos cada)

- **Primeiro Passo**: Complete 1 tentativa
- **Praticante**: Complete 10 tentativas
- **Dedicado**: Complete 50 tentativas
- **Mestre da Pronúncia**: Complete 100 tentativas

#### ⭐ Badges de Consistência (15 pontos cada)

- **Perfeição**: 95%+ em 5 tentativas
- **Excelência**: 85%+ em 10 tentativas consecutivas
- **Consistente**: Média de 80%+ em 20 tentativas

#### 🚀 Badges de Progresso (20 pontos cada)

- **Salto de Progresso**: Melhore 20 pontos
- **Melhoria Constante**: 5 dias de melhoria seguida
- **Dobro**: Dobre seu score em uma palavra

#### 🔥 Badges de Streak (25 pontos cada)

- **Streak Romântico 3 Dias**: 3 dias consecutivos
- **Streak Romântico 7 Dias**: 7 dias consecutivos
- **Mês Apaixonado**: 30 dias consecutivos

#### 👑 Badges de Conquista (50 pontos cada)

- **Mestre do Vocabulário**: 50 palavras diferentes
- **Fluência no Date Night**: 90%+ em Dating module
- **Pronto para Conversar**: 80%+ em todos os módulos

#### 🎁 Badges Especiais (100 pontos cada)

- **Madrugador**: Pratique entre 5h-7h
- **Coruja Noturna**: Pratique entre 22h-23h59
- **Guerreiro de Fim de Semana**: Pratique sábado e domingo

### Funções Principais

#### `calculateUnlockedBadges(progress)`

Calcula quais badges foram desbloqueados baseado no progresso.

**Parâmetro:**
```typescript
interface MilestoneProgress {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  currentStreak: number;
  longestStreak: number;
  uniqueWords: number;
  perfectScores: number;
  excellentScores: number;
  wordsAbove90: string[];
  daysActive: number;
  lastPracticeDate: Date | null;
}
```

**Retorna:** Array de badges desbloqueados

#### `getNextBadges(progress)`

Retorna os próximos 3 badges a desbloquear com barra de progresso.

**Retorna:** Array com próximos badges e progresso (0-100%)

#### `generateBadgeUnlockMessage(badge)`

Gera mensagem personalizada de desbloqueio.

**Retorna:** String com mensagem motivadora

#### `calculateBadgePoints(badge)`

Calcula pontos ganhos ao desbloquear um badge.

**Retorna:** Número de pontos

### Componente Visual: `BadgeDisplay`

```tsx
import { BadgeDisplay, BadgeUnlockAnimation } from "@/components/badges/badge-display";

// Exibir badges desbloqueados
<BadgeDisplay
  unlockedBadges={badges}
  progress={progress}
  onBadgePress={(badge) => console.log(badge.name)}
/>

// Animação de desbloqueio
<BadgeUnlockAnimation
  badge={newBadge}
  onComplete={() => console.log("Animação completa")}
/>
```

### Exemplo de Integração

```typescript
import { calculateUnlockedBadges, getNextBadges } from "@/lib/milestone-badges";

const progress: MilestoneProgress = {
  totalAttempts: 25,
  averageScore: 82,
  bestScore: 95,
  currentStreak: 5,
  longestStreak: 7,
  uniqueWords: 15,
  perfectScores: 3,
  excellentScores: 8,
  wordsAbove90: ["Hello", "Love", "Beautiful"],
  daysActive: 12,
  lastPracticeDate: new Date(),
};

// Badges desbloqueados
const unlockedBadges = calculateUnlockedBadges(progress);
// Resultado: [first_attempt, ten_attempts, three_day_streak, ...]

// Próximos badges
const nextBadges = getNextBadges(progress);
// Resultado: [fifty_attempts (50%), seven_day_streak (71%), ...]
```

## 4. Integração Completa

### Fluxo de Análise Completo

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Usuário grava pronúncia                                  │
│    ↓                                                         │
│ 2. Análise de Pitch (entonação)                             │
│    ├─ Frequência fundamental                                │
│    ├─ Estabilidade                                          │
│    ├─ Vibrato                                               │
│    └─ Padrão de entonação                                   │
│    ↓                                                         │
│ 3. Comparação com nativo                                    │
│    ├─ Diferença de pitch (cents)                            │
│    ├─ Score de entonação                                    │
│    └─ Feedback personalizado                                │
│    ↓                                                         │
│ 4. Armazenar no histórico                                   │
│    └─ Dados completos com timestamps                        │
│    ↓                                                         │
│ 5. Verificar badges desbloqueados                           │
│    ├─ Novos badges?                                         │
│    ├─ Mostrar animação                                      │
│    └─ Adicionar pontos                                      │
│    ↓                                                         │
│ 6. Exibir feedback ao usuário                               │
│    ├─ Score de pronúncia                                    │
│    ├─ Análise de pitch                                      │
│    ├─ Badges desbloqueados                                  │
│    └─ Próximos objetivos                                    │
│    ↓                                                         │
│ 7. Atualizar histórico                                      │
│    ├─ Adicionar à lista                                     │
│    ├─ Atualizar estatísticas                                │
│    └─ Permitir comparação                                   │
└─────────────────────────────────────────────────────────────┘
```

### Telas Relacionadas

1. **Dashboard**: Exibir badges desbloqueados e próximos
2. **Pronúncia**: Mostrar análise de pitch após gravação
3. **Histórico**: Filtrar e comparar tentativas
4. **Perfil**: Exibir todas as conquistas e estatísticas

## 5. Próximos Passos

1. **Análise Espectral Real** - Implementar FFT para análise de frequência precisa
2. **Comparação de Prosódia** - Analisar ritmo e entonação em frases completas
3. **Leaderboard Global** - Ranking de usuários por acurácia
4. **Desafios Semanais** - Temas especiais com badges exclusivos
5. **Feedback de IA Avançado** - Sugestões personalizadas baseadas em padrões

## Referências

- [Pitch Detection Algorithms](https://en.wikipedia.org/wiki/Pitch_detection_algorithm)
- [Gamification Design](https://en.wikipedia.org/wiki/Gamification)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
