import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import pokerApp from './feature/poker';

const app = new Hono()
  .basePath('/api')
  // フロントエンドのオリジンを指定
  .use('*', (c, next) => {
    const middleware = cors({
      origin: '*',
    });

    return middleware(c, next);
  })
  .use('*', (c, next) => {
    console.log(`Request: ${c.req.method} ${c.req.url}`);
    return next();
  })
  .get('/health', (c) => c.json('ok'))
  .route('/pokers', pokerApp);

// サーバー起動
const port = 3008;
serve({
  fetch: app.fetch,
  port,
});
console.log(`Server is running on ${port}`);

export type AppType = typeof app;

export default app;
