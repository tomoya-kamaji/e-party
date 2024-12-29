'use client';

import { honoClient } from '@/util/api';

export const usePoker = () => {
  // データを取得
  const get = honoClient.api.pokers.$get;

  return { get };
};
