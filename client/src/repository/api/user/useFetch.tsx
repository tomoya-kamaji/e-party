'use client';

import { honoClient, apiClient } from '@/util/api';
import useSWR from 'swr';

const key = ['users', 'get'];

const fetchUser = async () => {
  await apiClient.api.users.current.$get();
  const res = await honoClient.api.users.current.$get();
  if (!res.ok) {
    throw new Error('エラーが発生しました');
  }
  return res.json();
};

/**
 * ログインユーザーのデータを取得する
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
