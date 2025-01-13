import { IRoomDetailQuery } from '@/domain/query/roomDetail';
import { RoomStatus } from '@prisma/client';

interface RoomDetailUseCaseResponse {
  room: {
    id: string;
    name: string;
    status: RoomStatus;
    ownerId: string;
    createdAt: string;
    votes: {
      id: string;
      userId: string;
      userName: string;
      userImageUrl: string;
      value: number | undefined;
      isRevealed: boolean;
    }[];
  };
}

/**
 * ルーム詳細を取得するユースケース
 */
export const RoomDetailUseCase = (roomDetailQuery: IRoomDetailQuery) => ({
  execute: async (id: string): Promise<RoomDetailUseCaseResponse> => {
    const room = await roomDetailQuery.execute(id);
    if (!room.room) {
      throw new Error('Room not found');
    }
    return {
      room: {
        id: room.room.id,
        name: room.room.name,
        status: room.room.status,
        ownerId: room.room.ownerId,
        createdAt: room.room.createdAt.toISOString(),
        votes: room.room.votes,
      },
    };
  },
});
