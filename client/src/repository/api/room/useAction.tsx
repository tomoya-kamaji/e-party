'use client';

import { HonoBodyType, honoClient } from '@/util/api';
import { useCallback } from 'react';
import { mutate, useSWRConfig } from 'swr';
import { fetchRoomKey } from './useFetch';

const onCreate = async (json: HonoBodyType<typeof honoClient.api.rooms.$post>) => {
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

const onReveal = async (id: string) => {
  return honoClient.api.rooms[':id'].reveal.$patch({
    param: {
      id: id,
    },
  });
};

const onReset = async (id: string) => {
  return honoClient.api.rooms[':id'].reset.$patch({
    param: {
      id: id,
    },
  });
};

/**
 * ルームのアクション
 */
export const useRoomAction = () => {
  const { mutate } = useSWRConfig();

  /**
   * 作成
   */
  const create = useCallback(
    async (requestParameters: HonoBodyType<typeof honoClient.api.rooms.$post>) => {
      return onCreate(requestParameters);
    },
    [mutate]
  );

  /**
   * 投票結果公開
   */
  const revealVotes = useCallback(
    async (id: string) => {
      return onReveal(id);
    },
    [mutate]
  );

  /**
   * 投票結果リセット
   */
  const resetVotes = useCallback(
    async (id: string) => {
      return onReset(id);
    },
    [mutate]
  );

  return {
    create,
    revealVotes,
    resetVotes,
  };
};
