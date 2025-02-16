import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, { message: 'お名前は必須です' }).max(50, { message: 'お名前は50文字以内で入力してください' }),
  email: z
    .string()
    .min(1, { message: 'メールアドレスは必須です' })
    .email({ message: '有効なメールアドレスを入力してください' }),
  message: z
    .string()
    .min(1, { message: 'お問い合わせ内容は必須です' })
    .max(1000, { message: 'お問い合わせ内容は1000文字以内で入力してください' }),
});

export type FormData = z.infer<typeof contactSchema>;

export type SubmitStatus = 'success' | 'error' | null;
