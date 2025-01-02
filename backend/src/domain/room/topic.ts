import { TopicStatus } from '@prisma/client';
import { v4 } from 'uuid';
import { createVoteEntity, VoteEntity } from './votes';

/**
 * トピック
 */
export interface TopicEntity {
  id: string;
  status: TopicStatus;
  votes: VoteEntity[];
}

/**
 * 生成
 * 参加者の数だけ投票を生成
 */
export const createTopicEntity = (participantIds: string[]): TopicEntity => {
  const topicId = v4();
  return {
    id: topicId,
    status: TopicStatus.IN_PROGRESS,
    votes: participantIds.map((participantId) => createVoteEntity({ topicId, userId: participantId, value: '' })),
  };
};

/**
 * 再構成
 */
export const reconstructTopicEntity = (params: { id: string; status: TopicStatus }): TopicEntity => {
  return {
    id: params.id,
    status: params.status,
    votes: [],
  };
};

/**
 * 投票を追加
 * 参加者の数だけ投票を生成
 */
export const addVote =
  (topic: TopicEntity) =>
  (participantId: string): TopicEntity => {
    return {
      ...topic,
      votes: [...topic.votes, createVoteEntity({ topicId: topic.id, userId: participantId, value: '' })],
    };
  };