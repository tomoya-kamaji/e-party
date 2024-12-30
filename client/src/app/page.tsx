'use client';

import { useFetchUser } from '@/feature/user/api/useFetch';

export const Home = () => {
  const { data: user, error, isLoading } = useFetchUser();

  console.log(user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-700">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">Welcome to the Dashboard</h1>
    </div>
  );
};

export default Home;
