/**
 * 30 Questões de Teste de Nivelamento CEFR
 * Progressão: A1 → A2 → B1 → B2 → C1 → C2
 */

export interface OnboardingQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "listening" | "translation" | "fill_blank";
  options?: string[];
  correctAnswer: string;
  explanation: string;
  cefrLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  audioUrl?: string; // Para questões de listening
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  // A1 Level (Questões 1-5)
  {
    id: "q1",
    question: "What is your name?",
    type: "multiple_choice",
    options: ["My name is José", "I am José", "I'm José", "All of the above"],
    correctAnswer: "All of the above",
    explanation: "Todas as opções são formas corretas de apresentar seu nome em inglês.",
    cefrLevel: "A1",
  },
  {
    id: "q2",
    question: "Complete: 'She ___ a teacher.'",
    type: "fill_blank",
    correctAnswer: "is",
    explanation: "Usamos 'is' com pronomes singulares como 'she'. Exemplo: She is a teacher.",
    cefrLevel: "A1",
  },
  {
    id: "q3",
    question: "Translate to English: 'Olá, tudo bem?'",
    type: "translation",
    correctAnswer: "Hello, how are you?",
    explanation: "Uma forma comum de cumprimento em inglês. Outras opções: 'Hi, how are you?' ou 'Hey, how's it going?'",
    cefrLevel: "A1",
  },
  {
    id: "q4",
    question: "What time is it?",
    type: "multiple_choice",
    options: ["It is 3 o'clock", "It's 3 o'clock", "The time is 3 o'clock", "All of the above"],
    correctAnswer: "All of the above",
    explanation: "Todas as formas são corretas para dizer as horas em inglês.",
    cefrLevel: "A1",
  },
  {
    id: "q5",
    question: "Complete: 'I ___ from Brazil.'",
    type: "fill_blank",
    correctAnswer: "am",
    explanation: "Usamos 'am' com 'I'. Exemplo: I am from Brazil.",
    cefrLevel: "A1",
  },

  // A2 Level (Questões 6-10)
  {
    id: "q6",
    question: "What did you do yesterday?",
    type: "multiple_choice",
    options: [
      "I went to the beach",
      "I was at home",
      "I studied English",
      "All of the above",
    ],
    correctAnswer: "All of the above",
    explanation: "Todas são respostas válidas usando o passado simples.",
    cefrLevel: "A2",
  },
  {
    id: "q7",
    question: "Complete: 'If I ___ you, I would help.'",
    type: "fill_blank",
    correctAnswer: "were",
    explanation: "Usamos 'were' em estruturas condicionais com 'I'. Exemplo: If I were you, I would help.",
    cefrLevel: "A2",
  },
  {
    id: "q8",
    question: "Translate: 'Eu gostaria de um café, por favor.'",
    type: "translation",
    correctAnswer: "I would like a coffee, please.",
    explanation: "Forma polida de pedir algo em inglês. Alternativa: 'I'd like a coffee, please.'",
    cefrLevel: "A2",
  },
  {
    id: "q9",
    question: "Which sentence is correct?",
    type: "multiple_choice",
    options: [
      "She has been living here for 5 years",
      "She lives here for 5 years",
      "She is living here for 5 years",
      "She lived here for 5 years",
    ],
    correctAnswer: "She has been living here for 5 years",
    explanation: "Para ações que começaram no passado e continuam, usamos 'present perfect continuous'.",
    cefrLevel: "A2",
  },
  {
    id: "q10",
    question: "Complete: 'I haven't seen him ___ last week.'",
    type: "fill_blank",
    correctAnswer: "since",
    explanation: "'Since' é usado com um ponto no tempo. Exemplo: I haven't seen him since last week.",
    cefrLevel: "A2",
  },

  // B1 Level (Questões 11-15)
  {
    id: "q11",
    question: "What does 'to break the ice' mean?",
    type: "multiple_choice",
    options: [
      "Quebrar gelo literal",
      "Iniciar uma conversa para reduzir tensão",
      "Congelar algo",
      "Nenhuma das acima",
    ],
    correctAnswer: "Iniciar uma conversa para reduzir tensão",
    explanation: "'Break the ice' é um phrasal verb que significa iniciar uma conversa para reduzir constrangimento.",
    cefrLevel: "B1",
  },
  {
    id: "q12",
    question: "Complete: 'Despite ___ hard, he didn't pass the exam.'",
    type: "fill_blank",
    correctAnswer: "studying",
    explanation: "Após 'despite', usamos um gerúndio ou nome. Exemplo: Despite studying hard, he didn't pass.",
    cefrLevel: "B1",
  },
  {
    id: "q13",
    question: "Translate: 'Embora ele seja rico, ele é muito humilde.'",
    type: "translation",
    correctAnswer: "Although he is rich, he is very humble.",
    explanation: "'Although' conecta duas ideias contrastantes. Alternativa: 'Even though he is rich, he is very humble.'",
    cefrLevel: "B1",
  },
  {
    id: "q14",
    question: "Which is the best response to 'How do you feel about the proposal?'",
    type: "multiple_choice",
    options: [
      "I think it's a good idea, but I have some concerns.",
      "Yes, it's good.",
      "No, it's bad.",
      "I don't know.",
    ],
    correctAnswer: "I think it's a good idea, but I have some concerns.",
    explanation: "Uma resposta mais elaborada e natural que mostra nuances de opinião.",
    cefrLevel: "B1",
  },
  {
    id: "q15",
    question: "Complete: 'If I had known about the party, I ___ come.'",
    type: "fill_blank",
    correctAnswer: "would have",
    explanation: "Condicional do passado. Exemplo: If I had known, I would have come.",
    cefrLevel: "B1",
  },

  // B2 Level (Questões 16-20)
  {
    id: "q16",
    question: "What is the meaning of 'to put someone on a pedestal'?",
    type: "multiple_choice",
    options: [
      "Colocar alguém em um pedestal literal",
      "Admirar alguém excessivamente",
      "Ignorar alguém",
      "Criticar alguém",
    ],
    correctAnswer: "Admirar alguém excessivamente",
    explanation: "'Put on a pedestal' significa admirar ou idealizar alguém demais.",
    cefrLevel: "B2",
  },
  {
    id: "q17",
    question: "Complete: 'The report ___ the need for immediate action.'",
    type: "fill_blank",
    correctAnswer: "underscores",
    explanation: "'Underscores' significa destacar ou enfatizar. Alternativa: 'emphasizes' ou 'highlights'.",
    cefrLevel: "B2",
  },
  {
    id: "q18",
    question: "Translate: 'A despeito de suas limitações, ele alcançou grande sucesso.'",
    type: "translation",
    correctAnswer: "Despite his limitations, he achieved great success.",
    explanation: "'Despite' é uma preposição que introduz uma ideia contrastante.",
    cefrLevel: "B2",
  },
  {
    id: "q19",
    question: "Which sentence uses the subjunctive mood correctly?",
    type: "multiple_choice",
    options: [
      "I suggest that he goes to the doctor.",
      "I suggest that he go to the doctor.",
      "I suggest him to go to the doctor.",
      "I suggest him going to the doctor.",
    ],
    correctAnswer: "I suggest that he go to the doctor.",
    explanation: "O subjuntivo em inglês usa a forma base do verbo após 'suggest', 'recommend', etc.",
    cefrLevel: "B2",
  },
  {
    id: "q20",
    question: "Complete: 'The phenomenon ___ to several factors.'",
    type: "fill_blank",
    correctAnswer: "can be attributed",
    explanation: "'Can be attributed to' significa 'pode ser atribuído a'. Exemplo: The phenomenon can be attributed to several factors.",
    cefrLevel: "B2",
  },

  // C1 Level (Questões 21-25)
  {
    id: "q21",
    question: "What does 'to prevaricate' mean?",
    type: "multiple_choice",
    options: [
      "Preparar algo",
      "Evitar dizer a verdade",
      "Procrastinar",
      "Prevenir algo",
    ],
    correctAnswer: "Evitar dizer a verdade",
    explanation: "'Prevaricate' significa evadir-se ou evitar dizer a verdade diretamente.",
    cefrLevel: "C1",
  },
  {
    id: "q22",
    question: "Complete: 'His ___ for detail was both a strength and a weakness.'",
    type: "fill_blank",
    correctAnswer: "penchant",
    explanation: "'Penchant' significa inclinação ou tendência. Exemplo: His penchant for detail was remarkable.",
    cefrLevel: "C1",
  },
  {
    id: "q23",
    question: "Translate: 'A sua perspicácia nos negócios permitiu-lhe acumular uma fortuna considerável.'",
    type: "translation",
    correctAnswer: "His business acumen allowed him to accumulate considerable wealth.",
    explanation: "'Acumen' significa perspicácia ou habilidade em algo. 'Considerable' significa significativo.",
    cefrLevel: "C1",
  },
  {
    id: "q24",
    question: "Which sentence demonstrates sophisticated use of English?",
    type: "multiple_choice",
    options: [
      "The problem is very big and hard to solve.",
      "The intricacies of the problem render it particularly challenging to resolve.",
      "The problem is difficult.",
      "It's hard to fix the problem.",
    ],
    correctAnswer: "The intricacies of the problem render it particularly challenging to resolve.",
    explanation: "Esta frase usa vocabulário sofisticado e estrutura gramatical complexa.",
    cefrLevel: "C1",
  },
  {
    id: "q25",
    question: "Complete: 'The author's ___ style makes the novel both accessible and intellectually stimulating.'",
    type: "fill_blank",
    correctAnswer: "felicitous",
    explanation: "'Felicitous' significa apropriado, bem-escolhido ou que funciona bem. Exemplo: His felicitous choice of words impressed everyone.",
    cefrLevel: "C1",
  },

  // C2 Level (Questões 26-30)
  {
    id: "q26",
    question: "What is the precise meaning of 'to obfuscate'?",
    type: "multiple_choice",
    options: [
      "Tornar claro e compreensível",
      "Tornar obscuro ou confuso intencionalmente",
      "Simplificar algo",
      "Criticar algo",
    ],
    correctAnswer: "Tornar obscuro ou confuso intencionalmente",
    explanation: "'Obfuscate' significa deliberadamente tornar algo obscuro ou difícil de entender.",
    cefrLevel: "C2",
  },
  {
    id: "q27",
    question: "Complete: 'The government's ___ policies were widely criticized by economists.'",
    type: "fill_blank",
    correctAnswer: "profligate",
    explanation: "'Profligate' significa extravagante ou desperdiçador. Exemplo: His profligate spending led to bankruptcy.",
    cefrLevel: "C2",
  },
  {
    id: "q28",
    question: "Translate: 'A sua erudição e eloquência tornaram-no um orador formidável.'",
    type: "translation",
    correctAnswer: "His erudition and eloquence made him a formidable orator.",
    explanation: "'Erudition' = conhecimento profundo; 'eloquence' = capacidade de falar bem; 'formidable' = impressionante.",
    cefrLevel: "C2",
  },
  {
    id: "q29",
    question: "Which demonstrates the most nuanced understanding of English?",
    type: "multiple_choice",
    options: [
      "The situation is complicated.",
      "The situation's multifaceted nature engenders considerable ambiguity.",
      "The situation is hard to understand.",
      "There are many problems.",
    ],
    correctAnswer: "The situation's multifaceted nature engenders considerable ambiguity.",
    explanation: "Uso sofisticado de 'multifaceted', 'engenders' e 'ambiguity' demonstra domínio avançado.",
    cefrLevel: "C2",
  },
  {
    id: "q30",
    question: "Complete: 'His ___ observations about human nature revealed a profound understanding of psychology.'",
    type: "fill_blank",
    correctAnswer: "perspicacious",
    explanation: "'Perspicacious' significa que tem visão aguçada ou perspicácia. Exemplo: Her perspicacious analysis was invaluable.",
    cefrLevel: "C2",
  },
];

/**
 * Função para calcular nível CEFR baseado no score
 */
export function calculateCEFRLevel(score: number): "A1" | "A2" | "B1" | "B2" | "C1" | "C2" {
  if (score <= 16) return "A1";
  if (score <= 33) return "A2";
  if (score <= 50) return "B1";
  if (score <= 66) return "B2";
  if (score <= 83) return "C1";
  return "C2";
}

/**
 * Função para calcular pontuação percentual
 */
export function calculateScore(correctAnswers: number, totalQuestions: number): number {
  return Math.round((correctAnswers / totalQuestions) * 100);
}
