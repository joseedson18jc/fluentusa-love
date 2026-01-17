# FluentUSA Love - User Flows

Este documento descreve os principais fluxos de usuário do aplicativo FluentUSA Love.

---

## Flow 1: Primeiro Acesso e Onboarding

\`\`\`mermaid
graph TD
    A[Splash Screen] --> B{Usuário autenticado?}
    B -->|Não| C[Tela de Login]
    C --> D[Login com Google OAuth]
    D --> E[Onboarding - Boas-vindas]
    E --> F[Teste de Nivelamento]
    F --> G[Questão 1/30]
    G --> H[Questão 2/30]
    H --> I[...]
    I --> J[Questão 30/30]
    J --> K[IA Analisa Respostas]
    K --> L[Resultado: Nível CEFR]
    L --> M[Escolher Dias da Semana]
    M --> N[Dashboard]
    B -->|Sim| N
\`\`\`

---

## Flow 2: Sessão de Aprendizado

\`\`\`mermaid
graph TD
    A[Dashboard] --> B[Clicar em 'Iniciar Sessão']
    B --> C[Carregar Módulo e Lição]
    C --> D[Professor Virtual Fala]
    D --> E[Reproduzir Áudio ElevenLabs]
    E --> F[Usuário Clica no Microfone]
    F --> G[Gravar Resposta]
    G --> H[Web Speech API Transcreve]
    H --> I[Enviar para Backend]
    I --> J[IA Analisa Resposta]
    J --> K[Gerar Feedback Oral]
    K --> L[ElevenLabs Converte em Áudio]
    L --> M[Reproduzir Feedback]
    M --> N{Lição Completa?}
    N -->|Não| D
    N -->|Sim| O[Calcular Pontos]
    O --> P[Verificar Badges]
    P --> Q[Atualizar Progresso]
    Q --> R[Mostrar Resumo]
    R --> S[Dashboard]
\`\`\`

---

## Flow 3: Visualizar Progresso

\`\`\`mermaid
graph TD
    A[Dashboard] --> B[Ver Card de Progresso]
    B --> C{Ação}
    C -->|Ver Badges| D[Tela de Badges]
    D --> E[Lista de Badges]
    E --> F[Clicar em Badge]
    F --> G[Detalhes do Badge]
    G --> H[Voltar]
    H --> A
    C -->|Ver Estatísticas| I[Tela de Perfil]
    I --> J[Estatísticas Detalhadas]
    J --> K[Histórico de Sessões]
    K --> A
\`\`\`

---

## Flow 4: Configurar Calendário

\`\`\`mermaid
graph TD
    A[Dashboard] --> B[Clicar em Ícone de Configurações]
    B --> C[Tela de Configurações]
    C --> D[Configurações de Calendário]
    D --> E[Selecionar Dias da Semana]
    E --> F{Escolher 3 dias}
    F -->|Seg/Qua/Sex| G[Salvar]
    F -->|Ter/Qui/Sáb| G
    G --> H[Atualizar Backend]
    H --> I[Confirmar Alterações]
    I --> J[Dashboard Atualizado]
\`\`\`

---

## Flow 5: Dia Sem Sessão (Off-Day Tasks)

\`\`\`mermaid
graph TD
    A[Dashboard] --> B{É dia de sessão?}
    B -->|Não| C[Mostrar Tarefas Leves]
    C --> D[Lista de Tarefas]
    D --> E[Escolher Tarefa]
    E --> F{Tipo de Tarefa}
    F -->|Música| G[Abrir Spotify]
    F -->|Vídeo| H[Abrir YouTube/Netflix]
    F -->|Podcast| I[Abrir Podcasts]
    F -->|Leitura| J[Abrir Artigo]
    G --> K[Marcar como Concluída]
    H --> K
    I --> K
    J --> K
    K --> L[Atualizar Progresso]
    L --> A
\`\`\`

---

## Flow 6: Sistema de Badges

\`\`\`mermaid
graph TD
    A[Ação do Usuário] --> B{Condição Atingida?}
    B -->|Sim| C[Backend Verifica]
    C --> D[Desbloquear Badge]
    D --> E[Gerar Mensagem Personalizada]
    E --> F[Notificar Usuário]
    F --> G[Animação de Confetti]
    G --> H[Mostrar Badge]
    H --> I[Salvar no Banco]
    I --> J[Dashboard Atualizado]
    B -->|Não| K[Continuar]
\`\`\`

---

## Flow 7: Atualização de Streak

\`\`\`mermaid
graph TD
    A[Completar Sessão] --> B[Verificar Data da Última Sessão]
    B --> C{Diferença de Dias}
    C -->|1 dia| D[Incrementar Streak]
    C -->|>1 dia| E[Resetar Streak para 1]
    C -->|Mesmo dia| F[Manter Streak]
    D --> G[Atualizar Perfil]
    E --> G
    F --> G
    G --> H{Streak é Múltiplo de 7?}
    H -->|Sim| I[Desbloquear Badge de Streak]
    H -->|Não| J[Continuar]
    I --> K[Dashboard Atualizado]
    J --> K
\`\`\`

---

## Flow 8: Mudança de Nível CEFR

\`\`\`mermaid
graph TD
    A[Completar Módulo] --> B[Calcular Progresso Total]
    B --> C{Critérios Atingidos?}
    C -->|Sim| D[IA Avalia Nível Atual]
    D --> E[Gerar Novo Teste Rápido]
    E --> F[Usuário Responde]
    F --> G[IA Analisa]
    G --> H{Aprovar Subida de Nível?}
    H -->|Sim| I[Atualizar Nível CEFR]
    I --> J[Animação de Confetti]
    J --> K[Mensagem de Parabéns]
    K --> L[Desbloquear Novos Módulos]
    L --> M[Dashboard Atualizado]
    H -->|Não| N[Manter Nível Atual]
    N --> O[Sugerir Mais Prática]
    O --> M
    C -->|Não| P[Continuar]
\`\`\`

---

## Flow 9: Notificações e Lembretes

\`\`\`mermaid
graph TD
    A[Sistema de Notificações] --> B{Dia de Sessão?}
    B -->|Sim| C{Sessão Completa?}
    C -->|Não| D[Enviar Lembrete]
    D --> E{Tipo de Lembrete}
    E -->|Email| F[Enviar Email]
    E -->|Push| G[Enviar Push Notification]
    F --> H[Usuário Clica]
    G --> H
    H --> I[Abrir App]
    I --> J[Dashboard]
    C -->|Sim| K[Não Enviar]
    B -->|Não| L{Tarefa Off-Day Completa?}
    L -->|Não| M[Lembrete de Tarefa Leve]
    M --> H
    L -->|Sim| K
\`\`\`

---

## Flow 10: Feedback e Correção

\`\`\`mermaid
graph TD
    A[Usuário Fala] --> B[Transcrever Áudio]
    B --> C[Enviar para IA]
    C --> D[Analisar Gramática]
    D --> E[Analisar Pronúncia]
    E --> F[Analisar Vocabulário]
    F --> G{Erros Encontrados?}
    G -->|Sim| H[Gerar Correção Gentil]
    H --> I[Comparar com Português]
    I --> J[Adicionar Exemplo]
    J --> K[Converter para Áudio]
    K --> L[Reproduzir Feedback]
    G -->|Não| M[Gerar Elogio]
    M --> N[Adicionar Motivação]
    N --> K
    L --> O[Continuar Conversa]
\`\`\`

---

## Legenda de Símbolos

- **Retângulo**: Ação ou tela
- **Losango**: Decisão (if/else)
- **Retângulo Arredondado**: Início/Fim
- **Setas**: Fluxo de navegação

---

## Notas de Implementação

### Prioridades

1. **Flow 1 (Onboarding)**: Essencial para primeiro uso
2. **Flow 2 (Sessão)**: Core do app
3. **Flow 4 (Calendário)**: Necessário para personalização
4. **Flow 3 (Progresso)**: Importante para engajamento
5. **Flow 5 (Off-Day)**: Nice to have
6. **Flow 6-10**: Funcionalidades avançadas

### Tecnologias por Flow

| Flow | Frontend | Backend | Integrações |
|------|----------|---------|-------------|
| 1 | Expo Router, React Query | tRPC, Drizzle | Manus OAuth |
| 2 | expo-audio, Web Speech API | tRPC, OpenAI | ElevenLabs |
| 3 | FlatList, Animations | tRPC | - |
| 4 | Form, AsyncStorage | tRPC | - |
| 5 | Linking, WebView | tRPC | YouTube, Spotify |
| 6 | Animations, Confetti | tRPC | - |
| 7 | Date calculations | tRPC | - |
| 8 | Animations | tRPC, OpenAI | - |
| 9 | expo-notifications | tRPC | Email service |
| 10 | expo-audio | tRPC, OpenAI | ElevenLabs |

---

**Este documento será atualizado conforme novas funcionalidades forem implementadas.**
