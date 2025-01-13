'use client';

import { honoClient } from '@/util/api';
import useSWR from 'swr';

export const fetchRoomKey = ['rooms', 'get'];

const fetchRoom = async () => {
  const res = await honoClient.api.rooms.$get();
  if (!res.ok) {
    throw new Error('エラーが発生しました');
  }
  return res.json();
};

/**
 * ルームのデータを取得する
 */
export const useFetchRoom = () => {
  const { data, error, isLoading, mutate } = useSWR(fetchRoomKey, fetchRoom);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
