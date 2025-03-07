import { RoomStatus } from '@prisma/client';

export interface RoomDetailQueryResponse {
  room:
    | {
        id: string;
        name: string;
        status: RoomStatus;
        ownerId: string;
        createdAt: Date;
        votes: {
          id: string;
          userId: string;
          userName: string;
          userImageUrl: string;
          value: number | undefined;
          isRevealed: boolean;
          isPaused: boolean;
        }[];
      }
    | undefined;
}

export interface IRoomDetailQuery {
  execute: (roomId: string) => Promise<RoomDetailQueryResponse>;
}
