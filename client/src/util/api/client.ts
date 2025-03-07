'use client';

import { hc } from 'hono/client';
import { getAuthToken } from '../supabase/client';
import { NextAppType } from '@/app/api/[[...route]]/route';

/**
 * ベースURLを取得
 * 環境変数が設定されていない場合はホスト名から動的に生成
 */
const getBaseUrl = () => {
  // 環境変数が設定されていればそれを使用
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // ブラウザ環境の場合は現在のオリジンを使用
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // デフォルト値
  return 'http://localhost:3000';
};

/**
 * APIのクライアント
 */
export const apiClient = hc<NextAppType>(getBaseUrl(), {
  fetch: async (input: RequestInfo | URL, init: RequestInit | undefined) => {
    try {
      // 認証トークンを取得
      const token = await getAuthToken();

      // ヘッダーを設定
      const headers = new Headers(init?.headers);

      // 認証トークンがある場合は追加
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // Content-Typeがない場合は追加（APIリクエストの場合）
      if (!headers.has('Content-Type') && init?.method !== 'GET') {
        headers.set('Content-Type', 'application/json');
      }

      // CORSエラーのデバッグ用にオリジンをログ
      console.debug(`API Request to: ${typeof input === 'string' ? input : input.toString()}`);
      console.debug(`From origin: ${window.location.origin}`);

      // リクエスト実行
      const res = await fetch(input, {
        ...init,
        headers,
        // 必要に応じてクレデンシャルを含める
        credentials: 'include',
      });

      // エラーチェック（オプション）
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error(`API Error (${res.status}):`, errorData);
      }

      return res;
    } catch (error) {
      console.error('API Client Error:', error);
      throw error;
    }
  },
});
