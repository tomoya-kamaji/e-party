'use client';

import { useAuth } from '@/state/AuthContext';

export const Home = async () => {
  const { session } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">Welcome to the Dashboard</h1>
    </div>
  );
};

export default Home;
