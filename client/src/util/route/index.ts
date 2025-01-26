const PATH_PAGE = {
  // ホーム
  home: '/home',
  // ログイン
  login: '/login',
  // お問い合わせ
  contact: '/contact',

  // ルーム詳細
  room: '/room',
  roomDetail: (id: string) => `/room/${id}`,
};

export { PATH_PAGE };
