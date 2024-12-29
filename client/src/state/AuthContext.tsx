'use client';

import { supabase } from '@/util/supabase/client';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';

// Contextの型定義
interface AuthContextType {
  session: Session | null;
  signOut: () => void;
}

// Contextの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Providerコンポーネント
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  // セッションの変化を監視
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    // 初期セッションの取得
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = () => {
    supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{ session, signOut }}>{children}</AuthContext.Provider>;
};

// カスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
