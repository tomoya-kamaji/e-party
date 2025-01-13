'use client';

import { LoadingIndicator } from '@/component/LoadingIndicator';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface User {
  iconUrl: string;
  vote: number | null; // 投票値(数値) or null
  hasVoted: boolean; // 投票済みかどうか
}

interface Room {
  id: string;
  name: string;
}

// ユーザのサンプルデータ
const dummyUsers: User[] = [
  { iconUrl: '/images/avatar1.png', vote: 3, hasVoted: true },
  { iconUrl: '/images/avatar2.png', vote: 3, hasVoted: true },
  { iconUrl: '/images/avatar3.png', vote: 8, hasVoted: true },
];

// ルーム情報を取得する関数(ダミー)
const fetchRoomDetail = async (roomId: string): Promise<Room> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: roomId,
        name: `サンプルルーム(${roomId})`,
      });
    }, 500);
  });
};

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

const RoomDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchRoomDetail(id).then((res) => {
        setRoom(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !room) {
    return <LoadingIndicator />;
  }

  // 全員投票済みかどうか
  const allVoted = dummyUsers.every((user) => user.hasVoted);

  // 公開ボタン押下
  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-md">
        <div className="columns-2">
          <ul className="space-y-2">
            {dummyUsers.map((user, index) => {
              // カード表示のロジック
              // 未投票 → '未'
              // 投票済み & 未公開 → '済'
              // 投票済み & 公開 → voteの数字
              let cardLabel = '未';
              if (user.hasVoted) {
                cardLabel = isRevealed && user.vote !== null ? String(user.vote) : '済';
              }

              const statusClasses = getCardStatusClasses(cardLabel);
              return (
                <li key={index} className="rounded-lg border p-3 text-gray-700">
                  {/* 2カラムレイアウト */}
                  <div className="grid grid-cols-2 items-center gap-2">
                    {/* 左カラム: アイコン */}
                    <img src={user.iconUrl} alt="user-icon" className="h-6 w-6 rounded-full object-cover" />
                    {/* 右カラム: カードステータス (色分け) */}
                    <span className={`justify-self-end rounded px-4 py-4 text-sm ${statusClasses}`}>{cardLabel}</span>
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
              <button key={value} className="rounded bg-blue-500 px-5 py-5 text-white hover:bg-blue-600">
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* 公開ボタン */}
        {allVoted && !isRevealed && (
          <div className="mt-4">
            <button onClick={handleReveal} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
              公開する
            </button>
          </div>
        )}

        {/* ルーム名（下の方に表示） */}
        <div className="mt-8 text-right text-sm text-gray-500">{room.name}</div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
