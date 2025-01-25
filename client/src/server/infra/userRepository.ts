import { UserEntity, reconstructUserEntity } from '../domain/user/user';
import { prisma } from '../util/prisma';

export const UserRepository = {
  async findById(id: string): Promise<UserEntity | undefined> {
    return prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .then((user) => {
        if (!user) {
          return undefined;
        }
        return reconstructUserEntity({
          id: user.id,
          name: user.name,
          email: user.email,
          imageUrl: user.image_url,
        });
      });
  },
};
