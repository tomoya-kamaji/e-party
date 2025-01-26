import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { CreateRoomResponse, GetRoomListResponse, RoomDetailResponse } from './response';
import {
  CreateRoomUseCase,
  GetRoomListUseCase,
  RoomDetailUseCase,
  RoomJoinUseCase,
  RoomResetAllUseCase,
  RoomResetCurrentVoteUseCase,
  RoomRevealUseCase,
  RoomVoteUseCase,
} from './useCase';
import { AppContext, CURRENT_USER_KEY } from '@/server/middleware';
import { RoomDetailQuery } from '@/server/infra/query/roomDetail';
import { RoomRepository } from '@/server/infra/roomRepository';

/**
 * ルームAPI
 */
const roomApp = new Hono<AppContext>()
  // ルーム一覧取得API
  .get('', async (c) => {
    const currentUser = c.get(CURRENT_USER_KEY);
    const res = await GetRoomListUseCase(RoomRepository).execute(currentUser.id);
    return c.json<GetRoomListResponse>(res);
  })
  // ルーム詳細取得
  .get('/:id', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    const res = await RoomDetailUseCase(RoomDetailQuery).execute(id);
    return c.json<RoomDetailResponse>(res);
  })
  // 投票全公開
  .patch('/:id/reveal', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    await RoomRevealUseCase(RoomRepository).execute(id);
    return c.json({ message: 'OK' });
  })
  // 投票結果リセット
  .patch('/:id/reset', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    await RoomResetAllUseCase(RoomRepository).execute(id);
    return c.json({ message: 'OK' });
  })

  // 自分の投票をリセット
  .patch('/:id/reset/current', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    const currentUser = c.get(CURRENT_USER_KEY);
    await RoomResetCurrentVoteUseCase(RoomRepository).execute(id, currentUser.id);
    return c.json({ message: 'OK' });
  })
  // 投票
  .patch(
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
  // ルームに参加
  .patch('/:id/join', zValidator('param', z.object({ id: z.string() })), async (c) => {
    const id = c.req.param('id');
    const currentUser = c.get(CURRENT_USER_KEY);
    await RoomJoinUseCase(RoomRepository).execute(id, currentUser.id);
    return c.json({ message: 'OK' });
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

      const res = await CreateRoomUseCase(RoomRepository).execute(name, currentUser.id);
      return c.json<CreateRoomResponse>(res);
    }
  );

export default roomApp;
