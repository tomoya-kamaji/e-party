import userApp from '@/server/feature/user';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api').route('/users', userApp);

export const GET = handle(app);
export const POST = handle(app);

export type NextAppType = typeof app;
