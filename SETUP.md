# FluentUSA Love - Guia de Setup Completo

Este guia fornece instruções passo a passo para configurar e executar o aplicativo FluentUSA Love.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 22.x** ou superior ([Download](https://nodejs.org/))
- **pnpm 9.x** ou superior (`npm install -g pnpm`)
- **Git** para clonar o repositório
- **Expo Go** app no celular para testar:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

---

## 🚀 Instalação Rápida

### 1. Clonar o Repositório

\`\`\`bash
git clone <repository-url>
cd fluentusa-love
\`\`\`

### 2. Instalar Dependências

\`\`\`bash
pnpm install
\`\`\`

Isso instalará todas as dependências necessárias, incluindo:
- React Native e Expo
- tRPC e React Query
- Drizzle ORM
- NativeWind (Tailwind CSS)

### 3. Configurar Banco de Dados

O projeto já vem configurado com o banco de dados do Manus. Execute as migrations:

\`\`\`bash
pnpm db:push
\`\`\`

Isso criará todas as 11 tabelas necessárias:
- users, user_profiles, schedule_settings
- learning_modules, user_progress, learning_sessions
- badges, user_badges
- onboarding_tests
- off_day_tasks, user_off_day_tasks

### 4. Iniciar Servidor de Desenvolvimento

\`\`\`bash
pnpm dev
\`\`\`

Isso iniciará:
- **Backend** na porta 3000
- **Metro bundler** na porta 8081

Você verá um QR code no terminal.

### 5. Testar no Celular

1. Abra o **Expo Go** no seu celular
2. Escaneie o QR code que aparece no terminal
3. O app abrirá automaticamente

---

## 🔑 Configuração de APIs Externas

### ElevenLabs API (Text-to-Speech)

Para habilitar a voz americana natural, você precisa configurar a ElevenLabs API:

#### Passo 1: Criar Conta

1. Acesse [ElevenLabs](https://elevenlabs.io/)
2. Crie uma conta gratuita ou paga
3. Vá para o dashboard

#### Passo 2: Obter API Key

1. No dashboard, clique em seu perfil (canto superior direito)
2. Vá para "API Keys"
3. Clique em "Create API Key"
4. Copie a chave gerada

#### Passo 3: Adicionar Secret no Manus

1. Abra o projeto no Manus
2. Vá para **Settings → Secrets** na UI
3. Clique em "Add Secret"
4. Adicione:
   - **Key**: `ELEVENLABS_API_KEY`
   - **Value**: `sua_api_key_aqui`
5. Salve

#### Passo 4: Escolher Voz

1. No dashboard do ElevenLabs, vá para "Voices"
2. Escolha uma voz americana:
   - **Rachel** (feminina, natural, recomendada)
   - **Josh** (masculina, expressiva)
   - **Bella** (feminina, jovem)
3. Copie o **Voice ID** (ex: `21m00Tcm4TlvDq8ikWAM`)

#### Passo 5: Configurar no Código

Edite `server/routers.ts` e adicione a função de TTS:

\`\`\`typescript
import axios from 'axios';
import { storagePut } from './storage';

async function generateSpeech(text: string): Promise<string> {
  const VOICE_ID = 'COLE_SEU_VOICE_ID_AQUI'; // Rachel: 21m00Tcm4TlvDq8ikWAM

  const response = await axios.post(
    \`https://api.elevenlabs.io/v1/text-to-speech/\${VOICE_ID}\`,
    {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.5,
        use_speaker_boost: true,
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
  const timestamp = Date.now();
  const { url } = await storagePut(
    \`audio/tts-\${timestamp}.mp3\`,
    audioBuffer,
    'audio/mpeg'
  );

  return url;
}
\`\`\`

#### Teste a Integração

Execute este teste no backend:

\`\`\`typescript
// Adicione ao sessions router
testVoice: protectedProcedure.mutation(async () => {
  const audioUrl = await generateSpeech("Hi José! This is a test of the American voice. How does it sound?");
  return { audioUrl };
}),
\`\`\`

Chame no frontend:

\`\`\`typescript
const { mutate: testVoice } = trpc.sessions.testVoice.useMutation();
testVoice();
\`\`\`

---

## 🗄️ Gerenciamento de Banco de Dados

### Acessar Database UI

1. Abra o projeto no Manus
2. Clique em **Database** no painel direito
3. Você verá todas as tabelas criadas

### Visualizar Dados

- Clique em qualquer tabela para ver os registros
- Use a barra de pesquisa para filtrar
- Clique em "Add Row" para inserir dados manualmente

### Popular Dados Iniciais

Execute este script para adicionar módulos e badges:

\`\`\`sql
-- Inserir módulos de aprendizado
INSERT INTO learning_modules (title, description, \`order\`, totalLessons, cefrLevel, icon) VALUES
('Greetings & Introductions', 'Learn how to greet people and introduce yourself', 1, 8, 'A1', '👋'),
('Daily Routines', 'Talk about your daily activities', 2, 8, 'A2', '☀️'),
('Small Talk & Social Skills', 'Master casual conversations', 3, 10, 'B1', '💬'),
('Ordering Food & Drinks', 'Order at restaurants and cafes', 4, 8, 'B1', '🍔'),
('Shopping & Bargaining', 'Shop and negotiate prices', 5, 8, 'B1', '🛍️'),
('Travel & Directions', 'Navigate and ask for directions', 6, 10, 'B2', '✈️'),
('Work & Business English', 'Professional communication', 7, 12, 'B2', '💼'),
('Hobbies & Interests', 'Discuss your passions', 8, 8, 'B1', '🎨'),
('Health & Wellness', 'Talk about health topics', 9, 8, 'B2', '🏥'),
('Technology & Social Media', 'Tech vocabulary and trends', 10, 10, 'B2', '📱'),
('Dating & Relationships', 'Romantic conversations (special theme)', 11, 12, 'B2', '💕'),
('American Culture & Slang', 'Understand American expressions', 12, 10, 'C1', '🇺🇸');

-- Inserir badges
INSERT INTO badges (title, description, icon, \`condition\`) VALUES
('First Steps 👣', 'Completou a primeira sessão', '👣', 'Complete 1 session'),
('Streak Romântico 7 dias 💕', 'Manteve 7 dias de streak consecutivo', '💕', '7 day streak'),
('Fluência no Date Night 🌙', 'Completou o módulo Dating & Relationships', '🌙', 'Complete Dating module'),
('Conversador Nato 💬', 'Completou 10 sessões', '💬', '10 sessions'),
('Mestre do Inglês 🎓', 'Alcançou nível C1', '🎓', 'Reach C1 level'),
('Dedicação Total 🔥', 'Manteve 30 dias de streak', '🔥', '30 day streak'),
('Poliglota Apaixonado 🌍', 'Completou todos os módulos', '🌍', 'Complete all modules');

-- Inserir tarefas para dias off
INSERT INTO off_day_tasks (title, description, type, url) VALUES
('Ouça uma música em inglês', 'Escolha uma música americana e tente entender a letra', 'music', 'https://open.spotify.com/'),
('Assista 5 minutos de série', 'Assista um episódio curto com legendas em inglês', 'video', 'https://www.netflix.com/'),
('Leia um artigo curto', 'Leia uma notícia ou artigo em inglês', 'reading', 'https://www.bbc.com/news'),
('Ouça um podcast', 'Escute 10 minutos de um podcast americano', 'podcast', 'https://podcasts.apple.com/'),
('Pratique pronúncia', 'Repita 10 frases em voz alta', 'other', NULL);
\`\`\`

---

## 🧪 Testes e Validação

### Verificar TypeScript

\`\`\`bash
pnpm check
\`\`\`

### Executar Testes

\`\`\`bash
pnpm test
\`\`\`

### Lint

\`\`\`bash
pnpm lint
\`\`\`

---

## 🐛 Troubleshooting

### Erro: "Database not available"

**Solução**: Verifique se as migrations foram executadas:

\`\`\`bash
pnpm db:push
\`\`\`

### Erro: "Cannot find module"

**Solução**: Reinstale as dependências:

\`\`\`bash
rm -rf node_modules
pnpm install
\`\`\`

### Erro: "Metro bundler failed to start"

**Solução**: Limpe o cache do Metro:

\`\`\`bash
npx expo start --clear
\`\`\`

### Erro: "ElevenLabs API key not found"

**Solução**: Verifique se a API key foi adicionada corretamente em Settings → Secrets.

### App não abre no Expo Go

**Solução**: 
1. Certifique-se de que o celular e o computador estão na mesma rede Wi-Fi
2. Tente escanear o QR code novamente
3. Se não funcionar, use o túnel: `npx expo start --tunnel`

---

## 📱 Build para Produção

### Configurar EAS (Expo Application Services)

1. Instale o EAS CLI:

\`\`\`bash
npm install -g eas-cli
\`\`\`

2. Faça login:

\`\`\`bash
eas login
\`\`\`

3. Configure o projeto:

\`\`\`bash
eas build:configure
\`\`\`

### Build Android

\`\`\`bash
eas build --platform android
\`\`\`

### Build iOS

\`\`\`bash
eas build --platform ios
\`\`\`

### Submit para Lojas

\`\`\`bash
# Android
eas submit --platform android

# iOS
eas submit --platform ios
\`\`\`

---

## 🔄 Atualizações Over-the-Air (OTA)

Para enviar atualizações sem rebuild:

\`\`\`bash
eas update --branch production --message "Fix: correção de bug"
\`\`\`

---

## 📊 Monitoramento

### Logs do Backend

\`\`\`bash
# Ver logs em tempo real
pnpm dev

# Logs de produção (se deployado)
heroku logs --tail  # ou equivalente da sua plataforma
\`\`\`

### Analytics

Considere adicionar:
- **Sentry** para error tracking
- **Mixpanel** ou **Amplitude** para analytics
- **LogRocket** para session replay

---

## 🤝 Suporte

Se encontrar problemas:

1. Consulte a [documentação do Expo](https://docs.expo.dev/)
2. Verifique o [troubleshooting do tRPC](https://trpc.io/docs/client/troubleshooting)
3. Leia a [documentação do ElevenLabs](https://docs.elevenlabs.io/)

---

## 🎉 Próximos Passos

Após o setup, você pode:

1. **Testar o fluxo de autenticação**
2. **Popular o banco com dados de teste**
3. **Implementar as telas faltantes** (onboarding, chat)
4. **Integrar ElevenLabs** para voz
5. **Adicionar notificações push**
6. **Criar testes automatizados**

---

**Boa sorte com o desenvolvimento! 💕🚀**
