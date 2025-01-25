import { Context, Next } from 'hono';

/**
 * エンドポイントのログを出力するミドルウェア
 */
export const loggingMiddleware = async (c: Context, next: Next) => {
  // リクエストの基本情報
  const method = c.req.method;
  const url = c.req.url;

  // クエリパラメータ
  const query = Object.fromEntries(new URL(url).searchParams);

  // パラメータ
  const params = c.req.param();

  // ボディ（JSON形式の場合）
  let body = {};
  try {
    if (method !== 'GET' && method !== 'HEAD') {
      body = await c.req.json();
    }
  } catch {
    // ボディが空またはJSON形式でない場合は無視
  }

  console.log({
    request: {
      method,
      url,
      query,
      params,
      body,
    },
  });

  return next();
};
