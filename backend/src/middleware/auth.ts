import { MiddlewareHandler } from 'hono';
import { supabase } from '../util/supabase/client';

/**
 * Honoの認証ミドルウェア
 */
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    return c.json({ error: 'Authorization header is missing' }, 401);
  }

  const token = authHeader.split(' ')[1]; // Bearerトークンを抽出

  // トークンを検証してユーザー情報を取得
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return c.json({ error: error?.message || 'Invalid token' }, 401);
  }

  // ユーザー情報をcontextに保存
  c.set('user', data.user);

  // 次の処理へ進む
  await next();
};
