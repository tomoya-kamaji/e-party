import { serve } from '@hono/node-server'; // サーバー起動用モジュールをインポート
import { Hono } from 'hono';

// const app = new Hono().basePath('/api');

const app = new Hono().get('/hello2', (c) => c.text('Hono!'));

// ユーザー作成エンドポイント
// app.post(
//   '/users',
//   zValidator(
//     'json',
//     z.object({
//       googleId: z.string(),
//       name: z.string(),
//       email: z.string().email(),
//     })
//   ),
//   async (c) => {
//     const { googleId, name, email } = c.req.valid('json');
//     const user = { googleId, name, email };
//     // データベースに保存する処理を追加
//     return c.json(user, 201);
//   }
// );

// サーバー起動
serve(app);

export type AppType = typeof app;
export default app;
