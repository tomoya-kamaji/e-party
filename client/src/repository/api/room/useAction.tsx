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
      mutate(fetchRoomKey);
      return res.json();
    })
    .catch((error) => {
      throw new Error('エラーが発生しました', { cause: error });
    });
};

const onReveal = async (id: string) => {
  return honoClient.api.rooms[':id'].reveal
    .$patch({
      param: {
        id: id,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      mutate(fetchRoomKey);
      return res.json();
    });
};

const onResetAll = async (id: string) => {
  return honoClient.api.rooms[':id'].reset
    .$patch({
      param: {
        id: id,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      mutate(fetchRoomKey);
      return res.json();
    });
};

const onReset = async (id: string) => {
  return honoClient.api.rooms[':id'].reset.current
    .$patch({
      param: {
        id: id,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      mutate(fetchRoomKey);
      return res.json();
    });
};

const onVote = async (id: string, value: number) => {
  return honoClient.api.rooms[':id'].vote
    .$patch({
      param: {
        id: id,
      },
      json: {
        value: value,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('エラーが発生しました');
      }
      mutate(fetchRoomKey);
      return res.json();
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
  const revealVote = useCallback(
    async (id: string) => {
      return onReveal(id);
    },
    [mutate]
  );

  /**
   * 投票結果リセット
   */
  const resetAllVote = useCallback(
    async (id: string) => {
      return onResetAll(id);
    },
    [mutate]
  );

  /**
   * 投票リセット
   */
  const resetVote = useCallback(
    async (id: string) => {
      return onReset(id);
    },
    [mutate]
  );

  /**
   * 投票
   */
  const vote = useCallback(
    async (id: string, value: number) => {
      return onVote(id, value);
    },
    [mutate]
  );

  return {
    create,
    vote,
    revealVote,
    resetVote,
    resetAllVote,
  };
};
