import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

/**
 * 例外をハンドリングするミドルウェア
 */
export const errorMiddleware = async (err: Error, _: Context) => {
  console.error(err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return new HTTPException(500, {
    message: err.message,
  }).getResponse();
};
