import { RoomStatus } from '@prisma/client';
import { v4 } from 'uuid';
import { VoteEntity, createVoteEntity, revealVote, resetVote, voteValue, pauseVote, resumeVote } from './votes';

/**
 * 日付をYYYYMMDD形式にフォーマットする
 */
export const formatDateForDisplay = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString('ja-JP', options);
};

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
  // 日付を名前にする
  const name = params.name ? params.name : `R-${formatDateForDisplay(new Date())}`;
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
    // 参加者が既にいる場合はエラーを返す
    if (room.votes.some((vote) => vote.userId === participantId)) {
      throw new Error('Participant already exists');
    }

    return {
      ...room,
      votes: [...room.votes, createVoteEntity({ roomId: room.id, userId: participantId })],
    };
  };

/**
 * 参加者を削除
 */
export const removeParticipant =
  (room: RoomEntity) =>
  (participantId: string): RoomEntity => {
    return {
      ...room,
      votes: room.votes.filter((vote) => vote.userId !== participantId),
    };
  };

export const closeRoom = (room: RoomEntity): RoomEntity => {
  return {
    ...room,
    status: RoomStatus.CLOSED,
  };
};

/**
 * 投票を全公開
 */
export const revealAllVotes = (room: RoomEntity): RoomEntity => {
  return {
    ...room,
    votes: room.votes.map(revealVote),
  };
};

/**
 * 投票をリセット
 */
export const resetAllVotes = (room: RoomEntity): RoomEntity => {
  return {
    ...room,
    votes: room.votes.map(resetVote),
  };
};

/**
 * 投票をリセット
 */
export const resetCurrentVote = (room: RoomEntity, userId: string): RoomEntity => {
  // 自分の投票を取得
  const v = room.votes.find((vote) => vote.userId === userId);
  if (!v) {
    // TODO: エラーを返す
    throw new Error('resetCurrentVote: Vote not found');
  }

  return {
    ...room,
    votes: [...room.votes.filter((vote) => vote.userId !== userId), resetVote(v)],
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
    throw new Error('roomVote: Vote not found');
  }
  const votedVote = voteValue(v, value);
  return {
    ...room,
    votes: [...room.votes.filter((vote) => vote.userId !== userId), votedVote],
  };
};

/**
 * 投票を休止状態を切り替える
 */
export const roomSwitchPaused = (room: RoomEntity, voteId: string, isPaused: boolean): RoomEntity => {
  const v = room.votes.find((vote) => vote.id === voteId);
  if (!v) {
    // TODO: エラーを返す
    throw new Error('roomSwitchPaused: Vote not found');
  }
  const updatedVote = isPaused ? pauseVote(v) : resumeVote(v);
  return {
    ...room,
    votes: [...room.votes.filter((vote) => vote.id !== voteId), updatedVote],
  };
};
