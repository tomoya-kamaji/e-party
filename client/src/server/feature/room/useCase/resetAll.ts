import { IRoomRepository, resetAllVotes } from '@/server/domain/room';

/**
 * 投票結果をリセットするユースケース
 */
export const RoomResetAllUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (id: string): Promise<void> => {
    const room = await roomRepository.findById(id);
    if (!room) {
      throw new Error('Room not found');
    }

    const resetRoom = resetAllVotes(room);
    await roomRepository.save(resetRoom);
  },
});
