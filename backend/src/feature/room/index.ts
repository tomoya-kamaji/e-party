import { Hono } from 'hono';
import { getPokerUseCase } from './useCase';

const roomApp = new Hono().get('/', async (c) => {
  const res = await getPokerUseCase();
  return c.json(res);
});

export default roomApp;
