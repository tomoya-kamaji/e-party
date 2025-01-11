import { ClientResponse } from 'hono/client';

/**
 * Honoのクエリパラメータの型を取得する
 */
export type HonoQueryType<T> = T extends (args: { query: infer Q }, options?: any) => any ? Q : never;

/**
 * Honoのパスパラメータの型を取得する
 */
export type HonoPathType<T> = T extends (args: { path: infer P }, options?: any) => any ? P : never;

/**
 * Honoのボディの型を取得する
 */
export type HonoBodyType<T> = T extends (args: { json: infer B }, options?: any) => any ? B : never;

/**
 * Honoのレスポンスの型を取得する
 */
export type HonoResponseType<T> = T extends (...args: any[]) => Promise<ClientResponse<infer R, any, any>> ? R : never;
