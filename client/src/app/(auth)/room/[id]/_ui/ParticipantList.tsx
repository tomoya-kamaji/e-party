import { Participant, hasVoted } from '@/feature/room/model/participant';
import { useRoomAction } from '@/repository/api/room';
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/react/24/solid';

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

  /**
   * 投票休止にする
   */
  const handlePause = (participantId: string) => {
    if (confirm(`投票を休止させますか？${participantId}`)) {
      switchPaused(roomId, participantId, true);
    }
  };

  /**
   * 投票休止解除
   */
  const handleResume = (participantId: string) => {
    if (confirm(`投票を休止解除しますか？${participantId}`)) {
      switchPaused(roomId, participantId, false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {participants.map((participant) => {
        let cardLabel = '未';
        if (hasVoted(participant)) {
          cardLabel = isRevealed ? String(participant.value) : '済';
        }
        const statusClasses = getCardStatusClasses(cardLabel);

        return (
          <div
            key={participant.id}
            className={`flex items-center rounded-lg p-4 shadow-md ${
              participant.isPaused ? 'border-2 border-dashed border-gray-300 bg-gray-100' : 'bg-white'
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={participant.userImageUrl || '/placeholder.svg'}
                  alt="user-icon"
                  className={`h-12 w-12 rounded-full ${participant.isPaused ? 'opacity-60' : ''}`}
                />
                {participant.isPaused && (
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-500">
                    投票休止中
                  </span>
                )}
              </div>

              {/* カードの表示 */}
              <div className="flex items-center gap-3">
                <p className={`text-xl font-semibold ${statusClasses} min-w-[40px] p-2 text-center`}>{cardLabel}</p>

                {participant.isPaused ? (
                  <button
                    onClick={() => handleResume(participant.id)}
                    className="p-1 text-green-600 transition-colors hover:text-green-700"
                    aria-label="投票を再開"
                    title="投票を再開"
                  >
                    <PauseCircleIcon className="h-6 w-6" />
                  </button>
                ) : (
                  <button
                    onClick={() => handlePause(participant.id)}
                    className="p-1 text-gray-600 transition-colors hover:text-gray-700"
                    aria-label="投票を休止"
                    title="投票を休止"
                  >
                    <PlayCircleIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ParticipantList;
