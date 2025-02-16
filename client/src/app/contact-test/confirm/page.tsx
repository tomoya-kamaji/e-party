'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormData } from '../_states/contact';

export default function ContactConfirmPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const formData = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    message: searchParams.get('message') || '',
  } as FormData;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // ここにAPI送信のロジックを実装
      console.log(formData);
      router.push('/contact/complete');
    } catch (error) {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-3xl font-bold">入力内容の確認</h1>

      <div className="space-y-6">
        <div>
          <p className="mb-2 font-bold">お名前</p>
          <p className="rounded bg-gray-100 p-2">{formData.name}</p>
        </div>

        <div>
          <p className="mb-2 font-bold">メールアドレス</p>
          <p className="rounded bg-gray-100 p-2">{formData.email}</p>
        </div>

        <div>
          <p className="mb-2 font-bold">お問い合わせ内容</p>
          <p className="whitespace-pre-wrap rounded bg-gray-100 p-2">{formData.message}</p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded border border-gray-300 px-6 py-2 hover:bg-gray-100"
          >
            修正する
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>
        </div>
      </div>
    </div>
  );
}
