# Integração ElevenLabs - Guia Completo

Este documento fornece instruções detalhadas para integrar a ElevenLabs API ao FluentUSA Love para gerar voz americana natural em todas as respostas do professor virtual.

---

## 📋 Visão Geral

O FluentUSA Love utiliza a ElevenLabs API para:

1. **Voz do Professor Virtual** - Todas as respostas do chat são convertidas em áudio
2. **Feedback Oral** - Correções e explicações são faladas em voz natural
3. **Frase do Dia** - Frases motivadoras com pronúncia americana
4. **Lembretes** - Notificações com áudio motivador

---

## 🔑 Passo 1: Criar Conta ElevenLabs

1. Acesse [ElevenLabs](https://elevenlabs.io/)
2. Clique em "Sign Up" (canto superior direito)
3. Preencha o formulário com seu email e senha
4. Confirme seu email
5. Faça login no dashboard

---

## 🎙️ Passo 2: Escolher Voz Americana

### Vozes Recomendadas para FluentUSA Love

| Voz | Tipo | Voice ID | Características |
|-----|------|----------|-----------------|
| **Rachel** | Feminina | `21m00Tcm4TlvDq8ikWAM` | Natural, amigável, clara |
| **Josh** | Masculino | `TXe7u2zqNgEN4DlzznzT` | Expressivo, motivador |
| **Bella** | Feminina | `EXAVITQu4vr4xnSDxMaL` | Jovem, energética |
| **Ethan** | Masculino | `g5CIjZEefAQLP7XYrE3t` | Profissional, calmo |

### Como Encontrar Voice IDs

1. No dashboard do ElevenLabs, vá para **Voices**
2. Clique em uma voz para ouvir uma amostra
3. Copie o **Voice ID** (aparece no URL ou ao clicar em "Copy ID")

---

## 🔐 Passo 3: Obter API Key

1. No dashboard, clique em seu **Perfil** (canto superior direito)
2. Vá para **API Keys**
3. Clique em **Create API Key**
4. Nomeie a chave (ex: "FluentUSA Love")
5. Copie a chave gerada

**Exemplo de API Key:**
```
sk_1234567890abcdefghijklmnopqrstuvwxyz
```

---

## ⚙️ Passo 4: Configurar no Manus

1. Abra o projeto FluentUSA Love no Manus
2. Vá para **Settings → Secrets** no painel direito
3. Clique em **Add Secret**
4. Adicione as seguintes variáveis:

| Key | Value | Exemplo |
|-----|-------|---------|
| `ELEVENLABS_API_KEY` | Sua API key | `sk_1234567890abcdefghijklmnopqrstuvwxyz` |
| `ELEVENLABS_VOICE_ID` | Voice ID escolhido | `21m00Tcm4TlvDq8ikWAM` (Rachel) |
| `ELEVENLABS_MODEL_ID` | Modelo de voz | `eleven_monolingual_v1` |

5. Clique em **Save**

---

## 💻 Passo 5: Implementar Função de TTS

Adicione esta função ao `server/routers.ts`:

```typescript
import axios from 'axios';
import { storagePut } from './storage';

/**
 * Gerar áudio com ElevenLabs
 */
async function generateSpeech(text: string, voiceId?: string): Promise<string> {
  const VOICE_ID = voiceId || process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_monolingual_v1';

  if (!API_KEY) {
    throw new Error('ELEVENLABS_API_KEY não configurada');
  }

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true,
        },
      },
      {
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    // Upload para S3
    const audioBuffer = Buffer.from(response.data);
    const timestamp = Date.now();
    const { url } = await storagePut(
      `audio/tts-${timestamp}.mp3`,
      audioBuffer,
      'audio/mpeg'
    );

    return url;
  } catch (error) {
    console.error('Erro ao gerar áudio ElevenLabs:', error);
    throw new Error('Falha ao gerar áudio');
  }
}

export { generateSpeech };
```

---

## 🎯 Passo 6: Integrar em Routers tRPC

### 6.1 Chat com Voz

Atualize o router `sessions` em `server/routers.ts`:

```typescript
sessions: router({
  startChat: protectedProcedure
    .input(z.object({ moduleId: z.number(), lessonNumber: z.number() }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a friendly American English teacher...`,
          },
          { role: "user", content: "Start the lesson" },
        ],
      });

      const greeting = typeof response.choices[0]?.message?.content === 'string' 
        ? response.choices[0].message.content 
        : 'Hi! Let\'s start today\'s lesson!';

      // Gerar áudio da saudação
      const audioUrl = await generateSpeech(greeting);

      return { greeting, audioUrl };
    }),

  processResponse: protectedProcedure
    .input(z.object({
      userMessage: z.string(),
      conversationHistory: z.array(z.object({ 
        role: z.enum(["system", "user", "assistant"]), 
        content: z.string() 
      })),
    }))
    .mutation(async ({ input }) => {
      const messages = [
        ...input.conversationHistory,
        { role: "user" as const, content: input.userMessage },
      ];

      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a friendly American English teacher...`,
          },
          ...messages,
        ],
      });

      const teacherResponse = typeof response.choices[0]?.message?.content === 'string'
        ? response.choices[0].message.content
        : 'Great! Let\'s continue.';

      // Gerar áudio do feedback
      const audioUrl = await generateSpeech(teacherResponse);

      return { teacherResponse, audioUrl };
    }),
}),
```

### 6.2 Frase do Dia

Adicione um novo router:

```typescript
phrases: router({
  getDailyPhrase: protectedProcedure.query(async () => {
    const { getDailyPhrase } = await import('@/lib/daily-phrases');
    const phrase = getDailyPhrase();
    
    // Gerar áudio da frase
    const audioUrl = await generateSpeech(phrase.english);
    
    return { ...phrase, audioUrl };
  }),
}),
```

---

## 🎵 Passo 7: Reproduzir Áudio no Frontend

### Usando expo-audio

Instale a dependência:

```bash
pnpm add expo-audio
```

Crie um hook para reproduzir áudio:

```typescript
// hooks/use-audio-player.ts
import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

export function useAudioPlayer(audioUrl?: string) {
  const player = useAudioPlayer();

  useEffect(() => {
    if (!audioUrl) return;

    const loadAndPlay = async () => {
      try {
        await player.loadAsync({ uri: audioUrl });
        await player.play();
      } catch (error) {
        console.error('Erro ao reproduzir áudio:', error);
      }
    };

    loadAndPlay();
  }, [audioUrl, player]);

  return player;
}
```

Use no componente:

```typescript
// components/chat/chat-message.tsx
import { useAudioPlayer } from '@/hooks/use-audio-player';

export function ChatMessage({ audioUrl, ...props }: ChatMessageProps) {
  const player = useAudioPlayer(audioUrl);

  return (
    <TouchableOpacity
      onPress={() => player.play()}
      className="flex-row items-center gap-2 p-2 bg-black/10 rounded-lg"
    >
      <Text className="text-lg">▶️</Text>
      <Text className="text-xs text-muted">Ouvir áudio</Text>
    </TouchableOpacity>
  );
}
```

---

## 🧪 Passo 8: Testar Integração

### Teste Manual

1. Abra o app no Expo Go
2. Navegue para a tela de chat
3. Clique no botão de microfone
4. Fale algo em português
5. Verifique se o áudio do professor é reproduzido

### Teste Automatizado

Crie um teste em `app.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { generateSpeech } from '@/server/routers';

describe('ElevenLabs Integration', () => {
  it('should generate speech from text', async () => {
    const audioUrl = await generateSpeech('Hello, how are you?');
    expect(audioUrl).toMatch(/^https:\/\//);
  });

  it('should handle long text', async () => {
    const longText = 'This is a longer sentence to test the ElevenLabs API with more content.';
    const audioUrl = await generateSpeech(longText);
    expect(audioUrl).toBeDefined();
  });
});
```

Execute:

```bash
pnpm test
```

---

## 📊 Limites e Preços

| Plano | Caracteres/Mês | Preço |
|-------|-----------------|-------|
| **Gratuito** | 10,000 | $0 |
| **Starter** | 100,000 | $5 |
| **Professional** | 1,000,000 | $99 |
| **Scale** | Ilimitado | Customizado |

**Estimativa para FluentUSA Love:**
- 3 sessões/semana × 45 min = ~2,000 caracteres/semana
- ~8,000 caracteres/mês (bem dentro do plano gratuito)

---

## 🐛 Troubleshooting

### Erro: "Invalid API Key"

**Solução**: Verifique se a API key foi copiada corretamente e está configurada em Settings → Secrets.

### Erro: "Voice ID not found"

**Solução**: Confirme que o Voice ID está correto. Copie novamente do dashboard do ElevenLabs.

### Áudio não reproduz

**Solução**: Verifique se:
1. A URL do S3 é válida
2. O dispositivo tem permissão de áudio
3. O arquivo MP3 foi gerado corretamente

### Limite de caracteres atingido

**Solução**: Upgrade para um plano pago ou resete a cota no mês seguinte.

---

## 🚀 Otimizações

### Cache de Áudio

Para evitar gerar o mesmo áudio múltiplas vezes:

```typescript
const audioCache = new Map<string, string>();

async function generateSpeechCached(text: string): Promise<string> {
  const cacheKey = text.toLowerCase();
  
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey)!;
  }

  const audioUrl = await generateSpeech(text);
  audioCache.set(cacheKey, audioUrl);
  
  return audioUrl;
}
```

### Compressão de Áudio

Configure a ElevenLabs para gerar áudio em qualidade otimizada:

```typescript
voice_settings: {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.3,  // Reduz variação para arquivo menor
  use_speaker_boost: false,  // Desabilita para arquivo menor
},
```

---

## 📚 Recursos Adicionais

- [Documentação ElevenLabs](https://docs.elevenlabs.io/)
- [API Reference](https://docs.elevenlabs.io/api-reference)
- [Vozes Disponíveis](https://elevenlabs.io/docs/voices)
- [Guia de Preços](https://elevenlabs.io/pricing)

---

## ✅ Checklist de Implementação

- [ ] Criar conta ElevenLabs
- [ ] Escolher voz americana (Rachel ou Josh)
- [ ] Obter API Key
- [ ] Configurar secrets no Manus
- [ ] Implementar função `generateSpeech`
- [ ] Atualizar routers tRPC
- [ ] Testar reprodução de áudio
- [ ] Implementar cache de áudio
- [ ] Monitorar uso de caracteres
- [ ] Documentar para equipe

---

**Pronto para adicionar voz ao FluentUSA Love! 🎙️💕**
