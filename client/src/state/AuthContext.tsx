'use client';

import { useFetchUser } from '@/feature/user/api/useFetch';
import { PATH_PAGE } from '@/util/route';
import { supabase } from '@/util/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

// Contextの型定義
interface AuthContextType {
  session: Session | undefined;
  user: User | undefined;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 認証プロバイダー
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const { data } = useFetchUser();

  // セッションの変化を監視
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session || undefined);
    });

    // 初期セッションの取得
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || undefined);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ユーザー情報の取得
  useEffect(() => {
    if (data) {
      setUser(data.user);
      router.push(PATH_PAGE.home);
    }
    // なければログイン画面へ
    else {
      router.push(PATH_PAGE.login);
    }
  }, [data]);

  const signOut = () => {
    supabase.auth.signOut();
    router.push(PATH_PAGE.login);
  };

  return <AuthContext.Provider value={{ session, user, signOut }}>{children}</AuthContext.Provider>;
};

// カスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
