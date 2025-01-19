'use client';

import Button from '@/component/Button';
import { LoadingIndicator } from '@/component/LoadingIndicator';
import ParticipantList from '@/feature/room/[id]/component/ParticipantList';
import VotingArea from '@/feature/room/[id]/component/VotingArea';
import { useRoomDetail } from '@/feature/room/[id]/hook/useRoomDetail';
import { Participant } from '@/feature/room/[id]/model/participant';
import { useFetchDetailRoom } from '@/repository/api/room/useFetchDetail';
import { useAuth } from '@/state/AuthContext';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

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
  const { data, isLoading, mutate } = useFetchDetailRoom(id as string);
  const { user } = useAuth();

  // 定期的にルーム情報を更新
  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 500);
    return () => clearInterval(interval);
  }, [mutate]);

  // ルームデータが変化したときの処理
  useEffect(() => {
    if (!data?.room) return;

    const updatedParticipants: Participant[] =
      data.room.votes.map((vote: any) => ({
        id: vote.userId,
        userId: vote.userId,
        userName: vote.userName,
        userImageUrl: vote.userImageUrl,
        value: vote.value ?? undefined,
      })) || [];

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

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
        {/* 参加者一覧 */}
        <ParticipantList participants={participants} isRevealed={isRevealed} />
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
      </div>
    </div>
  );
};

export default RoomDetailPage;
