interface GetPoker {
  id: string;
  name: string;
}

/**
 * ポーカーを取得する
 */
const getPokerUseCase = async (): Promise<GetPoker[]> => {
  return [
    {
      id: '1',
      name: 'Fibonacci',
    },
  ];
};

export { getPokerUseCase };
