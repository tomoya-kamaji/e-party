import { Context, Next } from 'hono';
import { cors } from 'hono/cors';

/**
 * オリジンを設定するミドルウェア
 */
export const originMiddleware = (c: Context, next: Next) => {
  const allowedOrigins = ['http://localhost:3000', '*'];
  // 一旦全てのオリジンを許可
  const middleware = cors({
    origin: allowedOrigins,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  });
  return middleware(c, next);
};
