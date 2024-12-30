import { IUserRepository } from '@/domain/user/repository';

interface Result {
  user: {
    id: string;
    name: string;
  };
}

/**
 * 現在のログインしているユーザーを取得するユースケース
 */
export const getCurrentUserUseCase =
  (userRepository: IUserRepository) =>
  async (userId: string): Promise<Result> => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      user: {
        id: user.id,
        name: user.name,
      },
    };
  };
