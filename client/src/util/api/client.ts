'use client';

import { hc } from 'hono/client';
import { HonoAppType } from '../../../../backend/src';
import { getAuthToken } from '../supabase/client';
import { getEndpointsConfig } from '../env';
import { NextAppType } from '@/app/api/[[...route]]/route';

/**
 * Honoのクライアント
 */
export const honoClient = hc<HonoAppType>(getEndpointsConfig().backendUrl, {
  fetch: async (input: RequestInfo | URL, init: RequestInit | undefined) => {
    const token = await getAuthToken();

    // ヘッダーを設定
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    try {
      const res = await fetch(input, {
        ...init,
        headers,
      });
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export const nextClient = hc<NextAppType>('http://localhost:3005', {
  fetch: async (input: RequestInfo | URL, init: RequestInit | undefined) => {
    const token = await getAuthToken();

    // ヘッダーを設定
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    try {
      const res = await fetch(input, {
        ...init,
        headers,
      });
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

export const fetchCurrentUser = async () => {
  const res = await nextClient.api.users.current.$get();
  const json = await res.json();
  return json;
};
