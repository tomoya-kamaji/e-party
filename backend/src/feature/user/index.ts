// authors.ts
import { AppContext, CURRENT_USER_KEY } from '@/middleware';
import { Hono } from 'hono';

const userApp = new Hono<AppContext>().get('/current', async (c) => {
  const currentUser = c.get(CURRENT_USER_KEY);

  return c.json(currentUser);
});

export default userApp;
