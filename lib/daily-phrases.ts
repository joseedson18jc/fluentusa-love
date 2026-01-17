/**
 * Frases Motivadoras do Dia
 * Selecionadas aleatoriamente para inspirar o usuário
 */

export interface DailyPhrase {
  id: string;
  english: string;
  portuguese: string;
  pronunciation: string;
  meaning: string;
  example: string;
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  category: "motivation" | "love" | "learning" | "success" | "friendship";
}

export const DAILY_PHRASES: DailyPhrase[] = [
  {
    id: "phrase_1",
    english: "You are doing amazing!",
    portuguese: "Você está indo incrivelmente bem!",
    pronunciation: "You are doing amazing",
    meaning: "Elogio para alguém que está tendo um bom desempenho",
    example: "José, you are doing amazing in your English studies!",
    difficulty: "A1",
    category: "motivation",
  },
  {
    id: "phrase_2",
    english: "Keep up the good work!",
    portuguese: "Continue com o bom trabalho!",
    pronunciation: "Keep up the good work",
    meaning: "Encorajamento para continuar fazendo algo bem",
    example: "Your pronunciation is getting better. Keep up the good work!",
    difficulty: "A1",
    category: "motivation",
  },
  {
    id: "phrase_3",
    english: "Every day is a new opportunity to learn.",
    portuguese: "Cada dia é uma nova oportunidade para aprender.",
    pronunciation: "Every day is a new opportunity to learn",
    meaning: "Motivação para aproveitar cada dia para crescer",
    example: "Every day is a new opportunity to learn something amazing about English.",
    difficulty: "A2",
    category: "learning",
  },
  {
    id: "phrase_4",
    english: "You've got this!",
    portuguese: "Você consegue!",
    pronunciation: "You've got this",
    meaning: "Encorajamento simples e direto",
    example: "The test looks hard, but you've got this!",
    difficulty: "A1",
    category: "motivation",
  },
  {
    id: "phrase_5",
    english: "Practice makes perfect.",
    portuguese: "A prática leva à perfeição.",
    pronunciation: "Practice makes perfect",
    meaning: "Quanto mais você pratica, melhor fica",
    example: "Your English is improving because practice makes perfect!",
    difficulty: "A2",
    category: "learning",
  },
  {
    id: "phrase_6",
    english: "Love what you do, and you'll never work a day in your life.",
    portuguese: "Ame o que você faz, e nunca trabalhará um dia em sua vida.",
    pronunciation: "Love what you do, and you'll never work a day in your life",
    meaning: "Quando você ama algo, não parece trabalho",
    example: "I love learning English with you, so it never feels like work!",
    difficulty: "B1",
    category: "love",
  },
  {
    id: "phrase_7",
    english: "Your effort today will be your success tomorrow.",
    portuguese: "Seu esforço hoje será seu sucesso amanhã.",
    pronunciation: "Your effort today will be your success tomorrow",
    meaning: "O trabalho árduo agora resulta em sucesso futuro",
    example: "Your effort today will be your success tomorrow in speaking English!",
    difficulty: "B1",
    category: "success",
  },
  {
    id: "phrase_8",
    english: "Don't be afraid to make mistakes. They are stepping stones to success.",
    portuguese: "Não tenha medo de cometer erros. Eles são degraus para o sucesso.",
    pronunciation: "Don't be afraid to make mistakes",
    meaning: "Os erros são parte importante do aprendizado",
    example: "Don't be afraid to make mistakes when speaking English!",
    difficulty: "B2",
    category: "learning",
  },
  {
    id: "phrase_9",
    english: "You are capable of amazing things.",
    portuguese: "Você é capaz de coisas incríveis.",
    pronunciation: "You are capable of amazing things",
    meaning: "Reconhecimento do potencial de alguém",
    example: "José, you are capable of amazing things in English!",
    difficulty: "A2",
    category: "motivation",
  },
  {
    id: "phrase_10",
    english: "Success is not final, failure is not fatal.",
    portuguese: "O sucesso não é final, o fracasso não é fatal.",
    pronunciation: "Success is not final, failure is not fatal",
    meaning: "Nem o sucesso nem o fracasso definem você",
    example: "In learning English, success is not final, failure is not fatal.",
    difficulty: "B2",
    category: "success",
  },
  {
    id: "phrase_11",
    english: "You are stronger than you think.",
    portuguese: "Você é mais forte do que pensa.",
    pronunciation: "You are stronger than you think",
    meaning: "Você tem mais força/capacidade do que acredita",
    example: "When learning English, you are stronger than you think!",
    difficulty: "A2",
    category: "motivation",
  },
  {
    id: "phrase_12",
    english: "The only way to do great work is to love what you do.",
    portuguese: "A única forma de fazer um grande trabalho é amar o que você faz.",
    pronunciation: "The only way to do great work is to love what you do",
    meaning: "Paixão é essencial para excelência",
    example: "The only way to master English is to love what you do.",
    difficulty: "B2",
    category: "love",
  },
  {
    id: "phrase_13",
    english: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    portuguese: "Você é mais corajoso do que acredita, mais forte do que parece, e mais inteligente do que pensa.",
    pronunciation: "You are braver than you believe",
    meaning: "Reconhecimento das qualidades ocultas de alguém",
    example: "José, you are braver than you believe when speaking English!",
    difficulty: "B2",
    category: "motivation",
  },
  {
    id: "phrase_14",
    english: "Every expert was once a beginner.",
    portuguese: "Todo especialista foi uma vez um iniciante.",
    pronunciation: "Every expert was once a beginner",
    meaning: "Todos começam do zero",
    example: "Every English speaker was once a beginner. Keep learning!",
    difficulty: "A2",
    category: "learning",
  },
  {
    id: "phrase_15",
    english: "Your passion is your power.",
    portuguese: "Sua paixão é seu poder.",
    pronunciation: "Your passion is your power",
    meaning: "A paixão é a fonte de força",
    example: "Your passion for learning English is your power!",
    difficulty: "B1",
    category: "love",
  },
];

/**
 * Função para obter frase do dia baseada na data
 */
export function getDailyPhrase(date: Date = new Date()): DailyPhrase {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % DAILY_PHRASES.length;
  return DAILY_PHRASES[index];
}

/**
 * Função para obter frase aleatória
 */
export function getRandomPhrase(): DailyPhrase {
  const randomIndex = Math.floor(Math.random() * DAILY_PHRASES.length);
  return DAILY_PHRASES[randomIndex];
}

/**
 * Função para obter frases por dificuldade
 */
export function getPhrasesByDifficulty(
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
): DailyPhrase[] {
  return DAILY_PHRASES.filter((phrase) => phrase.difficulty === difficulty);
}

/**
 * Função para obter frases por categoria
 */
export function getPhrasesByCategory(
  category: "motivation" | "love" | "learning" | "success" | "friendship"
): DailyPhrase[] {
  return DAILY_PHRASES.filter((phrase) => phrase.category === category);
}
