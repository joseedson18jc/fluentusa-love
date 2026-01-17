/**
 * Sistema de badges de milestones para gamificação
 * Desbloqueia conquistas baseadas em progresso do usuário
 */

export type BadgeType =
  | "pronunciation"
  | "consistency"
  | "progress"
  | "streak"
  | "achievement"
  | "special";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: BadgeType;
  color: string;
  requirement: string;
  unlockedAt?: Date;
  progress?: number; // 0-100
}

export interface MilestoneProgress {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  currentStreak: number;
  longestStreak: number;
  uniqueWords: number;
  perfectScores: number; // >= 95
  excellentScores: number; // >= 85
  wordsAbove90: string[];
  daysActive: number;
  lastPracticeDate: Date | null;
}

/**
 * Definição de todos os badges disponíveis
 */
export const AVAILABLE_BADGES: Record<string, Badge> = {
  // Badges de Pronúncia
  first_attempt: {
    id: "first_attempt",
    name: "Primeiro Passo",
    description: "Complete sua primeira tentativa de pronúncia",
    icon: "🎤",
    type: "pronunciation",
    color: "bg-blue-100",
    requirement: "1 tentativa",
  },
  ten_attempts: {
    id: "ten_attempts",
    name: "Praticante",
    description: "Complete 10 tentativas de pronúncia",
    icon: "🎯",
    type: "pronunciation",
    color: "bg-blue-100",
    requirement: "10 tentativas",
  },
  fifty_attempts: {
    id: "fifty_attempts",
    name: "Dedicado",
    description: "Complete 50 tentativas de pronúncia",
    icon: "💪",
    type: "pronunciation",
    color: "bg-blue-100",
    requirement: "50 tentativas",
  },
  hundred_attempts: {
    id: "hundred_attempts",
    name: "Mestre da Pronúncia",
    description: "Complete 100 tentativas de pronúncia",
    icon: "👑",
    type: "pronunciation",
    color: "bg-blue-100",
    requirement: "100 tentativas",
  },

  // Badges de Consistência
  perfect_five: {
    id: "perfect_five",
    name: "Perfeição",
    description: "Obtenha 95% ou mais em 5 tentativas",
    icon: "⭐",
    type: "consistency",
    color: "bg-yellow-100",
    requirement: "5 scores >= 95%",
  },
  excellent_ten: {
    id: "excellent_ten",
    name: "Excelência",
    description: "Obtenha 85% ou mais em 10 tentativas consecutivas",
    icon: "✨",
    type: "consistency",
    color: "bg-yellow-100",
    requirement: "10 scores >= 85%",
  },
  consistent_performer: {
    id: "consistent_performer",
    name: "Consistente",
    description: "Mantenha uma média de 80% ou mais em 20 tentativas",
    icon: "📈",
    type: "consistency",
    color: "bg-yellow-100",
    requirement: "Média >= 80% em 20 tentativas",
  },

  // Badges de Progresso
  improvement_jump: {
    id: "improvement_jump",
    name: "Salto de Progresso",
    description: "Melhore 20 pontos em relação à tentativa anterior",
    icon: "🚀",
    type: "progress",
    color: "bg-green-100",
    requirement: "Melhoria de 20 pontos",
  },
  steady_improvement: {
    id: "steady_improvement",
    name: "Melhoria Constante",
    description: "Melhore progressivamente por 5 dias seguidos",
    icon: "📊",
    type: "progress",
    color: "bg-green-100",
    requirement: "5 dias de melhoria",
  },
  doubled_score: {
    id: "doubled_score",
    name: "Dobro",
    description: "Dobre seu score em uma palavra",
    icon: "2️⃣",
    type: "progress",
    color: "bg-green-100",
    requirement: "Score dobrado",
  },

  // Badges de Streak
  three_day_streak: {
    id: "three_day_streak",
    name: "Streak Romântico 3 Dias",
    description: "Pratique 3 dias seguidos",
    icon: "🔥",
    type: "streak",
    color: "bg-red-100",
    requirement: "3 dias consecutivos",
  },
  seven_day_streak: {
    id: "seven_day_streak",
    name: "Streak Romântico 7 Dias",
    description: "Pratique 7 dias seguidos",
    icon: "❤️",
    type: "streak",
    color: "bg-red-100",
    requirement: "7 dias consecutivos",
  },
  thirty_day_streak: {
    id: "thirty_day_streak",
    name: "Mês Apaixonado",
    description: "Pratique 30 dias seguidos",
    icon: "💕",
    type: "streak",
    color: "bg-red-100",
    requirement: "30 dias consecutivos",
  },

  // Badges de Conquista
  vocabulary_master: {
    id: "vocabulary_master",
    name: "Mestre do Vocabulário",
    description: "Pratique 50 palavras diferentes",
    icon: "📚",
    type: "achievement",
    color: "bg-purple-100",
    requirement: "50 palavras únicas",
  },
  date_night_fluent: {
    id: "date_night_fluent",
    name: "Fluência no Date Night",
    description: "Obtenha 90% em todas as palavras do módulo Dating",
    icon: "💑",
    type: "achievement",
    color: "bg-purple-100",
    requirement: "90% em Dating module",
  },
  conversation_ready: {
    id: "conversation_ready",
    name: "Pronto para Conversar",
    description: "Complete todos os módulos com 80% ou mais",
    icon: "💬",
    type: "achievement",
    color: "bg-purple-100",
    requirement: "80% em todos os módulos",
  },

  // Badges Especiais
  early_bird: {
    id: "early_bird",
    name: "Madrugador",
    description: "Pratique entre 5h e 7h da manhã",
    icon: "🌅",
    type: "special",
    color: "bg-orange-100",
    requirement: "Praticar de manhã cedo",
  },
  night_owl: {
    id: "night_owl",
    name: "Coruja Noturna",
    description: "Pratique entre 22h e 23h59",
    icon: "🌙",
    type: "special",
    color: "bg-orange-100",
    requirement: "Praticar à noite",
  },
  weekend_warrior: {
    id: "weekend_warrior",
    name: "Guerreiro de Fim de Semana",
    description: "Pratique sábado e domingo",
    icon: "⚔️",
    type: "special",
    color: "bg-orange-100",
    requirement: "Praticar no fim de semana",
  },
};

/**
 * Calcular badges desbloqueados baseado no progresso
 */
export function calculateUnlockedBadges(
  progress: MilestoneProgress
): Badge[] {
  const unlockedBadges: Badge[] = [];

  // Badges de Pronúncia
  if (progress.totalAttempts >= 1) {
    unlockedBadges.push(AVAILABLE_BADGES.first_attempt);
  }
  if (progress.totalAttempts >= 10) {
    unlockedBadges.push(AVAILABLE_BADGES.ten_attempts);
  }
  if (progress.totalAttempts >= 50) {
    unlockedBadges.push(AVAILABLE_BADGES.fifty_attempts);
  }
  if (progress.totalAttempts >= 100) {
    unlockedBadges.push(AVAILABLE_BADGES.hundred_attempts);
  }

  // Badges de Consistência
  if (progress.perfectScores >= 5) {
    unlockedBadges.push(AVAILABLE_BADGES.perfect_five);
  }
  if (progress.excellentScores >= 10) {
    unlockedBadges.push(AVAILABLE_BADGES.excellent_ten);
  }
  if (progress.totalAttempts >= 20 && progress.averageScore >= 80) {
    unlockedBadges.push(AVAILABLE_BADGES.consistent_performer);
  }

  // Badges de Streak
  if (progress.currentStreak >= 3) {
    unlockedBadges.push(AVAILABLE_BADGES.three_day_streak);
  }
  if (progress.currentStreak >= 7) {
    unlockedBadges.push(AVAILABLE_BADGES.seven_day_streak);
  }
  if (progress.longestStreak >= 30) {
    unlockedBadges.push(AVAILABLE_BADGES.thirty_day_streak);
  }

  // Badges de Conquista
  if (progress.uniqueWords >= 50) {
    unlockedBadges.push(AVAILABLE_BADGES.vocabulary_master);
  }

  return unlockedBadges;
}

/**
 * Calcular próximos badges a desbloquear
 */
export function getNextBadges(progress: MilestoneProgress): Badge[] {
  const unlockedIds = calculateUnlockedBadges(progress).map((b) => b.id);
  const nextBadges: Badge[] = [];

  // Próximos badges de pronúncia
  if (progress.totalAttempts < 10) {
    const badge = { ...AVAILABLE_BADGES.ten_attempts };
    badge.progress = Math.min(100, (progress.totalAttempts / 10) * 100);
    nextBadges.push(badge);
  } else if (progress.totalAttempts < 50) {
    const badge = { ...AVAILABLE_BADGES.fifty_attempts };
    badge.progress = Math.min(100, (progress.totalAttempts / 50) * 100);
    nextBadges.push(badge);
  }

  // Próximos badges de streak
  if (progress.currentStreak < 3) {
    const badge = { ...AVAILABLE_BADGES.three_day_streak };
    badge.progress = Math.min(100, (progress.currentStreak / 3) * 100);
    nextBadges.push(badge);
  } else if (progress.currentStreak < 7) {
    const badge = { ...AVAILABLE_BADGES.seven_day_streak };
    badge.progress = Math.min(100, (progress.currentStreak / 7) * 100);
    nextBadges.push(badge);
  }

  return nextBadges.filter((b) => !unlockedIds.includes(b.id)).slice(0, 3);
}

/**
 * Gerar mensagem de desbloqueio de badge
 */
export function generateBadgeUnlockMessage(badge: Badge): string {
  const messages: Record<BadgeType, string[]> = {
    pronunciation: [
      `Parabéns! Você desbloqueou "${badge.name}"! 🎉`,
      `Incrível! Você conquistou "${badge.name}"! 🌟`,
    ],
    consistency: [
      `Fantástico! Você é consistente! "${badge.name}" desbloqueado! 💪`,
      `Que dedicação! "${badge.name}" é seu! ✨`,
    ],
    progress: [
      `Que progresso! "${badge.name}" desbloqueado! 🚀`,
      `Você está melhorando muito! "${badge.name}" conquistado! 📈`,
    ],
    streak: [
      `Que ritmo! "${badge.name}" desbloqueado! 🔥`,
      `Você é apaixonado por aprender! "${badge.name}" é seu! ❤️`,
    ],
    achievement: [
      `Que conquista! "${badge.name}" desbloqueado! 👑`,
      `Você é um campeão! "${badge.name}" conquistado! 🏆`,
    ],
    special: [
      `Que especial! "${badge.name}" desbloqueado! 🎊`,
      `Você descobriu um badge secreto! "${badge.name}"! 🎁`,
    ],
  };

  const typeMessages = messages[badge.type];
  return typeMessages[Math.floor(Math.random() * typeMessages.length)];
}

/**
 * Calcular pontos de badge
 */
export function calculateBadgePoints(badge: Badge): number {
  const pointsByType: Record<BadgeType, number> = {
    pronunciation: 10,
    consistency: 15,
    progress: 20,
    streak: 25,
    achievement: 50,
    special: 100,
  };

  return pointsByType[badge.type];
}

/**
 * Comparar dois conjuntos de badges
 */
export function compareBadges(
  oldBadges: Badge[],
  newBadges: Badge[]
): Badge[] {
  const oldIds = new Set(oldBadges.map((b) => b.id));
  return newBadges.filter((b) => !oldIds.has(b.id));
}
