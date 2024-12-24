import { serve } from '@hono/node-server'; // サーバー起動用モジュールをインポート
import { Hono } from 'hono';
import pokerApp from './feature/poker';

// const app = new Hono().basePath('/api');

const app = new Hono().route('/pokers', pokerApp).route('/authors', pokerApp);

// サーバー起動
serve(app);

export type AppType = typeof app;

export default app;
