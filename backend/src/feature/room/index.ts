import { RoomDetailQuery } from '@/infra/query/roomDetail';
import { RoomRepository } from '@/infra/roomRepository';
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { CreateRoomUseCase, GetRoomListUseCase, RoomRevealUseCase } from './useCase';
import { RoomDetailUseCase } from './useCase/detail';
import { RoomResetUseCase } from './useCase/reset';
import { RoomVoteUseCase } from './useCase/vote';

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
  // ルーム詳細取得API
  .get('/:id', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    const res = await RoomDetailUseCase(RoomDetailQuery).execute(id);
    return c.json(res);
  })
  // ルーム全公開
  .patch('/:id/reveal', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    await RoomRevealUseCase(RoomRepository).execute(id);
    return c.json({ message: 'OK' });
  })
  // ルーム投票結果リセット
  .patch('/:id/reset', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    await RoomResetUseCase(RoomRepository).execute(id);
    return c.json({ message: 'OK' });
  })
  // 投票
  .post(
    '/:id/vote',
    zValidator('param', z.object({ id: z.string() })),
    zValidator('json', z.object({ value: z.number() })),
    async (c) => {
      const id = c.req.param('id');
      const currentUser = c.get(CURRENT_USER_KEY);
      const value = c.req.valid('json').value;

      await RoomVoteUseCase(RoomRepository).execute(id, currentUser.id, value);
      return c.json({ message: 'OK' });
    }
  )

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

      const res = await CreateRoomUseCase(RoomRepository).execute(name, currentUser.id);
      return c.json(res);
    }
  );

export default roomApp;
