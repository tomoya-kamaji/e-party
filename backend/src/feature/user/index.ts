// authors.ts
import { userRepository } from '@/infra/userRepository';
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { Hono } from 'hono';
import { getCurrentUserUseCase } from './useCase/currentUser';

const userApp = new Hono<AppContext>().get('/current', async (c) => {
  // ログインしているユーザーを取得
  const currentUser = c.get(CURRENT_USER_KEY);
  const result = await getCurrentUserUseCase(userRepository)(currentUser.id);
  return c.json(result);
});

export default userApp;
