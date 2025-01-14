import { IRoomRepository } from '@/domain/room/repository';
import { roomVote } from '@/domain/room/room';

/**
 * 投票するユースケース
 */
export const RoomVoteUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (roomId: string, userId: string, value: number): Promise<void> => {
    const room = await roomRepository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // 投票する
    const votedRoom = roomVote(room, userId, Number(value));
    await roomRepository.save(votedRoom);
  },
});
