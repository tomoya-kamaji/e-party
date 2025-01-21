'use client';

import { honoClient } from '@/util/api';
import { PATH_PAGE } from '@/util/route';
import { redirect } from 'next/navigation';
import useSWR from 'swr';

export const fetchRoomDetailKey = ['rooms', 'get', 'detail'];

const fetchRoomDetail = async (roomId: string) => {
  const res = await honoClient.api.rooms[':id'].$get({
    param: {
      id: roomId,
    },
  });
  if (!res.ok) {
    redirect(PATH_PAGE.home);
  }
  return res.json();
};

/**
 * ルーム詳細を取得
 */
export const useFetchDetailRoom = (roomId: string, suspense: boolean = true) => {
  const { data, error, isLoading, mutate } = useSWR(fetchRoomDetailKey, () => fetchRoomDetail(roomId), {
    suspense: suspense,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
