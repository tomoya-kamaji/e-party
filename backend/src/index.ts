import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import pokerApp from './feature/poker';

const app = new Hono().basePath('/api').route('/pokers', pokerApp);

// サーバー起動
const port = 3008;
serve({
  fetch: app.fetch,
  port,
});
console.log(`Server is running on ${port}`);

export type AppType = typeof app;

export default app;
