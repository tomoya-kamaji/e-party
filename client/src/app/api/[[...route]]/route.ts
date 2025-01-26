import roomApp from '@/server/feature/room';
import userApp from '@/server/feature/user';
import { authMiddleware, loggingMiddleware, originMiddleware } from '@/server/middleware';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono()
  .basePath('/api')
  .use(authMiddleware)
  .use('*', originMiddleware)
  .use('*', loggingMiddleware)
  // user
  .route('/users', userApp)
  // room
  .route('/rooms', roomApp);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type NextAppType = typeof app;
