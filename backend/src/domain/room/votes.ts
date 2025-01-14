import { v4 } from 'uuid';

export interface VoteEntity {
  id: string;
  roomId: string;
  userId: string;
  value?: number;
  isRevealed: boolean;
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
}): VoteEntity => {
  return {
    id: params.id,
    roomId: params.roomId,
    userId: params.userId,
    value: params.value,
    isRevealed: params.isRevealed,
  };
};

/**
 * 投票する
 */
export const voteValue = (vote: VoteEntity, value: number): VoteEntity => {
  return {
    ...vote,
    value: vote.value,
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
    value: 0,
    isRevealed: false,
  };
};
