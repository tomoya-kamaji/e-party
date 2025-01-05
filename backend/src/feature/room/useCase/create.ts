import { IRoomRepository } from '@/domain/room/repository';
import { createRoomEntity, RoomEntity } from '@/domain/room/room';

interface Result {
  room: {
    id: string;
    name: string;
    ownerId: string;
  };
}

/**
 * ルームを作成する
 */
export const createRoomUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (name: string, ownerId: string): Promise<Result> => {
    const room = createRoomEntity({
      name,
      ownerId,
      participantIds: [ownerId],
    });
    const savedRoom = await roomRepository.save(room);
    return convertToResult(savedRoom);
  },
});

const convertToResult = (room: RoomEntity): Result => {
  return {
    room: {
      id: room.id,
      name: room.name,
      ownerId: room.ownerId,
    },
  };
};
