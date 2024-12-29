import { Context, Next } from 'hono';

/**
 * エンドポイントのログを出力するミドルウェア
 */
export const loggingMiddleware = (c: Context, next: Next) => {
  console.log(`Request: ${c.req.method} ${c.req.url}`);
  return next();
};
