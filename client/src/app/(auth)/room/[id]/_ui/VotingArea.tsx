const FIBONACCI_VALUES = [1, 2, 3, 5, 8, 13, 21];

interface Props {
  voted: number | undefined;
  handleVote: (value: number) => void;
}

const VotingArea = ({ voted, handleVote }: Props) => {
  const isSelected = (value: number) => voted === value;

  return (
    <div className="flex flex-wrap gap-2">
      {FIBONACCI_VALUES.map((value) => {
        const buttonClasses = isSelected(value)
          ? 'bg-[#4398A9] text-white font-bold'
          : 'bg-gray-300 hover:bg-gray-400 text-gray-800';
        return (
          <button key={value} onClick={() => handleVote(value)} className={`rounded px-4 py-4 ${buttonClasses}`}>
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default VotingArea;
