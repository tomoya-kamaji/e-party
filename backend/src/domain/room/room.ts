import { RoomStatus } from '@prisma/client';
import { v4 } from 'uuid';
import { createVoteEntity, resetVote, revealVote, VoteEntity, voteValue } from './votes';

export interface RoomEntity {
  id: string;
  name: string;
  status: RoomStatus;
  ownerId: string;
  // 参加者分作る
  votes: VoteEntity[];
  createdAt: Date;
}

/**
 * 生成
 */
export const createRoomEntity = (params: { name?: string; ownerId: string; participantIds: string[] }): RoomEntity => {
  // もしもnameがなかったら、タイムスタンプを名前にする
  const name = params.name ? params.name : `Room-${new Date().getTime()}`;
  const roomId = v4();
  return {
    id: roomId,
    name,
    status: RoomStatus.OPEN,
    ownerId: params.ownerId,
    votes: [createVoteEntity({ roomId: roomId, userId: params.ownerId })],
    createdAt: new Date(),
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
  createdAt: Date;
}): RoomEntity => {
  return {
    id: params.id,
    name: params.name,
    status: params.status,
    ownerId: params.ownerId,
    votes: params.votes,
    createdAt: params.createdAt,
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

/**
 * 投票を全公開
 */
export const revealVotes = (room: RoomEntity): RoomEntity => {
  return {
    ...room,
    votes: room.votes.map(revealVote),
  };
};

/**
 * 投票をリセット
 */
export const resetVotes = (room: RoomEntity): RoomEntity => {
  return {
    ...room,
    votes: room.votes.map(resetVote),
  };
};

/**
 * 投票する
 */
export const roomVote = (room: RoomEntity, userId: string, value: number): RoomEntity => {
  // 自身の投票を取得
  const v = room.votes.find((vote) => vote.userId === userId);
  if (!v) {
    // TODO: エラーを返す
    throw new Error('Vote not found');
  }
  const votedVote = voteValue(v, value);
  return {
    ...room,
    votes: [...room.votes.filter((vote) => vote.userId !== userId), votedVote],
  };
};
