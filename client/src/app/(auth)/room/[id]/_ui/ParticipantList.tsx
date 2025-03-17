import { Participant, hasVoted } from '@/feature/room/model/participant';
import { useRoomAction } from '@/repository/api/room';

interface Props {
  roomId: string;
  participants: Participant[];
  isRevealed: boolean;
}

// カードの色分け
const getCardStatusClasses = (cardLabel: string) => {
  if (cardLabel === '未') {
    return 'bg-gray-300 text-gray-800';
  } else if (cardLabel === '済') {
    return 'bg-[#4398A9] text-white font-bold';
  } else {
    return 'bg-[#4398A9] text-white font-bold';
  }
};

/**
 * 参加者一覧
 */
const ParticipantList = ({ roomId, participants, isRevealed }: Props) => {
  const { switchPaused } = useRoomAction();

  // confirm を表示する
  const handleLeave = (participantId: string, isPaused: boolean) => {
    if (confirm(`投票を休止させますか？${participantId}`)) {
      switchPaused(roomId, participantId, isPaused);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {participants.map((participant) => {
        // 表示するラベルを決定
        let cardLabel = '未';
        if (hasVoted(participant)) {
          cardLabel = isRevealed ? String(participant.value) : '済';
        }
        const statusClasses = getCardStatusClasses(cardLabel);

        return (
          <div key={participant.id} className={`flex items-center p-4 shadow-md`}>
            {/* 投票休止状態を表示 */}
            {participant.isPaused && <p className="text-sm text-gray-500">投票休止中</p>}
            <div className="flex w-full items-center justify-between">
              <img src={participant.userImageUrl} alt="user-icon" className="h-12 w-12 rounded-full" />
              {/* 文字サイズでかく */}
              <p className={`text-large ${statusClasses} p-4`}>{cardLabel}</p>
            </div>

            {/* if文で分岐 */}
            {participant.isPaused ? (
              <button onClick={() => handleLeave(participant.id, false)}>▶️</button>
            ) : (
              <button onClick={() => handleLeave(participant.id, true)}>⏸️</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParticipantList;
