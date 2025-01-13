'use client';

import { honoClient } from '@/util/api';
import useSWR from 'swr';

export const fetchRoomDetailKey = ['rooms', 'get', 'detail'];

const fetchRoomDetail = async (roomId: string) => {
  const res = await honoClient.api.rooms[':id'].$get({
    param: {
      id: roomId,
    },
  });
  if (!res.ok) {
    throw new Error('エラーが発生しました');
  }
  return res.json();
};

/**
 * ルーム詳細を取得
 */
export const useFetchDetailRoom = (roomId: string) => {
  const { data, error, isLoading, mutate } = useSWR(fetchRoomDetailKey, () => fetchRoomDetail(roomId));

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
