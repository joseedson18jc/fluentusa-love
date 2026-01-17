# FluentUSA Love - Guia de Deployment

## 🌐 Acesso ao App

O FluentUSA Love está disponível em:

**URL Pública:** https://8081-i5prw7m7u8i7riuypul48-cbd8b33d.us1.manus.computer

### Acessar no Navegador

1. Abra o link acima em qualquer navegador moderno
2. O app carregará em modo web (Expo Web)
3. Você pode testar todas as funcionalidades no navegador

### Acessar no Celular (iOS/Android)

#### Opção 1: Expo Go (Recomendado)

1. Instale o app **Expo Go** na App Store (iOS) ou Google Play (Android)
2. Abra o app e escaneie o QR code abaixo:

```
exps://8081-i5prw7m7u8i7riuypul48-cbd8b33d.us1.manus.computer
```

3. O app carregará nativamente no seu dispositivo

#### Opção 2: Link Direto

Abra este link no seu celular:

```
exp://8081-i5prw7m7u8i7riuypul48-cbd8b33d.us1.manus.computer
```

---

## 📱 Testar Funcionalidades

### 1. Onboarding e Teste de Nivelamento

- Faça login com a senha única ou Google
- Complete o teste de nivelamento (30 questões)
- Veja seu nível CEFR calculado automaticamente

### 2. Dashboard

- Visualize seu progresso e pontos
- Veja a "Frase do Dia" motivadora
- Clique em "Iniciar Sessão de Hoje" para começar

### 3. Chat com Voz

- Clique no botão de microfone para gravar
- Fale em português
- Receba feedback do professor virtual (estrutura pronta para ElevenLabs)

### 4. Perfil e Configurações

- Clique no ícone de engrenagem no dashboard
- Configure voz do professor (masculina/feminina)
- Ajuste velocidade da fala
- Escolha dias da semana para sessões
- Ative/desative notificações

---

## 🚀 Deploy para Produção

### Vercel (Recomendado para Web)

1. **Conectar repositório:**
   ```bash
   git remote add origin https://github.com/seu-usuario/fluentusa-love.git
   git push -u origin main
   ```

2. **Deploy no Vercel:**
   - Acesse https://vercel.com
   - Clique em "New Project"
   - Selecione seu repositório
   - Configure variáveis de ambiente:
     - `ELEVENLABS_API_KEY`
     - `ELEVENLABS_VOICE_ID`
     - `OPENAI_API_KEY` (se usar OpenAI diretamente)
   - Clique em "Deploy"

3. **Seu app estará em:** `https://seu-projeto.vercel.app`

### EAS Build (Para iOS/Android)

1. **Instalar EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login:**
   ```bash
   eas login
   ```

3. **Configurar build:**
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

4. **Submeter à App Store/Play Store:**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# ElevenLabs
ELEVENLABS_API_KEY=sk_sua_chave_aqui
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# OpenAI (opcional, se não usar built-in LLM)
OPENAI_API_KEY=sk-sua-chave-aqui

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fluentusa_love

# Auth
NEXTAUTH_SECRET=sua-chave-secreta-aqui
```

---

## ✅ Checklist de Deployment

- [ ] Testar onboarding no navegador
- [ ] Testar chat com voz
- [ ] Testar perfil e configurações
- [ ] Configurar ElevenLabs API
- [ ] Configurar notificações push
- [ ] Testar no Expo Go (iOS/Android)
- [ ] Fazer build para produção
- [ ] Deploy no Vercel
- [ ] Testar URL de produção
- [ ] Configurar domínio customizado

---

## 🐛 Troubleshooting

### App não carrega no navegador

**Solução:** Limpe o cache do navegador (Ctrl+Shift+Delete) e recarregue a página.

### Erro de autenticação

**Solução:** Verifique se as credenciais do banco de dados estão corretas em `.env.local`.

### Áudio não funciona

**Solução:** Verifique permissões de microfone no navegador/dispositivo.

### Notificações não aparecem

**Solução:** Ative notificações nas configurações do app e do dispositivo.

---

## 📊 Monitoramento

### Logs em Tempo Real

```bash
# Ver logs do servidor
pnpm dev:server

# Ver logs do Metro
pnpm dev:metro
```

### Métricas de Performance

- Acesse https://vercel.com/dashboard para métricas de deployment
- Use Lighthouse (DevTools do navegador) para auditoria de performance

---

## 🔄 Atualizações

Para fazer deploy de atualizações:

```bash
# Fazer commit das mudanças
git add .
git commit -m "Descrição das mudanças"

# Push para o repositório
git push origin main

# Vercel fará deploy automaticamente
```

---

## 📞 Suporte

Para problemas ou dúvidas:

1. Consulte a documentação em `README.md`
2. Verifique `ELEVENLABS_INTEGRATION.md` para integração de voz
3. Abra uma issue no repositório

---

**Pronto para usar! 🚀💕**
