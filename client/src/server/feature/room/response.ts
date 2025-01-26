import { z } from 'zod';

const roomStatusSchema = z.enum(['OPEN', 'CLOSED']);

const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: roomStatusSchema,
  ownerId: z.string(),
  createdAt: z.string(),
});

export const createRoomResponseSchema = z.object({
  room: roomSchema,
});

export type CreateRoomResponse = z.infer<typeof createRoomResponseSchema>;

export const getRoomListResponseSchema = z.object({
  rooms: z.array(roomSchema),
});

export type GetRoomListResponse = z.infer<typeof getRoomListResponseSchema>;

const voteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userImageUrl: z.string(),
  value: z.number().nullable(),
  isRevealed: z.boolean(),
});

const roomDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: roomStatusSchema,
  ownerId: z.string(),
  createdAt: z.string(),
  votes: z.array(voteSchema),
});

export const roomDetailResponseSchema = z.object({
  room: roomDetailSchema,
});

export type RoomDetailResponse = z.infer<typeof roomDetailResponseSchema>;
