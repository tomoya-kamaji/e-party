'use client';

import { useContactForm } from './_hooks/useContactForm';

export default function ContactPage() {
  const { register, handleSubmit, errors, isSubmitting, submitStatus, onSubmit } = useContactForm();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-8 text-3xl font-bold">お問い合わせ</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input id="name" type="text" {...register('name')} className="w-full rounded border p-2" />
          {errors.name && <p className="mt-1 text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input id="email" type="email" {...register('email')} className="w-full rounded border p-2" />
          {errors.email && <p className="mt-1 text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block">
            お問い合わせ内容 <span className="text-red-500">*</span>
          </label>
          <textarea id="message" {...register('message')} className="h-32 w-full rounded border p-2" />
          {errors.message && <p className="mt-1 text-red-500">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? '送信中...' : '確認画面へ'}
        </button>
      </form>

      {submitStatus === 'success' && <p className="mt-4 text-green-500">お問い合わせを受け付けました。</p>}
      {submitStatus === 'error' && (
        <p className="mt-4 text-red-500">送信に失敗しました。時間をおいて再度お試しください。</p>
      )}
    </div>
  );
}
