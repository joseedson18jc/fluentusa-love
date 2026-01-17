/**
 * Módulos Temáticos de Aprendizado
 * 12 módulos progressivos com conteúdo estruturado
 */

export interface Lesson {
  id: number;
  title: string;
  description: string;
  vocabulary: Array<{ word: string; translation: string; pronunciation: string }>;
  phrases: Array<{ english: string; portuguese: string; pronunciation: string }>;
  dialogues: Array<{ speaker: string; text: string; translation: string }>;
  exercises: Array<{ question: string; options: string[]; correct: number }>;
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export interface Module {
  id: number;
  title: string;
  emoji: string;
  description: string;
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  lessons: Lesson[];
  color: string;
  category: "basic" | "daily" | "social" | "practical" | "professional" | "special";
}

export const MODULES: Module[] = [
  {
    id: 1,
    title: "Greetings & Introductions",
    emoji: "👋",
    description: "Aprenda a saudar e se apresentar em inglês americano",
    difficulty: "A1",
    category: "basic",
    color: "from-blue-400 to-blue-600",
    lessons: [
      {
        id: 1,
        title: "Basic Greetings",
        description: "Saudações básicas e respostas",
        vocabulary: [
          { word: "Hello", translation: "Olá", pronunciation: "hə-ˈlō" },
          { word: "Hi", translation: "Oi", pronunciation: "hī" },
          { word: "Good morning", translation: "Bom dia", pronunciation: "ˈɡo͝od ˈmȯr-niŋ" },
          { word: "Good afternoon", translation: "Boa tarde", pronunciation: "ˈɡo͝od ˌaf-tər-ˈno͞on" },
          { word: "Good evening", translation: "Boa noite", pronunciation: "ˈɡo͝od ˈē-vniŋ" },
          { word: "Goodbye", translation: "Adeus", pronunciation: "ˌɡo͝od-ˈbī" },
        ],
        phrases: [
          { english: "How are you?", portuguese: "Como você está?", pronunciation: "ˌhau̇ ˈär ˈyo͞o" },
          { english: "I'm fine, thank you", portuguese: "Estou bem, obrigado", pronunciation: "ˈīm ˈfīn ˈθaŋk ˈyo͞o" },
          { english: "Nice to meet you", portuguese: "Prazer em conhecê-lo", pronunciation: "ˈnīs tə ˈmēt ˈyo͞o" },
          { english: "What's your name?", portuguese: "Qual é seu nome?", pronunciation: "ˈwəts ˈyȯr ˈnām" },
          { english: "My name is...", portuguese: "Meu nome é...", pronunciation: "ˈmī ˈnām ˈiz" },
        ],
        dialogues: [
          {
            speaker: "Teacher",
            text: "Hello! How are you today?",
            translation: "Olá! Como você está hoje?",
          },
          {
            speaker: "Student",
            text: "Hi! I'm doing great, thank you!",
            translation: "Oi! Estou indo ótimo, obrigado!",
          },
          {
            speaker: "Teacher",
            text: "That's wonderful! What's your name?",
            translation: "Que maravilhoso! Qual é seu nome?",
          },
          {
            speaker: "Student",
            text: "My name is José. Nice to meet you!",
            translation: "Meu nome é José. Prazer em conhecê-lo!",
          },
        ],
        exercises: [
          {
            question: "Como você diz 'Olá' em inglês?",
            options: ["Goodbye", "Hello", "Thank you", "Please"],
            correct: 1,
          },
          {
            question: "Qual é a resposta correta para 'How are you?'",
            options: ["I'm fine, thank you", "Goodbye", "Nice to meet you", "What's your name?"],
            correct: 0,
          },
        ],
        difficulty: "A1",
      },
    ],
  },

  {
    id: 2,
    title: "Daily Routines",
    emoji: "🌅",
    description: "Descreva suas atividades diárias em inglês",
    difficulty: "A1",
    category: "daily",
    color: "from-orange-400 to-orange-600",
    lessons: [
      {
        id: 1,
        title: "Morning Routine",
        description: "Atividades matinais",
        vocabulary: [
          { word: "Wake up", translation: "Acordar", pronunciation: "ˈwāk ˈəp" },
          { word: "Shower", translation: "Tomar banho", pronunciation: "ˈshau̇(-ə)r" },
          { word: "Breakfast", translation: "Café da manhã", pronunciation: "ˈbrek-fəst" },
          { word: "Get dressed", translation: "Se vestir", pronunciation: "ˈɡet ˈdrest" },
          { word: "Go to work", translation: "Ir para o trabalho", pronunciation: "ˈɡō tə ˈwərk" },
        ],
        phrases: [
          { english: "I wake up at 7 AM", portuguese: "Acordo às 7 da manhã", pronunciation: "ˈī ˈwāk ˈəp ət ˈsev-ən" },
          { english: "I take a shower", portuguese: "Tomo um banho", pronunciation: "ˈī ˈtāk ə ˈshau̇(-ə)r" },
          { english: "I eat breakfast", portuguese: "Como café da manhã", pronunciation: "ˈī ˈēt ˈbrek-fəst" },
          { english: "I get ready for work", portuguese: "Me preparo para o trabalho", pronunciation: "ˈī ˈɡet ˈre-dē ˈfȯr ˈwərk" },
        ],
        dialogues: [
          { speaker: "Teacher", text: "What time do you wake up?", translation: "Que horas você acorda?" },
          { speaker: "Student", text: "I wake up at 7 AM every day.", translation: "Acordo às 7 da manhã todos os dias." },
          { speaker: "Teacher", text: "What do you do after waking up?", translation: "O que você faz depois de acordar?" },
          { speaker: "Student", text: "I take a shower and eat breakfast.", translation: "Tomo um banho e como café da manhã." },
        ],
        exercises: [
          {
            question: "Como você diz 'Tomar banho' em inglês?",
            options: ["Sleep", "Shower", "Eat", "Work"],
            correct: 1,
          },
        ],
        difficulty: "A1",
      },
    ],
  },

  {
    id: 3,
    title: "Small Talk & Social Skills",
    emoji: "💬",
    description: "Conversas informais e habilidades sociais",
    difficulty: "A2",
    category: "social",
    color: "from-pink-400 to-pink-600",
    lessons: [
      {
        id: 1,
        title: "Making Conversation",
        description: "Iniciar e manter conversas",
        vocabulary: [
          { word: "Weather", translation: "Clima", pronunciation: "ˈwe-t͟hər" },
          { word: "Nice", translation: "Legal/Agradável", pronunciation: "ˈnīs" },
          { word: "Beautiful", translation: "Bonito", pronunciation: "ˈbyo͞o-tə-fəl" },
          { word: "Interesting", translation: "Interessante", pronunciation: "ˈin-tə-ˌre-stiŋ" },
        ],
        phrases: [
          { english: "It's a beautiful day!", portuguese: "É um dia lindo!", pronunciation: "ˈits ə ˈbyo͞o-tə-fəl ˈdā" },
          { english: "What do you think about...?", portuguese: "O que você acha sobre...?", pronunciation: "ˈwət ˌdo͞o ˈyo͞o ˈθiŋk ə-ˈbau̇t" },
          { english: "I totally agree!", portuguese: "Eu totalmente concordo!", pronunciation: "ˈī ˈtō-tə-lē ə-ˈɡrēd" },
          { english: "That's interesting!", portuguese: "Isso é interessante!", pronunciation: "ˈðats ˈin-tə-ˌre-stiŋ" },
        ],
        dialogues: [
          { speaker: "Teacher", text: "It's such a beautiful day today, isn't it?", translation: "É um dia tão lindo hoje, não é?" },
          { speaker: "Student", text: "Yes, absolutely! The weather is perfect!", translation: "Sim, absolutamente! O clima está perfeito!" },
          { speaker: "Teacher", text: "Do you like sunny days?", translation: "Você gosta de dias ensolarados?" },
          { speaker: "Student", text: "I love them! They make me feel happy.", translation: "Eu adoro! Eles me fazem sentir feliz." },
        ],
        exercises: [
          {
            question: "Como você responde 'It's a beautiful day'?",
            options: ["No, it's not", "Yes, absolutely!", "I don't know", "Goodbye"],
            correct: 1,
          },
        ],
        difficulty: "A2",
      },
    ],
  },

  {
    id: 4,
    title: "Ordering Food & Drinks",
    emoji: "🍽️",
    description: "Pedir comida e bebidas em restaurantes",
    difficulty: "A2",
    category: "practical",
    color: "from-red-400 to-red-600",
    lessons: [
      {
        id: 1,
        title: "Restaurant Basics",
        description: "Vocabulário e frases para restaurantes",
        vocabulary: [
          { word: "Menu", translation: "Cardápio", pronunciation: "ˈme-ˌnü" },
          { word: "Water", translation: "Água", pronunciation: "ˈwȯ-tər" },
          { word: "Coffee", translation: "Café", pronunciation: "kə-ˈfē" },
          { word: "Food", translation: "Comida", pronunciation: "ˈfo͞od" },
          { word: "Delicious", translation: "Delicioso", pronunciation: "də-ˈli-shəs" },
        ],
        phrases: [
          { english: "I'd like a table for two", portuguese: "Gostaria de uma mesa para dois", pronunciation: "ˈīd ˈlīk ə ˈtā-bəl ˈfȯr ˈto͞o" },
          { english: "Can I have the menu?", portuguese: "Posso ter o cardápio?", pronunciation: "ˈkan ˈī ˈhav t͟hə ˈme-ˌnü" },
          { english: "I'll have...", portuguese: "Vou querer...", pronunciation: "ˈīl ˈhav" },
          { english: "The check, please", portuguese: "A conta, por favor", pronunciation: "t͟hə ˈt͟sek pləˈzir" },
        ],
        dialogues: [
          { speaker: "Waiter", text: "Good evening! Welcome to our restaurant.", translation: "Boa noite! Bem-vindo ao nosso restaurante." },
          { speaker: "Student", text: "Thank you! I'd like a table for two, please.", translation: "Obrigado! Gostaria de uma mesa para dois, por favor." },
          { speaker: "Waiter", text: "Of course! Here's the menu.", translation: "Claro! Aqui está o cardápio." },
          { speaker: "Student", text: "I'll have the grilled chicken and a water, please.", translation: "Vou querer frango grelhado e uma água, por favor." },
        ],
        exercises: [
          {
            question: "Como você pede a conta em inglês?",
            options: ["I want food", "The check, please", "More water", "Goodbye"],
            correct: 1,
          },
        ],
        difficulty: "A2",
      },
    ],
  },

  {
    id: 5,
    title: "Shopping & Bargaining",
    emoji: "🛍️",
    description: "Compras e negociação de preços",
    difficulty: "A2",
    category: "practical",
    color: "from-purple-400 to-purple-600",
    lessons: [
      {
        id: 1,
        title: "Shopping Phrases",
        description: "Vocabulário de compras",
        vocabulary: [
          { word: "Price", translation: "Preço", pronunciation: "ˈprīs" },
          { word: "Discount", translation: "Desconto", pronunciation: "ˈdis-ˌkau̇nt" },
          { word: "Size", translation: "Tamanho", pronunciation: "ˈsīz" },
          { word: "Color", translation: "Cor", pronunciation: "ˈkə-lər" },
        ],
        phrases: [
          { english: "How much is this?", portuguese: "Quanto custa isso?", pronunciation: "ˌhau̇ ˈməch ˈiz ˈt͟his" },
          { english: "Do you have a discount?", portuguese: "Você tem desconto?", pronunciation: "ˌdo͞o ˈyo͞o ˈhav ə ˈdis-ˌkau̇nt" },
          { english: "What size do you have?", portuguese: "Que tamanho você tem?", pronunciation: "ˈwət ˈsīz ˌdo͞o ˈyo͞o ˈhav" },
          { english: "I'll take it!", portuguese: "Vou levar!", pronunciation: "ˈīl ˈtāk ˈit" },
        ],
        dialogues: [
          { speaker: "Shopkeeper", text: "Can I help you?", translation: "Posso ajudá-lo?" },
          { speaker: "Student", text: "Yes, how much is this shirt?", translation: "Sim, quanto custa essa camisa?" },
          { speaker: "Shopkeeper", text: "It's $30. Do you like it?", translation: "Custa $30. Você gosta?" },
          { speaker: "Student", text: "Yes, I'll take it!", translation: "Sim, vou levar!" },
        ],
        exercises: [
          {
            question: "Como você pergunta o preço em inglês?",
            options: ["Where is it?", "How much is this?", "What time is it?", "Who are you?"],
            correct: 1,
          },
        ],
        difficulty: "A2",
      },
    ],
  },

  {
    id: 6,
    title: "Travel & Directions",
    emoji: "✈️",
    description: "Viagens e pedindo direções",
    difficulty: "B1",
    category: "practical",
    color: "from-cyan-400 to-cyan-600",
    lessons: [
      {
        id: 1,
        title: "Getting Around",
        description: "Navegação e transporte",
        vocabulary: [
          { word: "Airport", translation: "Aeroporto", pronunciation: "ˈer-ˌpȯrt" },
          { word: "Hotel", translation: "Hotel", pronunciation: "hō-ˈtel" },
          { word: "Taxi", translation: "Táxi", pronunciation: "ˈtak-sē" },
          { word: "Street", translation: "Rua", pronunciation: "ˈstrēt" },
        ],
        phrases: [
          { english: "Where is the airport?", portuguese: "Onde fica o aeroporto?", pronunciation: "ˌwer ˈiz t͟hē ˈer-ˌpȯrt" },
          { english: "How do I get to...?", portuguese: "Como chego em...?", pronunciation: "ˌhau̇ ˌdo͞o ˈī ˈɡet ˈto͞o" },
          { english: "Turn left/right", portuguese: "Vire à esquerda/direita", pronunciation: "ˈtərn ˈleft ˈrīt" },
          { english: "Go straight", portuguese: "Vá em frente", pronunciation: "ˈɡō ˈstrāt" },
        ],
        dialogues: [
          { speaker: "Tourist", text: "Excuse me, where is the hotel?", translation: "Com licença, onde fica o hotel?" },
          { speaker: "Local", text: "Go straight ahead, then turn left.", translation: "Vá em frente, depois vire à esquerda." },
          { speaker: "Tourist", text: "How far is it?", translation: "Quão longe fica?" },
          { speaker: "Local", text: "About 5 minutes walk.", translation: "Uns 5 minutos de caminhada." },
        ],
        exercises: [
          {
            question: "Como você pergunta 'Onde fica o aeroporto?'",
            options: ["What time is it?", "Where is the airport?", "How are you?", "Nice to meet you"],
            correct: 1,
          },
        ],
        difficulty: "B1",
      },
    ],
  },

  {
    id: 7,
    title: "Work & Business English",
    emoji: "💼",
    description: "Inglês profissional e negócios",
    difficulty: "B1",
    category: "professional",
    color: "from-slate-400 to-slate-600",
    lessons: [
      {
        id: 1,
        title: "Office Communication",
        description: "Comunicação no ambiente corporativo",
        vocabulary: [
          { word: "Meeting", translation: "Reunião", pronunciation: "ˈmē-tiŋ" },
          { word: "Deadline", translation: "Prazo", pronunciation: "ˈded-ˌlīn" },
          { word: "Project", translation: "Projeto", pronunciation: "ˈprä-ˌjekt" },
          { word: "Report", translation: "Relatório", pronunciation: "ri-ˈpȯrt" },
        ],
        phrases: [
          { english: "Let's schedule a meeting", portuguese: "Vamos agendar uma reunião", pronunciation: "ˈlets ˈske-jo͞ol ə ˈmē-tiŋ" },
          { english: "What's the deadline?", portuguese: "Qual é o prazo?", pronunciation: "ˈwəts t͟hə ˈded-ˌlīn" },
          { english: "I'll send you the report", portuguese: "Vou enviar o relatório", pronunciation: "ˈīl ˈsend ˈyo͞o t͟hə ri-ˈpȯrt" },
          { english: "Can we discuss this?", portuguese: "Podemos discutir isso?", pronunciation: "ˈkan ˈwē dis-ˈkəsh ˈt͟his" },
        ],
        dialogues: [
          { speaker: "Boss", text: "Good morning! Let's discuss the project.", translation: "Bom dia! Vamos discutir o projeto." },
          { speaker: "Employee", text: "Sure! What's the deadline?", translation: "Claro! Qual é o prazo?" },
          { speaker: "Boss", text: "Next Friday. Can you have the report ready?", translation: "Próxima sexta. Você consegue ter o relatório pronto?" },
          { speaker: "Employee", text: "Yes, absolutely! I'll send it by Thursday.", translation: "Sim, absolutamente! Vou enviar na quinta." },
        ],
        exercises: [
          {
            question: "Como você pergunta 'Qual é o prazo?'",
            options: ["What's the deadline?", "What time is it?", "How are you?", "Where is it?"],
            correct: 0,
          },
        ],
        difficulty: "B1",
      },
    ],
  },

  {
    id: 8,
    title: "Hobbies & Interests",
    emoji: "🎮",
    description: "Hobbies, passatempos e interesses pessoais",
    difficulty: "B1",
    category: "social",
    color: "from-green-400 to-green-600",
    lessons: [
      {
        id: 1,
        title: "Talking About Hobbies",
        description: "Conversas sobre passatempos",
        vocabulary: [
          { word: "Hobby", translation: "Passatempo", pronunciation: "ˈhä-bē" },
          { word: "Sports", translation: "Esportes", pronunciation: "ˈspȯrts" },
          { word: "Music", translation: "Música", pronunciation: "ˈmyo͞o-zik" },
          { word: "Reading", translation: "Leitura", pronunciation: "ˈrē-diŋ" },
        ],
        phrases: [
          { english: "What are your hobbies?", portuguese: "Quais são seus passatempos?", pronunciation: "ˈwət ˈär ˈyȯr ˈhä-bēz" },
          { english: "I love playing soccer", portuguese: "Eu adoro jogar futebol", pronunciation: "ˈī ˈləv ˈplā-iŋ ˈsä-kər" },
          { english: "Do you like music?", portuguese: "Você gosta de música?", pronunciation: "ˌdo͞o ˈyo͞o ˈlīk ˈmyo͞o-zik" },
          { english: "I enjoy reading books", portuguese: "Eu gosto de ler livros", pronunciation: "ˈī en-ˈjȯi ˈrē-diŋ ˈbo͝oks" },
        ],
        dialogues: [
          { speaker: "Friend", text: "What do you like to do in your free time?", translation: "O que você gosta de fazer no seu tempo livre?" },
          { speaker: "Student", text: "I love playing soccer and reading books.", translation: "Eu adoro jogar futebol e ler livros." },
          { speaker: "Friend", text: "That's cool! What kind of books do you read?", translation: "Que legal! Que tipo de livros você lê?" },
          { speaker: "Student", text: "I enjoy fiction and adventure novels.", translation: "Eu gosto de ficção e romances de aventura." },
        ],
        exercises: [
          {
            question: "Como você diz 'Quais são seus passatempos?'",
            options: ["What are your hobbies?", "What time is it?", "How are you?", "Where are you?"],
            correct: 0,
          },
        ],
        difficulty: "B1",
      },
    ],
  },

  {
    id: 9,
    title: "Health & Wellness",
    emoji: "🏥",
    description: "Saúde, bem-estar e consultas médicas",
    difficulty: "B1",
    category: "practical",
    color: "from-emerald-400 to-emerald-600",
    lessons: [
      {
        id: 1,
        title: "At the Doctor",
        description: "Vocabulário médico e consultas",
        vocabulary: [
          { word: "Doctor", translation: "Médico", pronunciation: "ˈdäk-tər" },
          { word: "Pain", translation: "Dor", pronunciation: "ˈpān" },
          { word: "Medicine", translation: "Medicamento", pronunciation: "ˈme-də-sən" },
          { word: "Sick", translation: "Doente", pronunciation: "ˈsik" },
        ],
        phrases: [
          { english: "I don't feel well", portuguese: "Não estou me sentindo bem", pronunciation: "ˈī ˌdōnt ˈfēl ˈwel" },
          { english: "I have a headache", portuguese: "Tenho dor de cabeça", pronunciation: "ˈī ˈhav ə ˈhed-ˌāk" },
          { english: "Take this medicine", portuguese: "Tome este medicamento", pronunciation: "ˈtāk ˈt͟his ˈme-də-sən" },
          { english: "Get some rest", portuguese: "Descanse um pouco", pronunciation: "ˈɡet ˈsəm ˈrest" },
        ],
        dialogues: [
          { speaker: "Doctor", text: "What seems to be the problem?", translation: "Qual parece ser o problema?" },
          { speaker: "Patient", text: "I have a headache and I feel tired.", translation: "Tenho dor de cabeça e me sinto cansado." },
          { speaker: "Doctor", text: "Let me examine you. Take this medicine and rest.", translation: "Deixe-me examiná-lo. Tome este medicamento e descanse." },
          { speaker: "Patient", text: "Thank you, doctor!", translation: "Obrigado, doutor!" },
        ],
        exercises: [
          {
            question: "Como você diz 'Tenho dor de cabeça'?",
            options: ["I have a headache", "I feel good", "I'm happy", "I'm tired"],
            correct: 0,
          },
        ],
        difficulty: "B1",
      },
    ],
  },

  {
    id: 10,
    title: "Technology & Social Media",
    emoji: "📱",
    description: "Tecnologia, redes sociais e internet",
    difficulty: "B2",
    category: "daily",
    color: "from-indigo-400 to-indigo-600",
    lessons: [
      {
        id: 1,
        title: "Digital Communication",
        description: "Comunicação digital e redes sociais",
        vocabulary: [
          { word: "App", translation: "Aplicativo", pronunciation: "ˈap" },
          { word: "Social media", translation: "Rede social", pronunciation: "ˈsō-shəl ˈmē-dē-ə" },
          { word: "Post", translation: "Publicação", pronunciation: "ˈpōst" },
          { word: "Like", translation: "Curtir", pronunciation: "ˈlīk" },
        ],
        phrases: [
          { english: "Did you see my post?", portuguese: "Você viu minha publicação?", pronunciation: "ˌdid ˈyo͞o ˈsē ˈmī ˈpōst" },
          { english: "I posted it on Instagram", portuguese: "Postei no Instagram", pronunciation: "ˈī ˈpōs-təd ˈit ˌän ˈin-stə-ˌɡram" },
          { english: "Can you send me the link?", portuguese: "Você pode me enviar o link?", pronunciation: "ˈkan ˈyo͞o ˈsend ˈmē t͟hə ˈliŋk" },
          { english: "I love this app!", portuguese: "Eu adoro este app!", pronunciation: "ˈī ˈləv ˈt͟his ˈap" },
        ],
        dialogues: [
          { speaker: "Friend", text: "Did you see my post on Facebook?", translation: "Você viu minha publicação no Facebook?" },
          { speaker: "Student", text: "Yes! I liked it! It was amazing!", translation: "Sim! Curtir! Foi incrível!" },
          { speaker: "Friend", text: "Thanks! Can you share it?", translation: "Obrigado! Você pode compartilhar?" },
          { speaker: "Student", text: "Of course! I'll share it right now.", translation: "Claro! Vou compartilhar agora." },
        ],
        exercises: [
          {
            question: "Como você diz 'Você viu minha publicação?'",
            options: ["Did you see my post?", "What time is it?", "How are you?", "Where are you?"],
            correct: 0,
          },
        ],
        difficulty: "B2",
      },
    ],
  },

  {
    id: 11,
    title: "Dating & Relationships",
    emoji: "💕",
    description: "Namoro, relacionamentos e expressões românticas",
    difficulty: "B2",
    category: "special",
    color: "from-rose-400 to-rose-600",
    lessons: [
      {
        id: 1,
        title: "Romantic Expressions",
        description: "Expressões românticas e conversas sobre relacionamentos",
        vocabulary: [
          { word: "Love", translation: "Amor", pronunciation: "ˈləv" },
          { word: "Beautiful", translation: "Bonito/a", pronunciation: "ˈbyo͞o-tə-fəl" },
          { word: "Smile", translation: "Sorriso", pronunciation: "ˈsmīl" },
          { word: "Heart", translation: "Coração", pronunciation: "ˈhärt" },
        ],
        phrases: [
          { english: "You are beautiful", portuguese: "Você é bonito/a", pronunciation: "ˈyo͞o ˈär ˈbyo͞o-tə-fəl" },
          { english: "I love your smile", portuguese: "Eu amo seu sorriso", pronunciation: "ˈī ˈləv ˈyȯr ˈsmīl" },
          { english: "You make me happy", portuguese: "Você me faz feliz", pronunciation: "ˈyo͞o ˈmāk ˈmē ˈha-pē" },
          { english: "Will you be my girlfriend/boyfriend?", portuguese: "Você quer ser minha namorada/meu namorado?", pronunciation: "ˈwil ˈyo͞o ˈbē ˈmī ˈɡərl-ˌfrend" },
        ],
        dialogues: [
          { speaker: "José", text: "You are absolutely beautiful.", translation: "Você é absolutamente bonita." },
          { speaker: "Teacher", text: "Thank you! You're very sweet.", translation: "Obrigada! Você é muito doce." },
          { speaker: "José", text: "I love spending time with you.", translation: "Eu adoro passar tempo com você." },
          { speaker: "Teacher", text: "I love it too! You make me so happy.", translation: "Eu também adoro! Você me faz muito feliz." },
        ],
        exercises: [
          {
            question: "Como você diz 'Você é bonito/a'?",
            options: ["You are beautiful", "How are you?", "Nice to meet you", "Goodbye"],
            correct: 0,
          },
        ],
        difficulty: "B2",
      },
    ],
  },

  {
    id: 12,
    title: "American Culture & Slang",
    emoji: "🇺🇸",
    description: "Cultura americana, gírias e expressões idiomáticas",
    difficulty: "B2",
    category: "social",
    color: "from-amber-400 to-amber-600",
    lessons: [
      {
        id: 1,
        title: "American Slang & Idioms",
        description: "Gírias e expressões idiomáticas americanas",
        vocabulary: [
          { word: "Cool", translation: "Legal", pronunciation: "ˈko͞ol" },
          { word: "Awesome", translation: "Incrível", pronunciation: "ˈȯ-səm" },
          { word: "Dude", translation: "Cara", pronunciation: "ˈdo͞od" },
          { word: "Chill", translation: "Relaxar", pronunciation: "ˈt͟sil" },
        ],
        phrases: [
          { english: "That's awesome!", portuguese: "Isso é incrível!", pronunciation: "ˈðats ˈȯ-səm" },
          { english: "Chill out!", portuguese: "Relaxa!", pronunciation: "ˈt͟sil ˈau̇t" },
          { english: "You're the best!", portuguese: "Você é o melhor!", pronunciation: "ˈyȯr t͟hə ˈbest" },
          { english: "No way!", portuguese: "Não acredito!", pronunciation: "ˈnō ˈwā" },
        ],
        dialogues: [
          { speaker: "Friend", text: "Dude, that's so cool!", translation: "Cara, isso é muito legal!" },
          { speaker: "Student", text: "Thanks! You're awesome!", translation: "Obrigado! Você é incrível!" },
          { speaker: "Friend", text: "Let's chill and watch a movie.", translation: "Vamos relaxar e assistir um filme." },
          { speaker: "Student", text: "Sounds good to me!", translation: "Parece bom para mim!" },
        ],
        exercises: [
          {
            question: "Como você diz 'Isso é incrível!'?",
            options: ["That's awesome!", "That's terrible", "I don't know", "Goodbye"],
            correct: 0,
          },
        ],
        difficulty: "B2",
      },
    ],
  },
];

/**
 * Obter módulo por ID
 */
export function getModuleById(id: number): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

/**
 * Obter lição por módulo e ID
 */
export function getLessonByModuleAndId(moduleId: number, lessonId: number): Lesson | undefined {
  const module = getModuleById(moduleId);
  return module?.lessons.find((l) => l.id === lessonId);
}

/**
 * Obter todos os módulos por dificuldade
 */
export function getModulesByDifficulty(difficulty: string): Module[] {
  return MODULES.filter((m) => m.difficulty === difficulty);
}

/**
 * Obter todos os módulos por categoria
 */
export function getModulesByCategory(category: string): Module[] {
  return MODULES.filter((m) => m.category === category);
}
