# FluentUSA Love 💕

**Um presente personalizado de aprendizado de inglês americano para José**

FluentUSA Love é um aplicativo móvel gamificado que combina inteligência artificial conversacional, voz natural americana e uma experiência romântica para ajudar falantes nativos de português brasileiro a alcançarem fluência em inglês americano.

---

## 🎯 Visão Geral

Este aplicativo foi criado especialmente para José, com foco em:

- **Fluência conversacional real** através de sessões interativas com IA
- **Voz natural americana** usando ElevenLabs API
- **Gamificação afetiva** com badges românticos e mensagens personalizadas
- **Calendário fixo** de 3 sessões por semana
- **12-16 módulos temáticos** focados em situações reais

---

## ✨ Funcionalidades Principais

### 1. Autenticação Simples
- Login com Google OAuth (Manus OAuth)
- Acesso exclusivo para José

### 2. Onboarding Personalizado
- Teste de nivelamento com 30 questões interativas
- IA analisa respostas e define nível CEFR (A1-C2)
- Plano de estudos personalizado

### 3. Dashboard Pessoal
- Card de progresso com nível CEFR, pontos e streak
- Calendário semanal visual (3 dias/semana)
- Badges recentes com títulos românticos
- Estatísticas de sessões e módulos

### 4. Sessões de Aprendizado (máx 60min, 3x/semana)
- Interface de chat com professor virtual
- Voz americana natural via ElevenLabs
- Reconhecimento de voz com Web Speech API
- Feedback oral com correções gentis
- 70% speaking/listening, 30% vocabulário/gramática

### 5. Gamificação Afetiva
- Sistema de pontos e streak
- Badges com títulos carinhosos (ex: "Streak Romântico 7 dias 💕")
- Mensagens personalizadas motivadoras
- Animações de confetti ao subir de nível

### 6. Módulos Temáticos (12-16)
1. Greetings & Introductions
2. Daily Routines
3. Small Talk & Social Skills
4. Ordering Food & Drinks
5. Shopping & Bargaining
6. Travel & Directions
7. Work & Business English
8. Hobbies & Interests
9. Health & Wellness
10. Technology & Social Media
11. **Dating & Relationships** (tema especial romântico)
12. American Culture & Slang

---

## 🛠️ Tech Stack

### Frontend
- **React Native 0.81** com **Expo SDK 54**
- **TypeScript 5.9**
- **NativeWind 4** (Tailwind CSS para React Native)
- **Expo Router 6** para navegação
- **React Query** para gerenciamento de estado

### Backend
- **tRPC** para API type-safe
- **Drizzle ORM** com MySQL/TiDB
- **Manus OAuth** para autenticação

### Integrações
- **OpenAI API** (via built-in LLM) para conversas e análise
- **ElevenLabs API** para text-to-speech (voz americana)
- **Web Speech API** para reconhecimento de voz
- **S3 Storage** para upload de áudio

---

## 📁 Estrutura do Projeto

```
fluentusa-love/
├── app/                      # Telas do app (Expo Router)
│   ├── (tabs)/              # Tab navigation
│   │   └── index.tsx        # Dashboard principal
│   ├── onboarding/          # Fluxo de onboarding
│   ├── session/             # Sessões de aprendizado
│   └── _layout.tsx          # Layout raiz
├── components/              # Componentes reutilizáveis
│   ├── screen-container.tsx # Container com SafeArea
│   └── ui/                  # Componentes de UI
├── server/                  # Backend (tRPC + Drizzle)
│   ├── routers.ts           # Rotas da API
│   ├── db.ts                # Helpers de banco de dados
│   └── _core/               # Framework (não modificar)
├── drizzle/                 # Schema e migrations
│   ├── schema.ts            # Definição de tabelas
│   └── migrations/          # Migrations SQL
├── lib/                     # Utilitários
│   ├── trpc.ts              # Cliente tRPC
│   └── utils.ts             # Funções auxiliares
├── hooks/                   # React hooks customizados
│   ├── use-auth.ts          # Hook de autenticação
│   └── use-colors.ts        # Hook de tema
├── assets/                  # Imagens e ícones
│   └── images/
│       └── icon.png         # Logo do app
├── design.md                # Documento de design completo
├── todo.md                  # Lista de funcionalidades
└── README.md                # Este arquivo
```

---

## 🗄️ Schema de Banco de Dados

O app utiliza 11 tabelas principais:

1. **users** - Usuários autenticados
2. **user_profiles** - Perfis de aprendizado (CEFR, pontos, streak)
3. **schedule_settings** - Configurações de calendário
4. **learning_modules** - Módulos temáticos
5. **user_progress** - Progresso em cada módulo
6. **learning_sessions** - Histórico de sessões
7. **badges** - Conquistas disponíveis
8. **user_badges** - Badges desbloqueados
9. **onboarding_tests** - Resultados do teste de nivelamento
10. **off_day_tasks** - Tarefas para dias sem sessão
11. **user_off_day_tasks** - Tarefas concluídas

---

## 🚀 Setup e Instalação

### Pré-requisitos

- Node.js 22.x
- pnpm 9.x
- Expo Go app (iOS/Android) para testar no celular
- Conta Manus (para OAuth e banco de dados)

### 1. Instalar Dependências

\`\`\`bash
cd fluentusa-love
pnpm install
\`\`\`

### 2. Configurar Variáveis de Ambiente

O projeto já vem configurado com as variáveis de ambiente do Manus. Não é necessário criar arquivo `.env`.

### 3. Executar Migrations

\`\`\`bash
pnpm db:push
\`\`\`

### 4. Iniciar Servidor de Desenvolvimento

\`\`\`bash
pnpm dev
\`\`\`

Isso iniciará:
- Backend (porta 3000)
- Metro bundler (porta 8081)

### 5. Testar no Celular

1. Instale o **Expo Go** no seu celular:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Escaneie o QR code que aparece no terminal

3. O app abrirá no Expo Go

---

## 🔑 Integrações Externas

### ElevenLabs API (Text-to-Speech)

**IMPORTANTE**: Para usar a voz americana natural, você precisa configurar a ElevenLabs API.

1. Crie uma conta em [ElevenLabs](https://elevenlabs.io/)
2. Obtenha sua API key no dashboard
3. Adicione a API key como secret no projeto Manus:
   - Vá para Settings → Secrets na UI do Manus
   - Adicione: `ELEVENLABS_API_KEY=sua_api_key_aqui`

**Vozes recomendadas**:
- **Rachel** (feminina, americana, natural)
- **Josh** (masculina, americana, expressiva)

### Exemplo de Uso no Código

\`\`\`typescript
// server/routers.ts
import axios from 'axios';

// Gerar áudio com ElevenLabs
const response = await axios.post(
  'https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID',
  {
    text: "Great job, José! Your pronunciation is getting better!",
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
    },
  },
  {
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer',
  }
);

// Upload para S3
const audioBuffer = Buffer.from(response.data);
const { url } = await storagePut('audio/feedback.mp3', audioBuffer, 'audio/mpeg');

return { audioUrl: url };
\`\`\`

---

## 🎨 Paleta de Cores

O app utiliza uma paleta romântica e motivadora:

| Token | Light Mode | Dark Mode | Uso |
|-------|-----------|-----------|-----|
| `primary` | `#FF6B9D` | `#FF8FB5` | Botões principais, badges |
| `secondary` | `#5B8CFF` | `#7BA3FF` | Progresso, streaks |
| `success` | `#4CAF50` | `#66BB6A` | Respostas corretas |
| `warning` | `#FF9800` | `#FFB74D` | Avisos |
| `error` | `#F44336` | `#EF5350` | Erros |
| `background` | `#FFFFFF` | `#1A1A1A` | Fundo principal |
| `surface` | `#F8F9FA` | `#2A2A2A` | Cards |
| `foreground` | `#1F1F1F` | `#FFFFFF` | Texto principal |
| `muted` | `#6B7280` | `#9CA3AF` | Texto secundário |

---

## 📱 User Flows

### Flow 1: Primeiro Acesso
1. Splash Screen → Login
2. Login com Google OAuth
3. Onboarding - Boas-vindas
4. Teste de Nivelamento (30 questões)
5. IA analisa e define nível CEFR
6. Resultado do teste
7. Escolher dias da semana (3x)
8. Dashboard

### Flow 2: Sessão de Aprendizado
1. Dashboard → "Iniciar Sessão de Hoje"
2. Professor virtual fala (ElevenLabs): "Hi José! Today we'll practice..."
3. Usuário clica no microfone e responde
4. Web Speech API transcreve
5. IA analisa e gera feedback oral
6. ElevenLabs converte feedback em áudio
7. Ciclo se repete por 45-60 min
8. Ao final: pontos + badges
9. Dashboard atualiza progresso

---

## 🧪 Testes

\`\`\`bash
# Executar testes
pnpm test

# Verificar TypeScript
pnpm check

# Lint
pnpm lint
\`\`\`

---

## 📦 Build e Deploy

### Build para Produção

\`\`\`bash
# Build do backend
pnpm build

# Build do app (EAS Build)
npx eas build --platform android
npx eas build --platform ios
\`\`\`

### Deploy

O backend pode ser deployado em qualquer plataforma Node.js (Vercel, Railway, Fly.io).

O app pode ser publicado via **EAS Submit** ou **App Store Connect / Google Play Console**.

---

## 🎯 Próximos Passos

### Funcionalidades a Implementar

- [ ] Telas de onboarding completas
- [ ] Interface de chat com voz
- [ ] Integração completa com ElevenLabs
- [ ] Sistema de badges automático
- [ ] Notificações push para lembretes
- [ ] Player de YouTube/Spotify integrado
- [ ] Tarefas para dias off
- [ ] Histórico de sessões
- [ ] Tela de perfil e configurações

### Melhorias Futuras

- [ ] Modo offline com sincronização
- [ ] Análise de pronúncia com IA
- [ ] Gráficos de progresso
- [ ] Compartilhamento de conquistas
- [ ] Integração com calendário nativo
- [ ] Suporte para outros idiomas

---

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas! Abra uma issue ou pull request.

---

## 📄 Licença

Este projeto é de uso pessoal e não possui licença pública.

---

## 💕 Mensagem Especial

Este app foi criado com muito carinho para José. Cada detalhe foi pensado para tornar o aprendizado de inglês uma experiência divertida, romântica e eficaz. Que você alcance a fluência e realize todos os seus sonhos! 🚀💕

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do tRPC](https://trpc.io/)
- [ElevenLabs API Docs](https://docs.elevenlabs.io/)

---

**Criado com 💕 por Manus AI**
