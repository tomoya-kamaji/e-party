import { serve } from '@hono/node-server';
import 'dotenv/config';
import { Hono } from 'hono';
import pokerApp from './feature/poker';
import userApp from './feature/user';
import { authMiddleware, loggingMiddleware, originMiddleware } from './middleware';

const app = new Hono()
  .basePath('/api')
  .use('*', originMiddleware)
  .use('*', loggingMiddleware)
  .get('/health', (c) => c.json('ok'))
  // 認証ミドルウェア
  .use('*', authMiddleware)
  .route('/pokers', pokerApp)
  .route('/users', userApp);

// サーバー起動
const port = 3000;
serve({
  fetch: app.fetch,
  port,
});
console.log(`Server is running on ${port}`);

export type HonoAppType = typeof app;

export default app;
