import { IRoomRepository, removeParticipant } from '@/server/domain/room';

/**
 * ルーム
 */
export const RoomLeaveUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (roomId: string, participantId: string): Promise<void> => {
    const room = await roomRepository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // 自分の投票をリセットする
    const joinedRoom = removeParticipant(room)(participantId);
    await roomRepository.save(joinedRoom);
  },
});
