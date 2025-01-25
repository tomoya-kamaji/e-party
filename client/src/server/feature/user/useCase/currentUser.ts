import { IUserRepository } from '@/server/domain/user';

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
export const GetCurrentUserUseCase = (userRepository: IUserRepository) => ({
  execute: async (userId: string): Promise<Response> => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
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
