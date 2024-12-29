'use client';

import { honoClient } from '@/util/api';
import useSWR from 'swr';

const key = ['pokers', 'get'];

type PokerQuery = typeof honoClient.api.pokers.$get;

// データフェッチ関数
const fetchPoker = async () => {
  const res = await honoClient.api.pokers.$get();
  if (!res.ok) {
    throw new Error('エラーが発生しました');
  }
  return res.json();
};

export const usePoker = () => {
  const { data, error, isLoading, mutate } = useSWR(key, fetchPoker);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
