'use client';

import { hc } from 'hono/client';
import { HonoAppType } from '../../../../backend/src';
import { getAuthToken } from '../supabase/client';

export const honoClient = hc<HonoAppType>('http://localhost:3000', {
  fetch: async (input: RequestInfo | URL, init: RequestInit | undefined) => {
    const token = await getAuthToken();

    // ヘッダーを設定
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(input, {
      ...init,
      headers,
    });
  },
});
