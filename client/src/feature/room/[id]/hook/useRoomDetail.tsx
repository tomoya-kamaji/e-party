'use client';

import { useSnackbar } from '@/component/SnackBar';
import { useRoomAction } from '@/repository/api/room';
import { useParams, redirect } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Participant } from '../model/participant';
import { PATH_PAGE } from '@/util/route';

export const useRoomDetail = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const { vote, resetAllVote, resetVote, joinRoom } = useRoomAction();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [voted, setVoted] = useState<number | undefined>();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  if (!id || typeof id !== 'string') {
    // ルームIDが取得できない場合はhomeにリダイレクト
C
  }

  // 投票
  const handleVote = useCallback(
    (value: number) => {
      setVoted(value);
      vote(id, Number(value));
    },
    [vote, id]
  );

  // 全員リセット
  const handleAllReset = useCallback(() => {
    resetAllVote(id);
    setVoted(undefined);
  }, [resetAllVote, id]);

  // 自分の投票リセット
  const handleReset = useCallback(() => {
    resetVote(id);
    setVoted(undefined);
  }, [resetVote, id]);

  // 招待URLコピー
  const handleCopyInviteUrl = useCallback(() => {
    const inviteUrl = `${window.location.origin}/room/${id}`;
    navigator.clipboard.writeText(inviteUrl);
    showSnackbar('招待リンクをコピーしました', 'success');
  }, [id, showSnackbar]);

  // ルームに参加
  const handleJoinRoom = useCallback(() => {
    joinRoom(id).then(() => {
      showSnackbar('ルームに参加しました', 'success');
    });
  }, [joinRoom, id, showSnackbar]);

  return {
    participants,
    setParticipants,
    voted,
    setVoted,
    isRevealed,
    setIsRevealed,
    handleVote,
    handleAllReset,
    handleReset,
    handleCopyInviteUrl,
    handleJoinRoom,
  };
};
