import { IUserRepository } from '@/domain/user/repository';
import { UnauthorizedException } from '@/util/exception';

interface Response {
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
}

/**
 * 現在のログインしているユーザーを取得するユースケース
 */
export const getCurrentUserUseCase = (userRepository: IUserRepository) => ({
  execute: async (userId: string): Promise<Response> => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw UnauthorizedException('User not found');
    }
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
    };
  },
});
