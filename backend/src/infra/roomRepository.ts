import { IRoomRepository } from '@/domain/room/repository';
import { reconstructRoomEntity, RoomEntity } from '@/domain/room/room';
import { reconstructTopicEntity } from '@/domain/room/topic';
import { reconstructVoteEntity } from '@/domain/room/votes';
import { prisma } from '@/util/prisma';
import { Prisma } from '@prisma/client';
type RoomWithDetails = Prisma.RoomGetPayload<{
  include: {
    room_user: {
      include: {
        user: true;
      };
    };
    topic: {
      include: {
        votes: true;
      };
    };
  };
}>;

export const RoomRepository: IRoomRepository = {
  async save(room: RoomEntity): Promise<RoomEntity> {
    // トランザクションを利用して Room、Topic、Votes を保存
    await prisma.$transaction(async (tx) => {
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
        },
      });

      // Topic の upsert
      await tx.topic.upsert({
        where: { id: room.topic.id },
        update: {
          status: room.topic.status,
        },
        create: {
          id: room.topic.id,
          room_id: room.id,
          status: room.topic.status,
        },
      });

      // Votes の保存
      await Promise.all(
        room.topic.votes.map((vote) =>
          tx.vote.upsert({
            where: { id: vote.id },
            update: {
              value: vote.value,
              is_revealed: vote.isRevealed,
            },
            create: {
              id: vote.id,
              topic_id: vote.topicId,
              user_id: vote.userId,
              value: vote.value,
              is_revealed: vote.isRevealed,
            },
          })
        )
      );
    });
    const savedRoom = await this.findById(room.id);
    if (!savedRoom) {
      throw new Error('Room not found');
    }
    return savedRoom;
  },

  async findById(roomId: string): Promise<RoomEntity | undefined> {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        room_user: {
          include: {
            user: true,
          },
        },
        topic: {
          include: {
            votes: true,
          },
        },
      },
    });

    if (!room || !room.topic) {
      return undefined;
    }

    // Prismaから取得したデータをRoomEntityに変換
    return convertToRoomEntity(room);
  },

  async findByUserId(userId: string): Promise<RoomEntity[]> {
    const rooms = await prisma.room.findMany({
      where: { room_user: { some: { user_id: userId } } },
      include: {
        room_user: {
          include: {
            user: true,
          },
        },
        topic: {
          include: {
            votes: true,
          },
        },
      },
    });
    return rooms.map((room) => convertToRoomEntity(room));
  },
};

const convertToRoomEntity = (room: RoomWithDetails): RoomEntity => {
  if (!room.topic) {
    throw new Error('Topic is null');
  }
  return reconstructRoomEntity({
    id: room.id,
    name: room.name,
    status: room.status,
    ownerId: room.owner_id,
    participantIds: room.room_user.map((user) => user.user.id),
    topic: reconstructTopicEntity({
      id: room.topic.id,
      status: room.topic.status,
      votes: room.topic.votes.map((vote) =>
        reconstructVoteEntity({
          id: vote.id,
          topicId: vote.topic_id,
          userId: vote.user_id,
          value: vote.value ?? '',
          isRevealed: vote.is_revealed,
        })
      ),
    }),
  });
};
