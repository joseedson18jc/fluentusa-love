# FluentUSA Love - TODO

## Autenticação e Onboarding
- [ ] Tela de login com Google OAuth
- [ ] Tela de login com senha única
- [ ] Onboarding com boas-vindas personalizadas
- [ ] Teste de nivelamento com 30 questões interativas
- [ ] Análise de respostas com IA para definir nível CEFR
- [ ] Tela de resultado do teste com animação
- [ ] Seleção de dias da semana para sessões (3x/semana)

## Dashboard
- [ ] Header com avatar, saudação personalizada e ícone de configurações
- [ ] Card de progresso com nível CEFR, barra visual, pontos e streak
- [ ] Calendário semanal de sessões com dias marcados
- [ ] Seção de badges recentes com scroll horizontal
- [ ] Botão principal "Iniciar Sessão de Hoje" com animação pulse
- [ ] Animação de confetti ao subir de nível

## Sessões de Aprendizado
- [ ] Interface de chat com mensagens do professor e aluno
- [ ] Integração com ElevenLabs API para voz do professor
- [ ] Botão de microfone para gravar resposta do aluno
- [ ] Integração com Web Speech API para transcrição
- [ ] Processamento de resposta com OpenAI LLM
- [ ] Feedback oral com correções e explicações
- [ ] Animação de onda sonora durante reprodução de áudio
- [ ] Timer de sessão (máx 60 minutos)
- [ ] Progresso do módulo e lição
- [ ] Player de YouTube/Spotify integrado
- [ ] Sistema de legendas progressivas

## Gamificação
- [ ] Sistema de pontos por sessão
- [ ] Sistema de streak (dias consecutivos)
- [ ] Badges com títulos carinhosos e românticos
- [ ] Animação de desbloqueio de badge
- [ ] Mensagens personalizadas motivadoras
- [ ] Mini-testes com feedback imediato
- [ ] Tela de visualização de todos os badges

## Perfil e Configurações
- [ ] Tela de perfil com informações do usuário
- [ ] Estatísticas (tempo total, módulos concluídos, pontos)
- [ ] Configuração de voz do professor (masculina/feminina)
- [ ] Ajuste de velocidade da fala
- [ ] Configuração de dias da semana para sessões
- [ ] Ativação/desativação de lembretes (email/push)
- [ ] Histórico de sessões concluídas
- [ ] Botão de logout

## Tarefas Leves (Dias Off)
- [ ] Lista de tarefas sugeridas para dias sem sessão
- [ ] Checkbox para marcar tarefas como concluídas
- [ ] Sugestões de conteúdo (músicas, podcasts, vídeos)

## Módulos Temáticos (12-16)
- [ ] Módulo 1: Greetings & Introductions
- [ ] Módulo 2: Daily Routines
- [ ] Módulo 3: Small Talk & Social Skills
- [ ] Módulo 4: Ordering Food & Drinks
- [ ] Módulo 5: Shopping & Bargaining
- [ ] Módulo 6: Travel & Directions
- [ ] Módulo 7: Work & Business English
- [ ] Módulo 8: Hobbies & Interests
- [ ] Módulo 9: Health & Wellness
- [ ] Módulo 10: Technology & Social Media
- [ ] Módulo 11: Dating & Relationships (tema especial romântico)
- [ ] Módulo 12: American Culture & Slang



## Integrações Externas
- [ ] Configuração de ElevenLabs API (documentado em SETUP.md)
- [x] Configuração de OpenAI API (via built-in LLM)
- [ ] Configuração de Web Speech API
- [x] Sistema de upload de áudio para S3 (via storagePut)
- [ ] Sistema de notificações push



## Documentação - Concluído
- [x] Guia de setup com instruções de instalação (SETUP.md)
- [x] Documentação de integração com ElevenLabs (SETUP.md)
- [x] Documentação de integração com OpenAI (README.md)
- [x] Instruções de deploy (SETUP.md)
- [x] README com visão geral do projeto (README.md)
- [x] User flows documentados (USER_FLOWS.md)
- [x] Design completo documentado (design.md)


## Backend - Concluído
- [x] Schema de usuários (id, nome, email, nível CEFR, pontos, streak)
- [x] Schema de sessões (id, userId, data, duração, módulo, pontos)
- [x] Schema de badges (id, userId, título, descrição, data)
- [x] Schema de progresso (id, userId, módulo, lição, status)
- [x] Schema de configurações (id, userId, voz, velocidade, dias, lembretes)
- [x] Migrations para todas as tabelas
- [x] Helpers de banco de dados (server/db.ts)
- [x] Routers tRPC (onboarding, profile, schedule, modules, badges, tasks, sessions)
- [x] Integração com OpenAI LLM para análise e feedback

## Schema de Banco de Dados - Concluído
- [x] Schema de usuários (id, nome, email, nível CEFR, pontos, streak)
- [x] Schema de sessões (id, userId, data, duração, módulo, pontos)
- [x] Schema de badges (id, userId, título, descrição, data)
- [x] Schema de progresso (id, userId, módulo, lição, status)
- [x] Schema de configurações (id, userId, voz, velocidade, dias, lembretes)
- [x] Migrations para todas as tabelas

## Branding - Concluído
- [x] Gerar logo personalizado do app
- [x] Atualizar app.config.ts com nome e logo
- [x] Criar splash screen com logo
- [x] Criar ícones para iOS e Android
- [x] Atualizar paleta de cores no theme.config.js
