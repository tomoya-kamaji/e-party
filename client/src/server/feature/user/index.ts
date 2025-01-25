import { Hono } from 'hono';
import { GetCurrentUserUseCase } from './useCase/currentUser';
import { UserRepository } from '@/server/infra/userRepository';
import { AppContext, CURRENT_USER_KEY } from '@/server/middleware';

/**
 * ユーザー関連のAPI
 */
const userApp = new Hono<AppContext>().get('/current', async (c) => {
  const currentUser = c.get(CURRENT_USER_KEY);
  const result = await GetCurrentUserUseCase(UserRepository).execute(currentUser.id);
  return c.json(result);
});

export default userApp;
