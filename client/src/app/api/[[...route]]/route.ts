import userApp from '@/server/feature/user';
import { authMiddleware } from '@/server/middleware';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api').use(authMiddleware).route('/users', userApp);

export const GET = handle(app);
export const POST = handle(app);

export type NextAppType = typeof app;
