'use client';

import Button from '@/component/Button';
import { LoadingIndicator } from '@/component/LoadingIndicator';
import ParticipantList from '@/app/(auth)/room/[id]/_ui/ParticipantList';
import VotingArea from '@/app/(auth)/room/[id]/_ui/VotingArea';
import { useFetchDetailRoom } from '@/repository/api/room/useFetchDetail';
import { useAuth } from '@/state/AuthContext';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useMemo } from 'react';
import { useRoomDetail } from '@/feature/room/hook/useRoomDetail';
import { Participant } from '@/feature/room/model/participant';

/**
 * ルーム詳細画面
 */
const RoomDetailPage = () => {
  const { id } = useParams();
  const { data, mutate } = useFetchDetailRoom(id as string, true);
  const { user } = useAuth();
  const { handleVote, handleAllReset, handleReset, handleCopyInviteUrl, handleJoinRoom } = useRoomDetail();

  // 参加者データの導出
  const participants: Participant[] = useMemo(() => {
    if (!data?.room) return [];

    return [...data.room.votes].sort((a, b) => (a.isPaused ? 1 : b.isPaused ? -1 : 0));
  }, [data]);

  // 投票公開状態の導出：全員が投票済みかどうか
  const isRevealed = useMemo(() => {
    return participants.every((p) => p.value !== undefined);
  }, [participants]);

  // 自身の投票データの導出
  const voted = useMemo(() => {
    return participants.find((p) => p.userId === user?.id)?.value ?? undefined;
  }, [participants, user]);

  // 未参加ユーザーの自動参加
  useEffect(() => {
    if (user && participants.length > 0 && !participants.some((p) => p.userId === user.id)) {
      handleJoinRoom();
    }
  }, [user, participants, handleJoinRoom]);

  // ポーリング処理
  useEffect(() => {
    let isActive = true;
    const intervalTime = 1000;

    const fetchData = async () => {
      if (!isActive) return;
      try {
        await mutate();
        if (isActive) {
          setTimeout(fetchData, intervalTime);
        }
      } catch (error) {
        console.error('Failed to fetch room data:', error);
        if (isActive) {
          setTimeout(fetchData, 1000);
        }
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [mutate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
        <Suspense fallback={<LoadingIndicator />}>
          <ParticipantList roomId={id as string} participants={participants} isRevealed={isRevealed} />
          <VotingArea voted={voted} handleVote={handleVote} />
          <div className="mt-4 flex justify-start gap-2">
            <Button variant="primary" onClick={handleReset}>
              リセット
            </Button>
            <Button variant="secondary" onClick={handleAllReset}>
              全リセット
            </Button>
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="default" onClick={handleCopyInviteUrl}>
              招待リンク
            </Button>
          </div>
          <div className="mt-8 text-right text-sm text-gray-500">{data?.room.name}</div>
        </Suspense>
      </div>
    </div>
  );
};

export default RoomDetailPage;
