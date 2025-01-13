'use client';

import { HonoBodyType, honoClient } from '@/util/api';
import { useCallback } from 'react';
import { mutate, useSWRConfig } from 'swr';
import { fetchRoomKey } from './useFetch';

const onCreateRoom = async (json: HonoBodyType<typeof honoClient.api.rooms.$post>) => {
  return honoClient.api.rooms
    .$post({
      json,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      // ルーム取得のデータを更新する
      mutate(fetchRoomKey);
      return res.json();
    })
    .catch((error) => {
      throw new Error('エラーが発生しました', { cause: error });
    });
};

/**
 * ルームのアクション
 */
export const useRoomAction = () => {
  const { mutate } = useSWRConfig();

  /**
   * 担当サービスの更新
   */
  const createRoom = useCallback(
    async (requestParameters: HonoBodyType<typeof honoClient.api.rooms.$post>) => {
      return onCreateRoom(requestParameters);
    },
    [mutate]
  );

  return {
    createRoom,
  };
};
