// authors.ts
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { getPokerUseCase } from './useCase/get';

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
