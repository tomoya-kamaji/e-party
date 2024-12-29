'use client';

import { honoClient, HonoQueryType } from '@/util/api';
import useSWR from 'swr';

const key = ['pokers', 'get'];

type Query = HonoQueryType<(typeof honoClient.api.pokers)['$get']>;

// データフェッチ関数
const fetchPoker = async (query: Query) => {
  const res = await honoClient.api.pokers.$get({
    query,
  });
  if (!res.ok) {
    throw new Error('エラーが発生しました');
  }
  return res.json();
};

/**
 * ポーカーのデータを取得する
 */
export const usePoker = () => {
  const { data, error, isLoading, mutate } = useSWR(key, fetchPoker);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
