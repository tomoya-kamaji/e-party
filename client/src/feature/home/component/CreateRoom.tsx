import { useState } from 'react';

const CreateRoom = () => {
  // 部屋名
  const [roomName, setRoomName] = useState('');

  // 部屋リンク
  const [roomLink, setRoomLink] = useState('');

  const handleCreateRoom = async () => {
    const data = await createRoom();
    if (data.roomId) {
      setRoomLink(data.roomLink);
    }
  };

  return (
    <div>
      <input type="text" placeholder="部屋名を入力" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      <button onClick={handleCreateRoom}>部屋を作成</button>
      {roomLink && (
        <p>
          部屋リンク: <a href={roomLink}>{roomLink}</a>
        </p>
      )}
    </div>
  );
};

/**
 * 部屋を作成
 */
const createRoom = async () => {
  // 1秒待機
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 部屋を作成
  const roomId = '123';
  const roomLink = `https://example.com/room/${roomId}`;
  return { roomId, roomLink };
};

export default CreateRoom;
