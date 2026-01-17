import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  userProfiles,
  scheduleSettings,
  learningModules,
  userProgress,
  learningSessions,
  badges,
  userBadges,
  onboardingTests,
  offDayTasks,
  userOffDayTasks,
  type InsertUserProfile,
  type InsertScheduleSettings,
  type InsertOnboardingTest,
  type InsertUserProgress,
  type InsertLearningSession,
  type InsertUserBadge,
  type InsertUserOffDayTask,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ User Profile ============

export async function getUserProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
  return profile || null;
}

export async function createUserProfile(data: InsertUserProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(userProfiles).values(data);
  return 0;
}

export async function updateUserProfile(userId: number, data: Partial<InsertUserProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(userProfiles).set(data).where(eq(userProfiles.userId, userId));
}

// ============ Schedule Settings ============

export async function getScheduleSettings(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const [settings] = await db.select().from(scheduleSettings).where(eq(scheduleSettings.userId, userId));
  return settings || null;
}

export async function createScheduleSettings(data: InsertScheduleSettings) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(scheduleSettings).values(data);
  return 0;
}

export async function updateScheduleSettings(userId: number, data: Partial<InsertScheduleSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(scheduleSettings).set(data).where(eq(scheduleSettings.userId, userId));
}

// ============ Onboarding Test ============

export async function getOnboardingTest(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const [test] = await db.select().from(onboardingTests).where(eq(onboardingTests.userId, userId));
  return test || null;
}

export async function createOnboardingTest(data: InsertOnboardingTest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(onboardingTests).values(data);
  return 0;
}

// ============ Learning Modules ============

export async function getAllLearningModules() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(learningModules).orderBy(learningModules.order);
}

export async function getLearningModulesByCefrLevel(cefrLevel: string) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(learningModules).where(eq(learningModules.cefrLevel, cefrLevel)).orderBy(learningModules.order);
}

// ============ User Progress ============

export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(userProgress).where(eq(userProgress.userId, userId));
}

export async function getUserProgressByModule(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return null;

  const [progress] = await db
    .select()
    .from(userProgress)
    .where(and(eq(userProgress.userId, userId), eq(userProgress.moduleId, moduleId)));
  return progress || null;
}

export async function createUserProgress(data: InsertUserProgress) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(userProgress).values(data);
  return 0;
}

export async function updateUserProgress(userId: number, moduleId: number, data: Partial<InsertUserProgress>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(userProgress)
    .set(data)
    .where(and(eq(userProgress.userId, userId), eq(userProgress.moduleId, moduleId)));
}

// ============ Learning Sessions ============

export async function getUserSessions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(learningSessions).where(eq(learningSessions.userId, userId)).orderBy(desc(learningSessions.completedAt));
}

export async function createLearningSession(data: InsertLearningSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(learningSessions).values(data);
  return 0;
}

// ============ Badges ============

export async function getAllBadges() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(badges);
}

export async function getUserBadges(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      id: userBadges.id,
      badgeId: userBadges.badgeId,
      unlockedAt: userBadges.unlockedAt,
      personalMessage: userBadges.personalMessage,
      title: badges.title,
      description: badges.description,
      icon: badges.icon,
      condition: badges.condition,
    })
    .from(userBadges)
    .innerJoin(badges, eq(userBadges.badgeId, badges.id))
    .where(eq(userBadges.userId, userId))
    .orderBy(desc(userBadges.unlockedAt));
}

export async function createUserBadge(data: InsertUserBadge) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(userBadges).values(data);
  return 0;
}

// ============ Off-Day Tasks ============

export async function getAllOffDayTasks() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(offDayTasks);
}

export async function getUserOffDayTasks(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      id: userOffDayTasks.id,
      taskId: userOffDayTasks.taskId,
      completedAt: userOffDayTasks.completedAt,
      title: offDayTasks.title,
      description: offDayTasks.description,
      type: offDayTasks.type,
      url: offDayTasks.url,
    })
    .from(userOffDayTasks)
    .innerJoin(offDayTasks, eq(userOffDayTasks.taskId, offDayTasks.id))
    .where(eq(userOffDayTasks.userId, userId))
    .orderBy(desc(userOffDayTasks.completedAt));
}

export async function createUserOffDayTask(data: InsertUserOffDayTask) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(userOffDayTasks).values(data);
  return 0;
}
