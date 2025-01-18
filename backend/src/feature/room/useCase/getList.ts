import { IRoomRepository } from '@/domain/room/repository';
import { GetRoomListResponse } from '../response';

/**
 * 該当ユーザーのルーム一覧を取得する
 */
export const GetRoomListUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (userId: string): Promise<GetRoomListResponse> => {
    const rooms = await roomRepository.findByUserId(userId);
    if (!rooms) {
      throw new Error('Room not found');
    }
    return {
      rooms: rooms.map((room) => ({
        id: room.id,
        name: room.name,
        status: room.status,
        ownerId: room.ownerId,
        createdAt: room.createdAt.toISOString(),
      })),
    };
  },
});
