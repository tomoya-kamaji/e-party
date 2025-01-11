import { RoomRepository } from '@/infra/roomRepository';
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { createRoomUseCase } from './useCase/create';

// ルームを作成する
const createRoomSchema = z.object({
  name: z.string().optional(),
});

/**
 * ルームAPI
 */
const roomApp = new Hono<AppContext>().post('/', zValidator('json', createRoomSchema), async (c) => {
  const { name } = c.req.valid('json');
  const currentUser = c.get(CURRENT_USER_KEY);

  const res = await createRoomUseCase(RoomRepository).execute(name || '', currentUser.id);
  return c.json(res);
});

export default roomApp;
