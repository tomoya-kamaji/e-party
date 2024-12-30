'use client';

import { honoClient } from '@/util/api';
import useSWR from 'swr';

const key = ['users', 'get'];

const fetchUser = async () => {
  const res = await honoClient.api.users.current.$get();
  if (!res.ok) {
    throw new Error('エラーが発生しました');
  }
  return res.json();
};

/**
 * ポーカーのデータを取得する
 */
export const useFetchUser = () => {
  const { data, error, isLoading, mutate } = useSWR(key, fetchUser);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
