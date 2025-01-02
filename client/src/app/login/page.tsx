'use client';

import { useAuth } from '@/state/AuthContext';
import { PATH_PAGE } from '@/util/route';
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
      router.push(PATH_PAGE.home);
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <img src="/image/Icon.png" alt="App Logo" className="mx-auto h-12 w-auto" />
          <h1 className="mt-4 text-2xl font-bold text-gray-700">e-party</h1>
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
