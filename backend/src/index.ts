import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import pokerApp from './feature/poker';
import { loggingMiddleware } from './middleware';
import { originMiddleware } from './middleware/origin';

const app = new Hono()
  .basePath('/api')
  .use('*', originMiddleware)
  .use('*', loggingMiddleware)
  .get('/health', (c) => c.json('ok'))
  .route('/pokers', pokerApp);

// サーバー起動
const port = 3000;
serve({
  fetch: app.fetch,
  port,
});
console.log(`Server is running on ${port}`);

export type HonoAppType = typeof app;

export default app;
