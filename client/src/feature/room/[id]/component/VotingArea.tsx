const FIBONACCI_VALUES = [1, 2, 3, 5, 8, 13, 21];

interface Props {
  voted: number | undefined;
  handleVote: (value: number) => void;
}

const VotingArea = ({ voted, handleVote }: Props) => {
  return (
    <div className="pt-4">
      <div className="flex flex-wrap gap-2">
        {FIBONACCI_VALUES.map((value) => {
          const isSelected = voted === value;
          const buttonClasses = isSelected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 hover:bg-blue-400';
          return (
            <button key={value} onClick={() => handleVote(value)} className={`rounded p-3 text-white ${buttonClasses}`}>
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VotingArea;
