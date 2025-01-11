import { UserRepository } from '@/infra/userRepository';
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { Hono } from 'hono';
import { GetCurrentUserUseCase } from './useCase/currentUser';

/**
 * ユーザーAPI
 */
const userApp = new Hono<AppContext>()
  // ログインしているユーザーを取得
  .get('/current', async (c) => {
    const currentUser = c.get(CURRENT_USER_KEY);
    const result = await GetCurrentUserUseCase(UserRepository).execute(currentUser.id);
    return c.json(result);
  });

export default userApp;
