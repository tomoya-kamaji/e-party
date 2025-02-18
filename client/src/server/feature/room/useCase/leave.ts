import { IRoomRepository, addParticipant, removeParticipant } from '@/server/domain/room';

/**
 * ルーム
 */
export const RoomLeaveUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (roomId: string, userId: string): Promise<void> => {
    const room = await roomRepository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // 自分の投票をリセットする
    const joinedRoom = removeParticipant(room)(userId);
    await roomRepository.save(joinedRoom);
  },
});
