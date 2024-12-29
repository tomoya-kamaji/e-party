// authors.ts
import { getPokerUseCase } from '@/feature/poker/useCase/get';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const pokerApp = new Hono().get(
  '/',
  zValidator(
    'query',
    z.object({
      teamId: z.string().optional(),
    })
  ),
  async (c) => {
    const res = await getPokerUseCase();
    return c.json(res);
  }
);

export default pokerApp;
