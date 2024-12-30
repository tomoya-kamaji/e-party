// authors.ts
import { getPokerUseCase } from '@/feature/poker/useCase/get';
import { AppContext } from '@/middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const pokerApp = new Hono<AppContext>().get(
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
