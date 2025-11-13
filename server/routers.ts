import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getCorrelationAnalysis, getSegmentationAnalysis, getAnalysisData } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Analysis routers for Buenos Drivers case
  analysis: router({
    correlations: publicProcedure.query(async () => {
      return await getCorrelationAnalysis();
    }),
    segmentation: publicProcedure.query(async () => {
      return await getSegmentationAnalysis();
    }),
    data: publicProcedure.query(async () => {
      return await getAnalysisData();
    }),
  }),
});

export type AppRouter = typeof appRouter;
