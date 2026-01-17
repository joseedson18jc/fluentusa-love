import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  float,
  json,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// User profiles - informações específicas do aprendizado
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  cefrLevel: varchar("cefrLevel", { length: 10 }).notNull(), // A1, A2, B1, B2, C1, C2
  totalPoints: int("totalPoints").default(0).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  longestStreak: int("longestStreak").default(0).notNull(),
  lastSessionDate: timestamp("lastSessionDate"),
  preferredVoice: varchar("preferredVoice", { length: 50 }).default("Rachel"), // ElevenLabs voice
  voiceSpeed: float("voiceSpeed").default(1.0), // 0.5 - 2.0
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Schedule settings - configuração de dias da semana
export const scheduleSettings = mysqlTable("schedule_settings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  monday: boolean("monday").default(false),
  tuesday: boolean("tuesday").default(false),
  wednesday: boolean("wednesday").default(false),
  thursday: boolean("thursday").default(false),
  friday: boolean("friday").default(false),
  saturday: boolean("saturday").default(false),
  sunday: boolean("sunday").default(false),
  emailReminders: boolean("emailReminders").default(true),
  pushReminders: boolean("pushReminders").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Learning modules - módulos temáticos
export const learningModules = mysqlTable("learning_modules", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: int("order").notNull(), // ordem de exibição
  totalLessons: int("totalLessons").notNull(),
  cefrLevel: varchar("cefrLevel", { length: 10 }).notNull(),
  icon: varchar("icon", { length: 50 }), // emoji ou nome do ícone
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// User progress - progresso do usuário em cada módulo
export const userProgress = mysqlTable("user_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  currentLesson: int("currentLesson").default(1).notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Learning sessions - histórico de sessões
export const learningSessions = mysqlTable("learning_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: int("moduleId").notNull(),
  lessonNumber: int("lessonNumber").notNull(),
  duration: int("duration").notNull(), // em segundos
  pointsEarned: int("pointsEarned").default(0).notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

// Badges - conquistas e badges
export const badges = mysqlTable("badges", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }), // emoji
  condition: text("condition"), // descrição da condição para desbloquear
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// User badges - badges conquistados pelo usuário
export const userBadges = mysqlTable("user_badges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeId: int("badgeId").notNull(),
  unlockedAt: timestamp("unlockedAt").defaultNow().notNull(),
  personalMessage: text("personalMessage"), // mensagem personalizada ao desbloquear
});

// Onboarding test - resultado do teste de nivelamento
export const onboardingTests = mysqlTable("onboarding_tests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  answers: json("answers").$type<Record<string, string>>().notNull(), // { "q1": "answer", "q2": "answer", ... }
  score: int("score").notNull(), // pontuação total
  cefrLevel: varchar("cefrLevel", { length: 10 }).notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

// Off-day tasks - tarefas leves para dias sem sessão
export const offDayTasks = mysqlTable("off_day_tasks", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["music", "video", "podcast", "reading", "other"]).notNull(),
  url: text("url"), // link para conteúdo sugerido
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// User off-day tasks - tarefas concluídas pelo usuário
export const userOffDayTasks = mysqlTable("user_off_day_tasks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  taskId: int("taskId").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

// Export additional types
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = typeof userProfiles.$inferInsert;

export type ScheduleSettings = typeof scheduleSettings.$inferSelect;
export type InsertScheduleSettings = typeof scheduleSettings.$inferInsert;

export type LearningModule = typeof learningModules.$inferSelect;
export type InsertLearningModule = typeof learningModules.$inferInsert;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

export type LearningSession = typeof learningSessions.$inferSelect;
export type InsertLearningSession = typeof learningSessions.$inferInsert;

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = typeof badges.$inferInsert;

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

export type OnboardingTest = typeof onboardingTests.$inferSelect;
export type InsertOnboardingTest = typeof onboardingTests.$inferInsert;

export type OffDayTask = typeof offDayTasks.$inferSelect;
export type InsertOffDayTask = typeof offDayTasks.$inferInsert;

export type UserOffDayTask = typeof userOffDayTasks.$inferSelect;
export type InsertUserOffDayTask = typeof userOffDayTasks.$inferInsert;
