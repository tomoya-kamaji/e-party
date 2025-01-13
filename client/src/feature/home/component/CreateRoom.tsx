import { useSnackbar } from '@/component/SnackBar';
import { useFetchRoom, useRoomAction } from '@/repository/api/room';
import { useState } from 'react';

const RoomList = () => {
  const { showSnackbar } = useSnackbar();

  // 部屋名
  const [roomName, setRoomName] = useState('');
  // 部屋リンク
  const [roomLink, setRoomLink] = useState('');

  // 部屋一覧取得
  const { data, error, isLoading } = useFetchRoom();

  const { create } = useRoomAction();

  // 新しい部屋作成
  const handleCreateRoom = async () => {
    try {
      const data = await create({ name: roomName });
      if (data.room) {
        setRoomLink(data.room.id);
        showSnackbar('部屋を作成しました', 'success');
      }
    } catch (error) {
      showSnackbar('部屋の作成に失敗しました', 'error');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">部屋を作成する</h1>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="roomName">
            部屋名
          </label>
          <input
            id="roomName"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="部屋名を入力してください"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleCreateRoom}
          className={`w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? '作成中...' : '部屋を作成'}
        </button>
        {roomLink && (
          <div className="mt-6 text-center">
            <p className="text-gray-700">部屋リンクが作成されました:</p>
            <a href={`/rooms/${roomLink}`} className="font-medium text-blue-500 hover:underline">
              {`/rooms/${roomLink}`}
            </a>
          </div>
        )}
      </div>

      {/* 過去の部屋一覧 */}
      <div className="mt-8 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">過去の部屋一覧</h2>
        {isLoading ? (
          <p className="text-gray-600">読み込み中...</p>
        ) : error ? (
          <p className="text-red-600">部屋情報の取得に失敗しました。</p>
        ) : data!.rooms.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {data!.rooms.map((room) => (
              <li key={room.id} className="py-2">
                <a href={`/rooms/${room.id}`} className="font-medium text-blue-500 hover:underline">
                  {room.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">過去の部屋はありません。</p>
        )}
      </div>
    </div>
  );
};

export default RoomList;
