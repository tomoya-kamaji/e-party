/**
 * 参加者
 */
export interface Participant {
  id: string;
  userId: string;
  userName: string;
  userImageUrl: string;
  value: number | undefined;
}

/**
 * 投票済みかどうか
 */
export const hasVoted = (p: Participant) => p.value !== undefined;
