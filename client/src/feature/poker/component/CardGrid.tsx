type CardGridProps = {
  cards: number[];
  onCardClick: (value: number) => void;
};

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="mb-6 grid grid-cols-12 gap-1">
      {cards.map((value) => (
        <button
          key={value}
          onClick={() => onCardClick(value)}
          className="card hover:card-hover w-12 transform rounded-lg border p-2 shadow-md transition hover:scale-105"
        >
          {value}
        </button>
      ))}
    </div>
  );
};
