import { IRoomRepository } from '@/domain/room/repository';
import { resetVotes } from '@/domain/room/room';

/**
 * 投票結果をリセットするユースケース
 */
export const RoomResetUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (id: string): Promise<void> => {
    const room = await roomRepository.findById(id);
    if (!room) {
      throw new Error('Room not found');
    }

    const resetRoom = resetVotes(room);
    await roomRepository.save(resetRoom);
  },
});
