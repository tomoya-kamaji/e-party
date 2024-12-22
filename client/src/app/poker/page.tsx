'use client';

import { CardGrid } from './_component/CardGrid';

export default function Home() {
  const handleCardClick = (value: number) => {
    alert(`You selected: ${value}`);
  };
  const cards = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];

  return (
    <div className="bg-background min-h-screen text-text-primary flex flex-col items-center py-10 px-4">
      {/* Main Container */}
      <main className="bg-card shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl">
        {/* Title and Dropdown */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Choose your estimate...</h2>
          <select className="bg-card-hover text-text-primary p-2 rounded border border-gray-300 shadow-sm">
            <option>Fibonacci</option>
          </select>
        </div>

        {/* Card Grid */}
        <CardGrid cards={cards} onCardClick={handleCardClick} />

        {/* Status and Estimate */}
        <div className="mb-6">
          <div className="p-4 bg-accent-green text-white rounded mb-2 shadow">You are a voter</div>
          <p className="text-text-muted">You haven't estimated yet</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button className="bg-card-hover text-text-primary py-2 px-4 rounded shadow hover:bg-card">Reset</button>
          <button className="bg-accent-blue text-white py-2 px-4 rounded shadow hover:bg-blue-600">Reveal</button>
        </div>
      </main>
    </div>
  );
}
