import { RoomRepository } from '@/infra/roomRepository';
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { CreateRoomUseCase, GetRoomListUseCase } from './useCase';

/**
 * ルームAPI
 */
const roomApp = new Hono<AppContext>()
  // ルーム一覧取得API
  .get('', async (c) => {
    const currentUser = c.get(CURRENT_USER_KEY);
    const res = await GetRoomListUseCase(RoomRepository).execute(currentUser.id);
    return c.json(res);
  })
  // ルーム作成API
  .post(
    '',
    zValidator(
      'json',
      z.object({
        name: z.string().optional(),
      })
    ),
    async (c) => {
      const { name } = c.req.valid('json');
      const currentUser = c.get(CURRENT_USER_KEY);

      const res = await CreateRoomUseCase(RoomRepository).execute(name || '', currentUser.id);
      return c.json(res);
    }
  );

export default roomApp;
