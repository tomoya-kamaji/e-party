import { UnauthorizedException } from '@/util/exception';
import { MiddlewareHandler } from 'hono';
import { supabase } from '../../util/supabase/client';
import { convertCurrentUser, CurrentUser } from './authUser';

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
    throw UnauthorizedException('Authorization header is missing');
  }

  const token = authHeader.split(' ')[1]; // Bearerトークンを抽出

  // トークンを検証してユーザー情報を取得
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw UnauthorizedException(`authMiddleware -> Error: ${error?.message}`);
  }

  // ユーザー情報をcontextに保存
  c.set(CURRENT_USER_KEY, convertCurrentUser(data.user));

  // 次の処理へ進む
  await next();
};
