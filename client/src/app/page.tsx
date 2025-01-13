'use client';

import RoomList from '@/feature/home/component/CreateRoom';
import { useAuth } from '@/state/AuthContext';

/**
 * ホーム画面
 */
export const Home = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <RoomList />
      {user ? `Welcome, ${user.name}` : ''}
    </div>
  );
};

export default Home;
