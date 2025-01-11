'use client';

import { HonoBodyType, honoClient } from '@/util/api';
import { mutate } from 'swr';
import { fetchRoomKey } from './useFetch';

/**
 * ルームを作成する
 */
export const useCreateRoom = async (json: HonoBodyType<typeof honoClient.api.rooms.$post>) => {
  const res = await honoClient.api.rooms.$post({
    json,
  });

  // エラーが発生した場合
  if (!res.ok) {
    throw new Error('エラーが発生しました');
  }

  // ルーム取得のデータを更新する
  mutate(fetchRoomKey);

  return res.json();
};
