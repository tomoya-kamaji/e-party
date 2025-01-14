'use client';

import { LoadingIndicator } from '@/component/LoadingIndicator';
import { useSnackbar } from '@/component/SnackBar';
import { useRoomAction } from '@/repository/api/room';
import { useFetchDetailRoom } from '@/repository/api/room/useFetchDetail';
import { useAuth } from '@/state/AuthContext';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Participant {
  id: string;
  userId: string;
  userName: string;
  userImageUrl: string;
  value: number | undefined;
}

// 投票済みかどうか
const hasVoted = (p: Participant) => p.value !== undefined;

// フィボナッチ数列（数値のみ）
const FIBONACCI_VALUES = [1, 2, 3, 5, 8, 13, 21];

// ステータスごとに色を割り当てる関数
const getCardStatusClasses = (cardLabel: string) => {
  if (cardLabel === '未') {
    return 'bg-gray-100 text-gray-600';
  } else if (cardLabel === '済') {
    return 'bg-green-100 text-green-700';
  } else {
    return 'bg-blue-100 text-blue-700';
  }
};

const RoomDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  const { vote, resetAllVote, resetVote, joinRoom } = useRoomAction();

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [voted, setVoted] = useState<number | undefined>();
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // ルーム情報取得
  // mutateを0.5秒に1度呼び出す
  const { data, isLoading, mutate } = useFetchDetailRoom(id as string);
  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 500);
    return () => clearInterval(interval);
  }, [mutate]);

  // ルームIDが取得できない場合はエラーを返す
  if (!id || typeof id !== 'string') {
    throw new Error('ルームIDが取得できませんでした');
  }

  // ユーザーの投票情報を更新
  useEffect(() => {
    if (!data?.room) return;

    const updatedParticipants: Participant[] =
      data.room.votes.map((vote) => ({
        id: vote.userId,
        userId: vote.userId,
        userName: vote.userName,
        userImageUrl: vote.userImageUrl,
        value: vote.value,
      })) || [];

    setParticipants(updatedParticipants);

    // 全員投票済みなら公開する
    if (updatedParticipants.every((p) => p.value !== undefined)) {
      setIsRevealed(true);
    } else {
      setIsRevealed(false);
    }

    if (user && !updatedParticipants.some((p) => p.userId === user.id)) {
      joinRoom(data.room.id).then(() => {
        showSnackbar('ルームに参加しました', 'success');
      });
    }
  }, [data, user, joinRoom, mutate, showSnackbar]);
  /**
   * 招待URLコピー
   */
  const handleCopyInviteUrl = () => {
    const inviteUrl = `${window.location.origin}/room/${data?.room.id}`;
    navigator.clipboard.writeText(inviteUrl);
    showSnackbar('招待リンクをコピーしました', 'success');
  };

  /**
   * 投票
   */
  const handleVote = (value: number) => {
    setVoted(value);
    vote(data?.room.id || '', value);
  };

  /**
   * 全員リセット
   */
  const handleAllReset = () => {
    resetAllVote(data?.room.id || '');
    setVoted(undefined);
  };

  /**
   * 自分の投票リセット
   */
  const handleReset = () => {
    resetVote(data?.room.id || '');
    setVoted(undefined);
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
        <div className="columns-2">
          <ul className="space-y-2">
            {participants.map((participant, index) => {
              // 未投票 → '未'
              // 投票済み & 未公開 → '済'
              // 投票済み & 公開 → voteの数字
              let cardLabel = '未';
              if (hasVoted(participant)) {
                cardLabel = isRevealed ? String(participant.value) : '済';
              }

              const statusClasses = getCardStatusClasses(cardLabel);
              return (
                <li key={index} className="rounded-lg border p-3 text-gray-700">
                  <div className="grid grid-cols-2 items-center gap-2">
                    {/* アイコン */}
                    <img src={participant.userImageUrl} alt="user-icon" className="rounded-full p-2" />
                    {/* カードステータス (色分け) */}
                    <span className={`justify-self-end rounded p-4 text-sm ${statusClasses}`}>{cardLabel}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 投票エリア */}
        <div className="pt-4">
          <div className="flex flex-wrap gap-2">
            {FIBONACCI_VALUES.map((value) => {
              // 自分が選択している数字の場合は濃い青、そうでなければ薄い青
              const isSelected = voted === value;
              const buttonClasses = isSelected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 hover:bg-blue-400';
              return (
                <button
                  key={value}
                  onClick={() => handleVote(value)}
                  className={`rounded p-3 text-white ${buttonClasses}`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        {/* 自分のリセットボタン */}
        <div className="mt-4">
          <button onClick={handleReset} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Reset
          </button>
        </div>

        {/* 全員リセットボタン */}
        <div className="mt-4">
          <button onClick={handleAllReset} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            All Reset
          </button>
        </div>

        {/* 招待URLコピー ボタン */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCopyInviteUrl}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            招待リンクをコピー
          </button>
        </div>

        {/* ルーム名（下の方に表示） */}
        <div className="mt-8 text-right text-sm text-gray-500">{data?.room.name}</div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
