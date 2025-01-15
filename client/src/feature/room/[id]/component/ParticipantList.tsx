import { hasVoted, Participant } from '../model/participant';

interface Props {
  participants: Participant[];
  isRevealed: boolean;
}

// カードの色分け
const getCardStatusClasses = (cardLabel: string) => {
  if (cardLabel === '未') {
    return 'bg-gray-100 text-gray-600';
  } else if (cardLabel === '済') {
    return 'bg-green-100 text-green-700';
  } else {
    return 'bg-blue-100 text-blue-700';
  }
};

const ParticipantList = ({ participants, isRevealed }: Props) => {
  return (
    <div className="columns-2">
      <ul className="space-y-2">
        {participants.map((participant) => {
          // 表示するラベルを決定
          let cardLabel = '未';
          if (hasVoted(participant)) {
            cardLabel = isRevealed ? String(participant.value) : '済';
          }
          const statusClasses = getCardStatusClasses(cardLabel);

          return (
            <li key={participant.id} className="rounded-lg border p-3 text-gray-700">
              <div className="grid grid-cols-2 items-center gap-2">
                {/* ユーザーのアイコン */}
                <img src={participant.userImageUrl} alt="user-icon" className="rounded-full p-2" />
                {/* 投票ステータス */}
                <span className={`justify-self-end rounded p-4 text-sm ${statusClasses}`}>{cardLabel}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ParticipantList;
