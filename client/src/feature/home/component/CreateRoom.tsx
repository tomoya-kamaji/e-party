interface CreateRoomFormProps {
  roomName: string;
  setRoomName: (roomName: string) => void;
  handleCreateRoom: () => void;
}

const CreateRoomForm = ({ roomName, setRoomName, handleCreateRoom }: CreateRoomFormProps) => (
  <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
    <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">ルームを作成</h1>
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="roomName">
        ルーム名(任意)
      </label>
      <input
        id="roomName"
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="ルーム名を入力してください"
        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      onClick={handleCreateRoom}
      className={`w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    >
      作成
    </button>
  </div>
);

export default CreateRoomForm;
