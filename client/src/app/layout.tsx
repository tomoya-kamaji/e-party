import Header from '@/component/layout/Header';
import { AuthProvider } from '@/state/AuthContext';
import clsx from 'clsx';
import { Noto_Sans_JP } from 'next/font/google';
import React from 'react';

import '../styles/globals.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

/**
 * レイアウト
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={clsx(notoSansJP.variable, 'font-sans')}>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
