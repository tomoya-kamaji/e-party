import { Hono } from 'hono';
import { GetCurrentUserUseCase } from './useCase/currentUser';

/**
 * テスト用のAPI
 */
const userApp = new Hono().get('/current', async (c) => {
  const result = await GetCurrentUserUseCase().execute('1');
  return c.json(result);
});

export default userApp;
