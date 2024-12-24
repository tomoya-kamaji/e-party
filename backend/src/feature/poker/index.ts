// authors.ts
import { Hono } from 'hono';
import { getPokerUseCase } from './useCase/get';

const pokerApp = new Hono().get('/', async (c) => {
  const res = await getPokerUseCase();
  return c.json(res);
});

export default pokerApp;
