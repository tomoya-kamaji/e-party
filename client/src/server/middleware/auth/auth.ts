import { MiddlewareHandler } from 'hono';
import { convertCurrentUser, CurrentUser } from './authUser';
import { supabaseBackendClient } from '@/server/util/supabase';

export const CURRENT_USER_KEY = 'currentUser';
export interface AppContext {
  Variables: {
    [CURRENT_USER_KEY]: CurrentUser;
  };
}

/**
 * Honoの認証ミドルウェア
 */
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1]; // Bearerトークンを抽出

  const { data, error } = await supabaseBackendClient.auth.getUser(token);
  if (error || !data.user) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  // ユーザー情報をcontextに保存
  c.set(CURRENT_USER_KEY, convertCurrentUser(data.user));

  // 次の処理へ進む
  await next();
};
