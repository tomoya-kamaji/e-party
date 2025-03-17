import { Prisma } from '@prisma/client';
import { IRoomRepository, RoomEntity, reconstructRoomEntity, reconstructVoteEntity } from '../domain/room';
import { prisma } from '../util/prisma';
type RoomWithDetails = Prisma.RoomGetPayload<{
  include: {
    votes: true;
  };
}>;

export const RoomRepository: IRoomRepository = {
  async save(room: RoomEntity): Promise<RoomEntity> {
    // トランザクションを利用して Room、Topic、Votes を保存
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Room の upsert
      await tx.room.upsert({
        where: { id: room.id },
        update: {
          name: room.name,
          status: room.status,
          owner_id: room.ownerId,
        },
        create: {
          id: room.id,
          name: room.name,
          status: room.status,
          owner_id: room.ownerId,
          created_at: room.createdAt,
        },
      });

      console.log(room.votes);

      // Votes の保存
      await Promise.all(
        room.votes.map((vote) =>
          tx.vote.upsert({
            where: { id: vote.id },
            update: {
              value: vote.value ?? null,
              is_revealed: vote.isRevealed,
              is_paused: vote.isPaused,
            },
            create: {
              id: vote.id,
              room_id: vote.roomId,
              user_id: vote.userId,
              value: vote.value ?? null,
              is_revealed: vote.isRevealed,
              is_paused: vote.isPaused,
            },
          })
        )
      );
    });
    const savedRoom = await this.findById(room.id);
    if (!savedRoom) {
      throw new Error('Error: Room Create Failed');
    }
    return savedRoom;
  },

  async findById(roomId: string): Promise<RoomEntity | undefined> {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        votes: true,
      },
    });

    if (!room) {
      return undefined;
    }

    // Prismaから取得したデータをRoomEntityに変換
    return convertToRoomEntity(room);
  },

  async findByUserId(userId: string): Promise<RoomEntity[]> {
    const rooms = await prisma.room.findMany({
      where: { votes: { some: { user_id: userId } } },
      include: {
        votes: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return rooms.map((room) => convertToRoomEntity(room));
  },
};

const convertToRoomEntity = (room: RoomWithDetails): RoomEntity => {
  return reconstructRoomEntity({
    id: room.id,
    name: room.name,
    status: room.status,
    ownerId: room.owner_id,
    votes: room.votes.map((vote) =>
      reconstructVoteEntity({
        id: vote.id,
        roomId: vote.room_id,
        userId: vote.user_id,
        value: vote.value ?? undefined,
        isRevealed: vote.is_revealed,
        isPaused: vote.is_paused,
      })
    ),
    createdAt: room.created_at,
  });
};
