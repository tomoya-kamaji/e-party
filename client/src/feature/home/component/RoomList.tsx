import { formatDateForDisplay } from '@/util/date';

interface RoomListProps {
  rooms: { id: string; name: string; createdAt: string }[];
}

const RoomList = ({ rooms }: RoomListProps) => (
  <div className="mt-8 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
    <h2 className="mb-4 text-xl font-bold text-gray-800">過去のルーム一覧</h2>
    {rooms.length > 0 ? (
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">部屋名</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">作成日時</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <a href={`/rooms/${room.id}`} className="font-medium text-blue-500 hover:underline">
                  {room.name}
                </a>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {/* 作成日時を表示するためのコードをここに追加 */}
                {formatDateForDisplay(room.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-600">過去の部屋はありません。</p>
    )}
  </div>
);

export default RoomList;
