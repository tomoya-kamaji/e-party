import { IRoomDetailQuery, RoomDetailQueryResponse } from '@/server/domain/query/roomDetail';
import { prisma } from '@/server/util/prisma';

export const RoomDetailQuery: IRoomDetailQuery = {
  execute: async (roomId: string): Promise<RoomDetailQueryResponse> => {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        votes: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!room) {
      return {
        room: undefined,
      };
    }

    return {
      room: {
        id: room.id,
        name: room.name,
        status: room.status,
        ownerId: room.owner_id,
        createdAt: room.created_at,
        votes: room.votes.map((vote) => ({
          id: vote.id,
          userId: vote.user_id,
          userName: vote.user.name,
          userImageUrl: vote.user.image_url,
          value: vote.value ?? undefined,
          isRevealed: vote.is_revealed,
          isPaused: vote.is_paused,
        })),
      },
    };
  },
};
