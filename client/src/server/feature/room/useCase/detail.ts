import { IRoomDetailQuery } from '@/server/domain/query/roomDetail';
import { RoomDetailResponse } from '../response';

/**
 * ルーム詳細を取得するユースケース
 */
export const RoomDetailUseCase = (roomDetailQuery: IRoomDetailQuery) => ({
  execute: async (id: string): Promise<RoomDetailResponse> => {
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
        votes: room.room.votes.map((vote) => ({
          id: vote.id,
          userId: vote.userId,
          userName: vote.userName,
          userImageUrl: vote.userImageUrl,
          value: vote.value ?? null,
          isRevealed: vote.isRevealed,
        })),
      },
    };
  },
});
