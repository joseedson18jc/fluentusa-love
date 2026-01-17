# FluentUSA Love - Design Document

## Visão Geral

**FluentUSA Love** é um presente personalizado de aprendizado de inglês americano criado especialmente para José, falante nativo de português brasileiro. O aplicativo combina gamificação afetiva, inteligência artificial conversacional e voz natural americana para criar uma experiência de aprendizado imersiva, divertida e romântica.

### Princípios de Design

O design do aplicativo segue rigorosamente as **Apple Human Interface Guidelines (HIG)** para criar uma experiência que pareça nativa do iOS, com foco em:

- **Orientação portrait (9:16)** e uso com uma mão
- **Navegação intuitiva** com tab bar inferior
- **Feedback tátil e visual** em todas as interações
- **Hierarquia visual clara** com tipografia e espaçamento consistentes
- **Cores suaves e acolhedoras** que transmitem afeto e motivação
- **Animações sutis** que guiam o usuário sem distrair

---

## Paleta de Cores

O app utiliza uma paleta romântica e motivadora, inspirada em tons quentes e acolhedores:

| Token | Light Mode | Dark Mode | Uso |
|-------|-----------|-----------|-----|
| `primary` | `#FF6B9D` (rosa romântico) | `#FF8FB5` (rosa claro) | Botões principais, badges, destaques |
| `secondary` | `#5B8CFF` (azul americano) | `#7BA3FF` | Progresso, streaks, elementos secundários |
| `success` | `#4CAF50` | `#66BB6A` | Respostas corretas, conquistas |
| `warning` | `#FF9800` | `#FFB74D` | Avisos, lembretes |
| `error` | `#F44336` | `#EF5350` | Erros, correções |
| `background` | `#FFFFFF` | `#1A1A1A` | Fundo principal |
| `surface` | `#F8F9FA` | `#2A2A2A` | Cards, módulos |
| `foreground` | `#1F1F1F` | `#FFFFFF` | Texto principal |
| `muted` | `#6B7280` | `#9CA3AF` | Texto secundário |

---

## Lista de Telas

### 1. **Splash Screen**
- Logo do app com animação suave
- Transição para Login ou Dashboard (se já autenticado)

### 2. **Login Screen**
- Título: "FluentUSA Love 💕"
- Subtítulo: "Seu caminho para a fluência em inglês americano"
- Botão "Entrar com Google" (OAuth)
- Campo de senha única (alternativa)
- Ilustração romântica de fundo

### 3. **Onboarding - Teste de Nivelamento**
- **Tela de Boas-vindas**: "Olá, José! Vamos descobrir seu nível de inglês?"
- **30 Questões Interativas**:
  - Múltipla escolha
  - Áudio (listening comprehension)
  - Completar frases
  - Tradução rápida
- **Barra de Progresso**: mostra questão atual (ex: "5/30")
- **Feedback Imediato**: ícone de check/erro após cada resposta
- **Resultado Final**: "Seu nível é B1 (Intermediário)! 🎉"

### 4. **Dashboard (Home)**
- **Header**:
  - Avatar do usuário (canto superior esquerdo)
  - Título: "Olá, José! 💕"
  - Ícone de configurações (canto superior direito)
- **Seção de Progresso**:
  - Card grande com nível CEFR atual (ex: "B1 → B2")
  - Barra de progresso visual
  - Pontos acumulados (ex: "1.250 pontos")
  - Streak atual (ex: "🔥 7 dias seguidos")
- **Calendário de Sessões**:
  - Visualização semanal (Seg/Qua/Sex ou Ter/Qui/Sáb)
  - Dias concluídos marcados com check verde
  - Próxima sessão destacada
- **Badges Recentes**:
  - Grid horizontal scrollável
  - Badges animados com títulos carinhosos
  - Ex: "Streak Romântico 7 dias 💕", "Fluência no Date Night 🌙"
- **Botão Principal**: "Iniciar Sessão de Hoje" (destaque com animação pulse)

### 5. **Sessões de Aprendizado (Chat + Voz)**
- **Header**:
  - Timer da sessão (ex: "45:00")
  - Botão de pausa/sair
- **Interface de Chat**:
  - Mensagens do professor virtual (com avatar e voz)
  - Mensagens do aluno (gravadas ou digitadas)
  - Botão de microfone (grande, central) para gravar resposta
  - Botão de teclado (alternativa para digitar)
- **Feedback Visual**:
  - Animação de onda sonora enquanto o professor fala
  - Transcrição em tempo real da fala do aluno
  - Correções destacadas em amarelo com explicação
- **Módulos Temáticos**:
  - Título do módulo no topo (ex: "Módulo 3: Small Talk & Social Skills")
  - Progresso do módulo (ex: "Lição 2/8")
- **Embeds de Mídia**:
  - Player de YouTube/Spotify integrado
  - Legendas progressivas (português → inglês)

### 6. **Perfil e Configurações**
- **Informações do Usuário**:
  - Foto, nome, email
  - Nível CEFR, pontos totais, dias de streak
- **Configurações de Voz**:
  - Escolher voz do professor (masculina/feminina americana)
  - Ajustar velocidade da fala
- **Configurações de Calendário**:
  - Escolher dias da semana (3x/semana)
  - Ativar/desativar lembretes por email/push
- **Histórico de Sessões**:
  - Lista de sessões concluídas
  - Estatísticas (tempo total, módulos concluídos)
- **Logout**

### 7. **Badges e Conquistas**
- **Grid de Badges**:
  - Badges desbloqueados (coloridos)
  - Badges bloqueados (cinza)
- **Detalhes do Badge**:
  - Título carinhoso
  - Descrição
  - Data de conquista
  - Mensagem personalizada

### 8. **Tarefas Leves (Dias Off)**
- **Lista de Tarefas**:
  - Ex: "Ouça 1 música em inglês", "Assista 5 min de série"
  - Checkbox para marcar como concluída
- **Sugestões de Conteúdo**:
  - Links para músicas, podcasts, vídeos

---

## User Flows Principais

### Flow 1: Primeiro Acesso
1. **Splash Screen** → **Login Screen**
2. Usuário faz login com Google ou senha única
3. **Onboarding - Boas-vindas** → **Teste de Nivelamento (30 questões)**
4. IA analisa respostas e define nível CEFR
5. **Resultado do Teste** → **Dashboard**
6. Usuário escolhe dias da semana para sessões
7. **Dashboard** exibe próxima sessão e badges iniciais

### Flow 2: Sessão de Aprendizado
1. Usuário acessa **Dashboard**
2. Clica em "Iniciar Sessão de Hoje"
3. **Sessão de Chat + Voz** inicia
4. Professor virtual fala (áudio ElevenLabs): "Hi José! Today we'll practice ordering food at a restaurant."
5. Usuário clica no microfone e responde
6. Web Speech API transcreve a fala
7. IA analisa resposta e gera feedback oral
8. ElevenLabs converte feedback em áudio
9. Ciclo se repete por 45-60 minutos
10. Ao final, usuário recebe pontos e badges
11. **Dashboard** atualiza progresso e streak

### Flow 3: Visualizar Badges
1. Usuário acessa **Dashboard**
2. Clica em um badge na seção "Badges Recentes"
3. **Detalhes do Badge** exibe título, descrição e mensagem personalizada
4. Usuário volta para **Dashboard**

### Flow 4: Configurar Calendário
1. Usuário acessa **Perfil e Configurações**
2. Clica em "Configurações de Calendário"
3. Escolhe dias da semana (ex: Seg/Qua/Sex)
4. Ativa lembretes por email/push
5. Salva alterações
6. **Dashboard** atualiza calendário

---

## Componentes Principais

### 1. **ProgressCard**
- Card grande com nível CEFR, barra de progresso, pontos e streak
- Animação de confetti ao subir de nível

### 2. **BadgeCard**
- Card pequeno com ícone do badge, título e data
- Animação de brilho ao desbloquear

### 3. **SessionCalendar**
- Visualização semanal com dias marcados
- Próxima sessão destacada com borda colorida

### 4. **ChatMessage**
- Balão de mensagem com avatar (professor ou aluno)
- Suporte para texto, áudio e transcrição

### 5. **VoiceRecorder**
- Botão de microfone com animação de onda sonora
- Feedback visual durante gravação

### 6. **FeedbackBubble**
- Balão de correção com texto destacado em amarelo
- Explicação em português e inglês

### 7. **MediaEmbed**
- Player de YouTube/Spotify integrado
- Controles de legendas progressivas

---

## Funcionalidades Detalhadas

### Voz com ElevenLabs
- **Voz Padrão**: Americana natural e expressiva (ex: "Josh" ou "Rachel")
- **Uso**: Todas as respostas do professor (frases, correções, motivações)
- **Feedback Oral**: Gentil, com comparações ao português e humor brasileiro
- **Exemplo**: "Great job, José! Your pronunciation of 'water' is getting better. In Portuguese, we say 'água', but in American English, it's more like 'wah-der'. Keep it up! 💕"

### Gamificação Afetiva
- **Badges Carinhosos**: Títulos românticos e motivadores
- **Mensagens Personalizadas**: "Você está incrível hoje, continua assim! 💕"
- **Mini-testes**: Feedback imediato com pontos e confetti

### Módulos Temáticos (12-16)
1. **Greetings & Introductions**
2. **Daily Routines**
3. **Small Talk & Social Skills**
4. **Ordering Food & Drinks**
5. **Shopping & Bargaining**
6. **Travel & Directions**
7. **Work & Business English**
8. **Hobbies & Interests**
9. **Health & Wellness**
10. **Technology & Social Media**
11. **Dating & Relationships** (tema especial romântico)
12. **American Culture & Slang**

### Imersão com Mídia
- **YouTube**: Vídeos curtos com legendas progressivas
- **Spotify**: Playlists de músicas americanas
- **Podcasts**: Recomendações de podcasts para praticar listening

---

## Interações e Feedback

### Feedback Tátil (Haptics)
- **Botão Principal**: `impactAsync(Light)` ao tocar
- **Resposta Correta**: `notificationAsync(Success)`
- **Resposta Incorreta**: `notificationAsync(Error)`
- **Badge Desbloqueado**: `impactAsync(Medium)`

### Animações
- **Progresso**: Barra animada com `withTiming(duration: 300ms)`
- **Badges**: Brilho e escala com `withTiming(duration: 250ms)`
- **Botão Principal**: Pulse suave com `withTiming(duration: 1000ms, repeat: true)`

### Estados de Loading
- **Sessão Iniciando**: Spinner com texto "Preparando sua aula..."
- **IA Processando**: Animação de onda sonora
- **Áudio Carregando**: Spinner pequeno no balão de mensagem

---

## Acessibilidade

- **VoiceOver**: Todos os elementos com labels descritivos
- **Contraste**: Paleta de cores acessível (WCAG AA)
- **Tamanho de Fonte**: Suporte para Dynamic Type
- **Navegação por Teclado**: Suporte completo na versão web

---

## Notas Técnicas

### Autenticação
- **OAuth com Google**: Fluxo simplificado com Manus OAuth
- **Senha Única**: Alternativa para José (senha pré-definida)

### Banco de Dados
- **Usuário**: ID, nome, email, nível CEFR, pontos, streak
- **Sessões**: ID, data, duração, módulo, pontos ganhos
- **Badges**: ID, título, descrição, data de conquista
- **Progresso**: ID, módulo, lição, status (concluído/pendente)

### Integrações
- **ElevenLabs API**: TTS para voz do professor
- **OpenAI API**: LLM para gerar feedback e conversas
- **Web Speech API**: Reconhecimento de voz do aluno
- **Supabase**: Autenticação e banco de dados

---

## Considerações Finais

O design do **FluentUSA Love** prioriza a experiência do usuário (José) com uma interface acolhedora, feedback constante e gamificação afetiva. Cada elemento foi pensado para motivar o aprendizado de forma divertida e romântica, criando um presente único e memorável.
