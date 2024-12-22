type CardGridProps = {
  cards: number[];
  onCardClick: (value: number) => void;
};

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-12 gap-1 mb-6">
      {cards.map((value) => (
        <button
          key={value}
          onClick={() => onCardClick(value)}
          className="card hover:card-hover w-12 rounded-lg p-2 shadow-md transition transform hover:scale-105 border"
        >
          {value}
        </button>
      ))}
    </div>
  );
};
