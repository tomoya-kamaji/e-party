import roomApp from '@/server/feature/room';
import userApp from '@/server/feature/user';
import { authMiddleware } from '@/server/middleware';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono()
  .basePath('/api')
  .use(authMiddleware)
  // user
  .route('/users', userApp)
  // room
  .route('/rooms', roomApp);

export const GET = handle(app);
export const POST = handle(app);

export type NextAppType = typeof app;
