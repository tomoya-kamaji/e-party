import { RoomStatus } from '@prisma/client';
import { v4 } from 'uuid';
import { createVoteEntity, VoteEntity } from './votes';

export interface RoomEntity {
  id: string;
  name: string;
  status: RoomStatus;
  ownerId: string;
  // 参加者分作る
  votes: VoteEntity[];
}

/**
 * 生成
 */
export const createRoomEntity = (params: { name: string; ownerId: string; participantIds: string[] }): RoomEntity => {
  const roomId = v4();
  return {
    id: roomId,
    name: params.name,
    status: RoomStatus.OPEN,
    ownerId: params.ownerId,
    votes: [createVoteEntity({ roomId: roomId, userId: params.ownerId })],
  };
};

/**
 * 再構成
 */
export const reconstructRoomEntity = (params: {
  id: string;
  name: string;
  status: RoomStatus;
  ownerId: string;
  votes: VoteEntity[];
}): RoomEntity => {
  return {
    id: params.id,
    name: params.name,
    status: params.status,
    ownerId: params.ownerId,
    votes: params.votes,
  };
};

/**
 * 参加者を追加
 * 投票を追加してから参加者を追加
 */
export const addParticipant =
  (room: RoomEntity) =>
  (participantId: string): RoomEntity => {
    return {
      ...room,
      votes: [...room.votes, createVoteEntity({ roomId: room.id, userId: participantId })],
    };
  };

/**
 * ルームを閉じる
 */
export const closeRoom = (room: RoomEntity): RoomEntity => {
  return {
    ...room,
    status: RoomStatus.CLOSED,
  };
};
