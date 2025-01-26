import { IRoomRepository, createRoomEntity } from '@/server/domain/room';
import { CreateRoomResponse } from '../response';

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
        createdAt: room.createdAt.toISOString(),
      },
    };
  },
});
