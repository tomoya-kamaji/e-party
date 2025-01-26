import Header from '@/component/Header';
import { AuthProvider } from '@/state/AuthContext';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
}
