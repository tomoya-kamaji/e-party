import { Context, Next } from 'hono';
import { cors } from 'hono/cors';

/**
 * オリジンを設定するミドルウェア
 */
export const originMiddleware = (c: Context, next: Next) => {
  // 一旦全てのオリジンを許可
  const middleware = cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  });
  return middleware(c, next);
};
