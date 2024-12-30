interface CurrentUser {
  id: string;
  name: string;
}

/**
 * 現在のログインしているユーザーを取得するユースケース
 */
export const getCurrentUserUseCase = async (): Promise<CurrentUser> => {
  return {
    id: '1',
    name: 'Fibonacci',
  };
};
