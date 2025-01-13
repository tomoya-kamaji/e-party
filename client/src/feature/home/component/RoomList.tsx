import CustomTable from '@/component/Table';
import { formatDateForDisplay } from '@/util/date';

interface RoomListProps {
  rooms: { id: string; name: string; createdAt: string }[];
}

const RoomList = ({ rooms }: RoomListProps) => {
  const headers = ['ルーム名', '作成日時'];
  const data = rooms.map((room) => ({
    ルーム名: (
      <a href={`/rooms/${room.id}`} className="font-medium text-blue-500 hover:underline">
        {room.name}
      </a>
    ),
    作成日時: formatDateForDisplay(room.createdAt),
  }));

  return (
    <div className="mt-8 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">過去のルーム一覧</h2>
      {rooms.length > 0 ? (
        <CustomTable headers={headers} data={data} />
      ) : (
        <p className="text-gray-600">過去の部屋はありません。</p>
      )}
    </div>
  );
};

export default RoomList;
