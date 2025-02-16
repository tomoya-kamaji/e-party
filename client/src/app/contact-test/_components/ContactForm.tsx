'use client';

import { useContactForm } from '../_hooks/useContactForm';

export const ContactForm = () => {
  const { register, handleSubmit, errors, isSubmitting, submitStatus, onSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input id="name" type="text" {...register('name')} className="w-full rounded border p-2" />
        {errors.name && <p className="mt-1 text-red-500">{errors.name.message}</p>}
      </div>

      {/* email, messageフィールドも同様 */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSubmitting ? '送信中...' : '確認画面へ'}
      </button>
    </form>
  );
};
