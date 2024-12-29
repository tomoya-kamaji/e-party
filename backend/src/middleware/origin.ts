import { Context, Next } from 'hono';
import { cors } from 'hono/cors';

/**
 * オリジンを設定するミドルウェア
 */
export const originMiddleware = (c: Context, next: Next) => {
  // 一旦全てのオリジンを許可
  const middleware = cors({
    origin: '*',
  });

  return middleware(c, next);
};
