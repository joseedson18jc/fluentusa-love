import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // FluentUSA Love routers
  onboarding: router({
    submitTest: protectedProcedure
      .input(z.object({ answers: z.record(z.string(), z.string()) }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        const response = await invokeLLM({
          messages: [
            { role: "system", content: "You are an English language assessment expert. Analyze the user's answers to 30 questions and determine their CEFR level (A1, A2, B1, B2, C1, C2). Return ONLY the CEFR level and a score from 0-100." },
            { role: "user", content: `Analyze these answers: ${JSON.stringify(input.answers)}` },
          ],
        });
        const message = response.choices[0]?.message;
        const content = typeof message?.content === 'string' ? message.content : '';
        const cefrMatch = content.match(/\b(A1|A2|B1|B2|C1|C2)\b/i);
        const scoreMatch = content.match(/\b(\d{1,3})\b/);
        const cefrLevel = cefrMatch ? cefrMatch[1].toUpperCase() : "B1";
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
        await db.createOnboardingTest({ userId, answers: input.answers as Record<string, string>, score, cefrLevel });
        await db.createUserProfile({ userId, cefrLevel, totalPoints: 0, currentStreak: 0, longestStreak: 0 });
        await db.createScheduleSettings({ userId, monday: true, wednesday: true, friday: true });
        return { cefrLevel, score };
      }),
    getTestResult: protectedProcedure.query(async ({ ctx }) => {
      return await db.getOnboardingTest(ctx.user.id);
    }),
  }),

  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProfile(ctx.user.id);
    }),
    updateVoiceSettings: protectedProcedure
      .input(z.object({ preferredVoice: z.string().optional(), voiceSpeed: z.number().min(0.5).max(2.0).optional() }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserProfile(ctx.user.id, input);
        return { success: true };
      }),
    getStats: protectedProcedure.query(async ({ ctx }) => {
      const profile = await db.getUserProfile(ctx.user.id);
      const sessions = await db.getUserSessions(ctx.user.id);
      const badges = await db.getUserBadges(ctx.user.id);
      const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
      const completedModules = await db.getUserProgress(ctx.user.id);
      const completedCount = completedModules.filter((p) => p.completed).length;
      return {
        cefrLevel: profile?.cefrLevel || "B1",
        totalPoints: profile?.totalPoints || 0,
        currentStreak: profile?.currentStreak || 0,
        longestStreak: profile?.longestStreak || 0,
        totalSessions: sessions.length,
        totalDuration,
        completedModules: completedCount,
        badgesCount: badges.length,
      };
    }),
  }),

  schedule: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getScheduleSettings(ctx.user.id);
    }),
    updateDays: protectedProcedure
      .input(z.object({
        monday: z.boolean().optional(),
        tuesday: z.boolean().optional(),
        wednesday: z.boolean().optional(),
        thursday: z.boolean().optional(),
        friday: z.boolean().optional(),
        saturday: z.boolean().optional(),
        sunday: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateScheduleSettings(ctx.user.id, input);
        return { success: true };
      }),
    updateReminders: protectedProcedure
      .input(z.object({ emailReminders: z.boolean().optional(), pushReminders: z.boolean().optional() }))
      .mutation(async ({ ctx, input }) => {
        await db.updateScheduleSettings(ctx.user.id, input);
        return { success: true };
      }),
  }),

  modules: router({
    list: protectedProcedure.query(async () => {
      return await db.getAllLearningModules();
    }),
    listByLevel: protectedProcedure
      .input(z.object({ cefrLevel: z.string() }))
      .query(async ({ input }) => {
        return await db.getLearningModulesByCefrLevel(input.cefrLevel);
      }),
    getProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProgress(ctx.user.id);
    }),
    startModule: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const existing = await db.getUserProgressByModule(ctx.user.id, input.moduleId);
        if (!existing) {
          await db.createUserProgress({ userId: ctx.user.id, moduleId: input.moduleId, currentLesson: 1, completed: false });
        }
        return { success: true };
      }),
    completeLesson: protectedProcedure
      .input(z.object({ moduleId: z.number(), lessonNumber: z.number(), duration: z.number(), pointsEarned: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const userId = ctx.user.id;
        await db.createLearningSession({ userId, moduleId: input.moduleId, lessonNumber: input.lessonNumber, duration: input.duration, pointsEarned: input.pointsEarned });
        const progress = await db.getUserProgressByModule(userId, input.moduleId);
        if (progress) {
          await db.updateUserProgress(userId, input.moduleId, { currentLesson: input.lessonNumber + 1 });
        }
        const profile = await db.getUserProfile(userId);
        if (profile) {
          await db.updateUserProfile(userId, { totalPoints: (profile.totalPoints || 0) + input.pointsEarned, lastSessionDate: new Date() });
        }
        return { success: true };
      }),
  }),

  badges: router({
    listAll: protectedProcedure.query(async () => {
      return await db.getAllBadges();
    }),
    listUser: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBadges(ctx.user.id);
    }),
    unlock: protectedProcedure
      .input(z.object({ badgeId: z.number(), personalMessage: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        await db.createUserBadge({ userId: ctx.user.id, badgeId: input.badgeId, personalMessage: input.personalMessage });
        return { success: true };
      }),
  }),

  tasks: router({
    listAll: protectedProcedure.query(async () => {
      return await db.getAllOffDayTasks();
    }),
    listCompleted: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserOffDayTasks(ctx.user.id);
    }),
    complete: protectedProcedure
      .input(z.object({ taskId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.createUserOffDayTask({ userId: ctx.user.id, taskId: input.taskId });
        return { success: true };
      }),
  }),

  sessions: router({
    startChat: protectedProcedure
      .input(z.object({ moduleId: z.number(), lessonNumber: z.number() }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: `You are a friendly American English teacher. Start a conversation for Module ${input.moduleId}, Lesson ${input.lessonNumber}. Be warm, encouraging, and use simple language. Keep it short (2-3 sentences).` },
            { role: "user", content: "Start the lesson" },
          ],
        });
        const greeting = response.choices[0]?.message?.content || "Hi! Let's start today's lesson!";
        return { greeting };
      }),
    processResponse: protectedProcedure
      .input(z.object({
        userMessage: z.string(),
        conversationHistory: z.array(z.object({ role: z.enum(["system", "user", "assistant"]), content: z.string() })),
      }))
      .mutation(async ({ input }) => {
        const messages = [...input.conversationHistory, { role: "user" as const, content: input.userMessage }];
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a friendly American English teacher helping a Brazilian Portuguese speaker learn English. Correct pronunciation and grammar gently, explain differences between Portuguese and English, use humor and encouragement. Keep responses short and conversational (2-4 sentences).`,
            },
            ...messages,
          ],
        });
        const teacherResponse = response.choices[0]?.message?.content || "Great! Let's continue.";
        return { teacherResponse };
      }),
  }),
});

export type AppRouter = typeof appRouter;
