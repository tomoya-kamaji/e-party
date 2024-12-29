'use client';

import { useAuth } from '@/state/AuthContext';
import { honoClient } from '@/util/api';

export const Home = async () => {
  const { session } = useAuth();
  const res = await honoClient.api.pokers.$get();
  console.log(res);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">Welcome to the Dashboard</h1>
    </div>
  );
};

export default Home;
