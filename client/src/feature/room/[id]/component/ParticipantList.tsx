import { hasVoted, Participant } from '../model/participant';

interface Props {
  participants: Participant[];
  isRevealed: boolean;
}

// カードの色分け
const getCardStatusClasses = (cardLabel: string) => {
  if (cardLabel === '未') {
    return 'bg-gray-300 text-white';
  } else if (cardLabel === '済') {
    return 'bg-green-400 text-white';
  } else {
    return 'bg-blue-500 text-white';
  }
};

const ParticipantList = ({ participants, isRevealed }: Props) => {
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
            <div className="flex w-full items-center justify-between">
              <img src={participant.userImageUrl} alt="user-icon" className="h-12 w-12 rounded-full" />
              {/* 文字サイズでかく */}
              <p className={`text-large ${statusClasses} p-4`}>{cardLabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ParticipantList;
