'use client';

import { LoadingIndicator } from '@/component/LoadingIndicator';
import { useSnackbar } from '@/component/SnackBar';
import { useRoomAction } from '@/repository/api/room';
import { useFetchDetailRoom } from '@/repository/api/room/useFetchDetail';
import { useParams } from 'next/navigation';

interface User {
  imageUrl: string;
  vote: number | null; // 投票値(数値) or null
  hasVoted: boolean; // 投票済みかどうか
}

interface Participant {
  id: string;
  userId: string;
  userName: string;
  userImageUrl: string;
  value: number | undefined;
  isRevealed: boolean;
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
  const { showSnackbar } = useSnackbar();
  const { resetVotes, revealVotes } = useRoomAction();

  if (typeof id !== 'string') {
    throw new Error('ルームIDが取得できませんでした');
  }
  const { data, isLoading } = useFetchDetailRoom(id);
  if (isLoading || !data?.room) {
    return <LoadingIndicator />;
  }

  // 全員投票済みかどうか
  const allVoted = data.room.votes.every((vote) => vote.value !== undefined);

  const createInviteUrl = (baseUrl: string, roomId: string): string => {
    return `${baseUrl}/room/${roomId}`;
  };

  const handleCopyInviteUrl = () => {
    const inviteUrl = createInviteUrl(window.location.origin, data.room.id);
    navigator.clipboard.writeText(inviteUrl);
    showSnackbar('招待リンクをコピーしました', 'success');
  };

  // 投票
  const handleVote = (value: number) => {
    vote(data.room.id, value);
  };



  const handleReset = () => {
    resetVotes(data.room.id);
  };

  const handleReveal = () => {
    revealVotes(data.room.id);
  };

  // 参加者に変換
  const participants: Participant[] = data.room.votes.map((vote) => ({
    id: vote.userId,
    userId: vote.userId,
    userName: vote.userName,
    userImageUrl: vote.userImageUrl,
    value: vote.value,
    isRevealed: vote.isRevealed,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
        <div className="columns-2">
          <ul className="space-y-2">
            {participants.map((participant, index) => {
              // カード表示のロジック
              // 未投票 → '未'
              // 投票済み & 未公開 → '済'
              // 投票済み & 公開 → voteの数字
              let cardLabel = '未';
              if (hasVoted(participant)) {
                cardLabel = participant.isRevealed ? String(participant.value) : '済';
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
            {FIBONACCI_VALUES.map((value) => (
              <button key={value} className="rounded bg-blue-500 p-3 text-white hover:bg-blue-600">
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* 公開ボタン */}
        {allVoted && (
          <div className="mt-4">
            <button onClick={handleReveal} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              公開する
            </button>
          </div>
        )}

        {/* リセットボタン */}
        <div className="mt-4">
          <button onClick={handleReset} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            リセット
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
        <div className="mt-8 text-right text-sm text-gray-500">{data.room.name}</div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
