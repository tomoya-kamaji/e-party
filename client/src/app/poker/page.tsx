'use client';

import { CardGrid } from './_component/CardGrid';

export default function Home() {
  const handleCardClick = (value: number) => {
    alert(`You selected: ${value}`);
  };
  const cards = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];

  return (
    <div className="bg-background min-h-screen text-text-primary flex flex-col items-center py-10 px-4">
      {/* メインコンテンツ */}
      <main className="bg-card shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl">
        {/* タイトルとドロップダウン */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">見積もりを選んでください</h2>
          <select className="bg-card-hover text-text-primary p-2 rounded border border-gray-300 shadow-sm">
            <option>Fibonacci</option>
          </select>
        </div>

        {/* カードグリッド */}
        <CardGrid cards={cards} onCardClick={handleCardClick} />

        {/* ステータスと見積もり */}
        <div className="mb-6">
          <div className="p-4 bg-accent-green text-white rounded mb-2 shadow">あなたは投票者です</div>
          <p className="text-text-muted">見積もりがまだ選択されていません</p>
        </div>

        {/* アクションボタン */}
        <div className="flex justify-between">
          <button className="bg-card-hover text-text-primary py-2 px-4 rounded shadow hover:bg-card">リセット</button>
          <button className="bg-accent-blue text-white py-2 px-4 rounded shadow hover:bg-blue-600">送信</button>
        </div>
      </main>
    </div>
  );
}
