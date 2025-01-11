import { v4 } from 'uuid';

export interface VoteEntity {
  id: string;
  roomId: string;
  userId: string;
  value: string;
  isRevealed: boolean;
}

/**
 * 生成
 */
export const createVoteEntity = (params: { roomId: string; userId: string; value: string }): VoteEntity => {
  return {
    id: v4(),
    roomId: params.roomId,
    userId: params.userId,
    value: params.value,
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
  value: string;
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
    value: '',
    isRevealed: false,
  };
};
