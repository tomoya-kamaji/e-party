import { IRoomRepository } from '@/domain/room/repository';
import { RoomEntity } from '@/domain/room/room';
import { prisma } from '@/util/prisma';

export const roomRepository: IRoomRepository = {
  async save(room: RoomEntity): Promise<RoomEntity> {
    // トランザクションを利用して Room、Topic、Votes を保存
    return await prisma.$transaction(async (tx) => {
      // Room の upsert
      const savedRoom = await tx.room.upsert({
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
      const savedTopic = await tx.topic.upsert({
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
      const savedVotes = await Promise.all(
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
        topics: {
          include: {
            votes: true, // 各トピックに紐づく投票を取得
          },
        },
      },
    });

    if (!room) {
      return undefined;
    }

    // Prismaから取得したデータをRoomEntityに変換
    return {
      id: room.id,
      name: room.name,
      status: room.status,
      ownerId: room.owner_id,
      participantIds: room.room_user.map((user) => user.user.id), // 参加者IDリスト
      topic: room.topics.map((topic) => ({
        id: topic.id,
        status: topic.status,
        votes: topic.votes.map((vote) => ({
          id: vote.id,
          topicId: vote.topicId,
          userId: vote.userId,
          value: vote.value,
          isRevealed: vote.isRevealed,
        })),
      }))[0], // 1つ目のトピックを返す (シングルの場合)
    };
  },
};
