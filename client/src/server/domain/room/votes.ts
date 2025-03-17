import { v4 } from 'uuid';

export interface VoteEntity {
  id: string;
  roomId: string;
  userId: string;
  value?: number;
  isRevealed: boolean;
  isPaused: boolean;
}

/**
 * 生成
 */
export const createVoteEntity = (params: { roomId: string; userId: string }): VoteEntity => {
  return {
    id: v4(),
    roomId: params.roomId,
    userId: params.userId,
    isRevealed: false,
    isPaused: false,
  };
};

/**
 * 再構成
 */
export const reconstructVoteEntity = (params: {
  id: string;
  roomId: string;
  userId: string;
  value?: number;
  isRevealed: boolean;
  isPaused: boolean;
}): VoteEntity => {
  return {
    id: params.id,
    roomId: params.roomId,
    userId: params.userId,
    value: params.value,
    isRevealed: params.isRevealed,
    isPaused: params.isPaused,
  };
};

/**
 * 投票する
 */
export const voteValue = (vote: VoteEntity, value: number): VoteEntity => {
  return {
    ...vote,
    value,
  };
};

/**
 * 公開
 */
export const revealVote = (vote: VoteEntity): VoteEntity => {
  return {
    ...vote,
    isRevealed: true,
  };
};

/**
 * 投票結果をリセット
 */
export const resetVote = (vote: VoteEntity): VoteEntity => {
  return {
    ...vote,
    value: undefined,
    isRevealed: false,
  };
};

/**
 * 投票を休止
 */
export const pauseVote = (vote: VoteEntity): VoteEntity => {
  return {
    ...vote,
    isPaused: true,
  };
};

/**
 * 投票を再開
 */
export const resumeVote = (vote: VoteEntity): VoteEntity => {
  return {
    ...vote,
    isPaused: false,
  };
};
