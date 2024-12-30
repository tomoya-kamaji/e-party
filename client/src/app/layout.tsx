import Header from '@/component/layout/Header';
import { AuthProvider } from '@/state/AuthContext';
import React from 'react';
import '../styles/globals.css';
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}