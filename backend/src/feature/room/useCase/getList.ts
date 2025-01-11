import { IRoomRepository } from '@/domain/room/repository';
import { RoomStatus } from '@prisma/client';

interface GetRoomResponse {
  rooms: {
    id: string;
    name: string;
    status: RoomStatus;
    ownerId: string;
  }[];
}

/**
 * 該当ユーザーのルーム一覧を取得する
 */
export const GetRoomListUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (userId: string): Promise<GetRoomResponse> => {
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
      })),
    };
  },
});
