import { IRoomRepository, roomSwitchPaused } from '@/server/domain/room';

/**
 * ルームの投票休止状態を切り替えるユースケース
 */
export const RoomSwitchPausedUseCase = (roomRepository: IRoomRepository) => ({
  execute: async (roomId: string, participantId: string, isPaused: boolean): Promise<void> => {
    const room = await roomRepository.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    // 自分の投票をリセットする
    const switchedRoom = roomSwitchPaused(room, participantId, isPaused);
    await roomRepository.save(switchedRoom);
  },
});
