import { HonoResponseType, apiClient } from '@/util/api';

/**
 * 参加者(投票者)
 */
export type Participant = HonoResponseType<ReturnType<(typeof apiClient.api.rooms)[':id']['$get']>>['room']['votes'][number];

/**
 * 投票済みかどうか
 */
export const hasVoted = (p: Participant) => p.value !== null;
