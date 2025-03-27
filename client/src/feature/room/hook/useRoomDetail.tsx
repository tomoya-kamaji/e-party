'use client';

import { useSnackbar } from '@/component/SnackBar';
import { useRoomAction } from '@/repository/api/room';
import { useParams, redirect } from 'next/navigation';
import { useCallback, useState } from 'react';
import { PATH_PAGE } from '@/util/route';

export const useRoomDetail = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const { vote, resetAllVote, resetVote, joinRoom, switchPaused } = useRoomAction();

  if (!id || typeof id !== 'string') {
    // ルームIDが取得できない場合はhomeにリダイレクト
    redirect(PATH_PAGE.home);
  }
  // 投票
  const handleVote = useCallback(
    (value: number) => {
      vote(id, Number(value));
    },
    [vote, id]
  );

  // 全員リセット
  const handleAllReset = useCallback(() => {
    resetAllVote(id);
  }, [resetAllVote, id]);

  // 自分の投票リセット
  const handleReset = useCallback(() => {
    resetVote(id);
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

  // 投票休止状態を切り替える
  const handleSwitchPaused = useCallback(
    (participantId: string, isPaused: boolean) => {
      switchPaused(id, participantId, isPaused);
    },
    [switchPaused, id]
  );

  return {
    handleSwitchPaused,
    handleVote,
    handleAllReset,
    handleReset,
    handleCopyInviteUrl,
    handleJoinRoom,
  };
};
