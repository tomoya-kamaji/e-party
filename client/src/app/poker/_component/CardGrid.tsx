type CardGridProps = {
  cards: number[];
  onCardClick: (value: number) => void;
};

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-20 gap-2 mb-6">
      {cards.map((value) => (
        <button
          key={value}
          onClick={() => onCardClick(value)}
          className="bg-card hover:bg-card-hover text-text-primary rounded-lg p-4 shadow-md transition transform hover:scale-105"
        >
          {value}
        </button>
      ))}
    </div>
  );
};
