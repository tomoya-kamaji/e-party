import { User } from '@supabase/supabase-js';
import { Context } from 'hono';

export interface CurrentUser {
  id: string;
  email: string;
}

export const convertCurrentUser = (user: User): CurrentUser => {
  return {
    id: user.id,
    email: user.email || '',
  };
};

/**
 * Contextにユーザー情報をセットする関数
 */
export const setUserToContext = (c: Context, user: CurrentUser) => {
  c.set('user', user);
};

/**
 * Contextからユーザー情報を取得する関数
 */
export const getUserFromContext = (c: Context): CurrentUser | undefined => {
  return c.get('user');
};
