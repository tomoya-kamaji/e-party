'use client';

import { useAuth } from '@/state/AuthContext';

export const Home = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user ? `Welcome, ${user.name}` : ''}
    </div>
  );
};

export default Home;
