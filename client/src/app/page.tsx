'use client';

import { PATH_PAGE } from '@/util/route';
import { redirect } from 'next/navigation';

/**
 * ホーム画面
 */
export default function Home() {
  redirect(PATH_PAGE.room);
}
