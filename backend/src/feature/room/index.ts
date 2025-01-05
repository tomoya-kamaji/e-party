import { RoomRepository } from '@/infra/roomRepository';
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { createRoomUseCase } from './useCase';

const postBodySchema = z.object({
  roomName: z.string().max(40),
});

const roomApp = new Hono<AppContext>()
  // ルーム一覧を取得
  .get('/', async (c) => {
    return c.json({ message: 'TODO' });
  })

  // ルームを作成
  .post('/', zValidator('json', postBodySchema), async (c) => {
    const currentUser = c.get(CURRENT_USER_KEY);
    const { roomName } = c.req.valid('json');

    const result = await createRoomUseCase(RoomRepository).execute(roomName, currentUser.id);
    return c.json(result);
  });

export default roomApp;
