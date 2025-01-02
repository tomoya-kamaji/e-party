import { UserEntity } from '@/domain/user';
import { TopicEntity } from '@/domain/topic';
import {
    
  } from '@prisma/client';

export interface RoomEntity {
  id: string;
  name: string;
  status: RoomStatus;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  topics: Topic[];
  users: UserEntity[];
}
