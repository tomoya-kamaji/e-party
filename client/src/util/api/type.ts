/**
 * Honoのクエリパラメータの型を取得する
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HonoQueryType<T> = T extends (args: { query: infer Q }, options?: any) => any ? Q : never;

/**
 * Honoのパスパラメータの型を取得する
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HonoPathType<T> = T extends (args: { path: infer P }, options?: any) => any ? P : never;

/**
 * Honoのボディの型を取得する
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HonoBodyType<T> = T extends (args: { json: infer B }, options?: any) => any ? B : never;

/**
 * Honoのレスポンスの型を取得する
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// レスポンスの型を抽出

// レスポンスの型を抽出

/**
 * Honoのレスポンスの型を取得する
 */
// レスポンスの型を抽出
export type HonoResponseType<T> =
  T extends Promise<infer R> ? (R extends Response ? Awaited<ReturnType<R['json']>> : never) : never;
