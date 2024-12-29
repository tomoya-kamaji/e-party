'use client';

import { useAuth } from '@/state/AuthContext';
import { supabase } from '@/util/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Login = () => {
  const { session } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <img src="/logo.svg" alt="App Logo" className="mx-auto h-12 w-auto" />
          <h1 className="text-2xl font-bold text-gray-700 mt-4">Welcome to Our App</h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={['google']}
        />
      </div>
    </div>
  );
};

export default Login;
