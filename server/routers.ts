import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

const COOKIE_NAME = "session_token";

export const appRouter = router({
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

  // Books API
  books: router({
    list: publicProcedure.query(() => db.getPublishedBooks()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getBookById(input.id)),
    create: protectedProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.string(),
          author: z.string(),
          description: z.string().optional(),
          coverUrl: z.string().optional(),
        })
      )
      .mutation(({ input }) => db.createBook(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => db.updateBook(input.id, input)),
  }),

  // Chapters API
  chapters: router({
    getByBook: publicProcedure
      .input(z.object({ bookId: z.number() }))
      .query(({ input }) => db.getPublishedChaptersByBookId(input.bookId)),
    getByNumber: publicProcedure
      .input(z.object({ bookId: z.number(), number: z.number() }))
      .query(({ input }) => db.getChapterByNumber(input.bookId, input.number)),
    create: protectedProcedure
      .input(
        z.object({
          bookId: z.number(),
          number: z.number(),
          title: z.string(),
          content: z.string(),
        })
      )
      .mutation(({ input }) => db.createChapter(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          content: z.string().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => db.updateChapter(input.id, input)),
  }),

  // Webinars API
  webinars: router({
    list: publicProcedure.query(() => db.getPublishedWebinars()),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          instructor: z.string(),
          videoUrl: z.string(),
          duration: z.number().optional(),
          thumbnailUrl: z.string().optional(),
        })
      )
      .mutation(({ input }) => db.createWebinar(input)),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          published: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => db.updateWebinar(input.id, input)),
  }),
});

export type AppRouter = typeof appRouter;
