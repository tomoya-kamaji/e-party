// authors.ts
import { Hono } from 'hono';
import { getPokerUseCase } from '../poker/useCase/get';

const userApp = new Hono().get('/current', async (c) => {
  const res = await getPokerUseCase();
  return c.json(res);
});

export default userApp;
