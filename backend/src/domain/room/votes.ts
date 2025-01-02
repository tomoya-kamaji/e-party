import { v4 } from 'uuid';

export interface VoteEntity {
  id: string;
  topicId: string;
  userId: string;
  value: string;
  isRevealed: boolean;
}

/**
 * 生成
 */
export const createVoteEntity = (params: { topicId: string; userId: string; value: string }): VoteEntity => {
  return {
    id: v4(),
    topicId: params.topicId,
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
  topicId: string;
  userId: string;
  value: string;
  isRevealed: boolean;
}): VoteEntity => {
  return {
    id: params.id,
    topicId: params.topicId,
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
