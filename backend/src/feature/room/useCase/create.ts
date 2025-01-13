import { IRoomRepository } from '@/domain/room/repository';
import { createRoomEntity } from '@/domain/room/room';
import { RoomStatus } from '@prisma/client';

interface CreateRoomResponse {
  room: {
    id: string;
    name: string;
    status: RoomStatus;
    ownerId: string;
    createdAt: Date;
  };
}

/**
 * 部屋を作成する
 */
export const CreateRoomUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (name: string | undefined, ownerId: string): Promise<CreateRoomResponse> => {
    const room = createRoomEntity({
      name: name,
      ownerId: ownerId,
      participantIds: [ownerId],
    });

    await roomRepository.save(room);
    return {
      room: {
        id: room.id,
        name: room.name,
        status: room.status,
        ownerId: room.ownerId,
        createdAt: room.createdAt,
      },
    };
  },
});
