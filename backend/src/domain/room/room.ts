import { RoomStatus } from '@prisma/client';
import { v4 } from 'uuid';
import { addVote, createTopicEntity, TopicEntity } from './topic';

export interface RoomEntity {
  id: string;
  name: string;
  status: RoomStatus;
  topic: TopicEntity;
  ownerId: string;
  // 参加者
  participantIds: string[];
}

/**
 * 生成
 */
export const createRoomEntity = (params: {
  name: string;
  ownerId: string;
  participantIds: string[];
}): RoomEntity => {
  return {
    id: v4(),
    name: params.name,
    status: RoomStatus.OPEN,
    topic: createTopicEntity(params.participantIds),
    ownerId: params.ownerId,
    participantIds: params.participantIds,
  };
};

/**
 * 再構成
 */
export const reconstructRoomEntity = (params: {
  id: string;
  name: string;
  status: RoomStatus;
  topic: TopicEntity;
  ownerId: string;
  participantIds: string[];
}): RoomEntity => {
  return {
    id: params.id,
    name: params.name,
    status: params.status,
    topic: params.topic,
    ownerId: params.ownerId,
    participantIds: params.participantIds,
  };
};

/**
 * 参加者を追加
 * 投票を追加してから参加者を追加
 */
export const addParticipant =
  (room: RoomEntity) =>
  (participantId: string): RoomEntity => {
    const topic = addVote(room.topic)(participantId);
    return {
      ...room,
      topic,
      participantIds: [...room.participantIds, participantId],
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
