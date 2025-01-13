import { IRoomRepository } from '@/domain/room/repository';
import { revealVotes } from '@/domain/room/room';


/**
 * 投票を全公開するユースケース
 */
export const RoomRevealUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (id: string): Promise<void> => {
    const room = await roomRepository.findById(id);
    if (!room) {
      throw new Error('Room not found');
    }

    // 投票を全公開
    const revealedRoom = revealVotes(room);
    await roomRepository.save(revealedRoom);
  },
});
