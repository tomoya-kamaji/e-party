import { IRoomRepository } from '@/domain/room/repository';
import { resetCurrentVote } from '@/domain/room/room';

/**
 * 投票をリセットするユースケース
 */
export const RoomResetCurrentVoteUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (roomId: string, userId: string): Promise<void> => {
    const room = await roomRepository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // 自分の投票をリセットする
    const resetRoom = resetCurrentVote(room, userId);
    await roomRepository.save(resetRoom);
  },
});
