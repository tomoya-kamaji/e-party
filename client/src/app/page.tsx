'use client';

import { LoadingIndicator } from '@/component/LoadingIndicator';
import { useSnackbar } from '@/component/SnackBar';
import CreateRoomForm from '@/feature/home/component/CreateRoom';
import RoomList from '@/feature/home/component/RoomList';
import { useFetchRoom, useRoomAction } from '@/repository/api/room';
import { useState } from 'react';

/**
 * ホーム画面
 */
export default function Home() {
  const { showSnackbar } = useSnackbar();

  // ルーム 名
  const [roomName, setRoomName] = useState('');

  // ルーム一覧取得
  const { data, isLoading } = useFetchRoom();

  const { create } = useRoomAction();

  // 新しいルーム作成
  const handleCreateRoom = async () => {
    try {
      const data = await create({ name: roomName });
      if (data.room) {
        showSnackbar('ルームを作成しました', 'success');
      }
    } catch (error) {
      showSnackbar('ルームの作成に失敗しました', 'error');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="w-full max-w-md">
          <>
            {/* ルーム作成フォーム */}
            <CreateRoomForm
              roomName={roomName}
              setRoomName={(roomName) => setRoomName(roomName)}
              handleCreateRoom={handleCreateRoom}
            />
            {/* ルーム一覧 */}
            <RoomList rooms={data?.rooms || []} />
          </>
        </div>
      )}
    </div>
  );
}
