import { honoClient } from '@/util/api';

export const getPoker = async () => {
  const res = await honoClient.api.pokers.$get();
  if (!res.ok) {
    alert('エラーが発生しました');
    return;
  }
  return res.json();
};
