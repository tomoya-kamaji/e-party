import { reconstructUserEntity, UserEntity } from '@/domain/user';
import { IUserRepository } from '@/domain/user/repository';
import { prisma } from '@/util/prisma';

const userRepository: IUserRepository = {
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

export { userRepository };
