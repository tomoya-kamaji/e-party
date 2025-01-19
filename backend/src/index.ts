import { serve } from '@hono/node-server';
import 'dotenv/config';
import { Hono } from 'hono';
import { hc } from 'hono/client';
import roomApp from './feature/room';
import userApp from './feature/user';
import { authMiddleware, loggingMiddleware, originMiddleware } from './middleware';
import { errorMiddleware } from './middleware/exception';

const app = new Hono()
  .basePath('/api')
  .onError(errorMiddleware)
  .use('*', originMiddleware)
  .use('*', loggingMiddleware)
  .get('/health', (c) => c.json('ok'))
  // 認証ミドルウェア
  .use('*', authMiddleware)
  .route('/users', userApp)
  .route('/rooms', roomApp);

// サーバー起動
const port = 3000;
serve({
  fetch: app.fetch,
  port,
});
console.log(`Server is running on ${port}`);

export type HonoAppType = typeof app;

export default app;
