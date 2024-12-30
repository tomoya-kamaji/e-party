// authors.ts
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { Hono } from 'hono';

const userApp = new Hono<AppContext>().get('/current', async (c) => {
  // c.userを取得する
  const currentUser = c.get(CURRENT_USER_KEY);
  console.log('----j  -Auth-----');
  console.log(currentUser);

  return c.json(currentUser);
});

export default userApp;
