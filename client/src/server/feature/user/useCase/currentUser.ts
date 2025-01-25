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
export const GetCurrentUserUseCase = () => ({
  execute: async (userId: string): Promise<Response> => {
    return {
      user: {
        id: '1',
        name: 'test',
        email: 'test@example.com',
        imageUrl: 'https://example.com/image.jpg',
      },
    };
  },
});
