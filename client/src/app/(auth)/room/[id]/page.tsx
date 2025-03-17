'use client';

import Button from '@/component/Button';
import { LoadingIndicator } from '@/component/LoadingIndicator';
import ParticipantList from '@/app/(auth)/room/[id]/_ui/ParticipantList';
import VotingArea from '@/app/(auth)/room/[id]/_ui/VotingArea';
import { useFetchDetailRoom } from '@/repository/api/room/useFetchDetail';
import { useAuth } from '@/state/AuthContext';
import { useParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useRoomDetail } from '@/feature/room/hook/useRoomDetail';
import { Participant } from '@/feature/room/model/participant';

/**
 * ルーム詳細画面
 */
const RoomDetailPage = () => {
  const {
    participants,
    setParticipants,
    voted,
    isRevealed,
    setIsRevealed,
    handleVote,
    handleAllReset,
    handleReset,
    handleCopyInviteUrl,
    handleJoinRoom,
  } = useRoomDetail();

  const { id } = useParams();
  const { data, mutate } = useFetchDetailRoom(id as string, true);
  const { user } = useAuth();

  // 定期的にルーム情報を更新
  useEffect(() => {
    let isActive = true;
    const intervalTime = 2000;

    const fetchData = async () => {
      if (!isActive) return;

      try {
        await mutate(); // APIリクエストの完了を待つ
        // コンポーネントがまだマウントされていれば次のリクエストをスケジュール
        if (isActive) {
          setTimeout(fetchData, intervalTime);
        }
      } catch (error) {
        console.error('Failed to fetch room data:', error);
        if (isActive) {
          // エラー時は1秒待ってから再試行
          setTimeout(fetchData, 1000);
        }
      }
    };

    // 初回実行
    fetchData();

    return () => {
      isActive = false;
    };
  }, [mutate]);

  useEffect(() => {
    if (!data?.room) return;

    const updatedParticipants: Participant[] =
      data.room.votes.map((vote) => ({
        id: vote.id,
        userId: vote.userId,
        userName: vote.userName,
        userImageUrl: vote.userImageUrl,
        value: vote.value ?? undefined,
        isPaused: vote.isPaused,
      })) || [];
    // updatedParticipantsをid順
    updatedParticipants.sort((a, b) => a.id.localeCompare(b.id));
    console.log(updatedParticipants);

    setParticipants(updatedParticipants);

    // 全員投票済みならカードを公開する
    if (updatedParticipants.every((p) => p.value !== undefined)) {
      setIsRevealed(true);
    } else {
      setIsRevealed(false);
    }

    // 参加していないユーザーがいれば joinRoom を呼び出す
    if (user && !updatedParticipants.some((p) => p.userId === user.id)) {
      handleJoinRoom();
    }
  }, [data, user, handleJoinRoom]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
        <Suspense fallback={<LoadingIndicator />}>
          {/* 参加者一覧 */}
          <ParticipantList roomId={id as string} participants={participants} isRevealed={isRevealed} />
          {/* 投票ボタン群 */}
          <VotingArea voted={voted} handleVote={handleVote} />
          {/* ボタン群 */}
          <div className="mt-4 flex justify-start gap-2">
            <Button variant="primary" onClick={() => handleReset()}>
              リセット
            </Button>
            <Button variant="secondary" onClick={() => handleAllReset()}>
              全リセット
            </Button>
          </div>{' '}
          {/* 招待リンクボタン */}
          <div className="mt-6 flex justify-end">
            <Button variant="default" onClick={() => handleCopyInviteUrl()}>
              招待リンク
            </Button>
          </div>
          {/* ルーム名をフッターに表示 */}
          <div className="mt-8 text-right text-sm text-gray-500">{data?.room.name}</div>
        </Suspense>
      </div>
    </div>
  );
};

export default RoomDetailPage;
