export const contactValidationRules = {
  name: {
    required: 'お名前は必須です',
    maxLength: {
      value: 50,
      message: 'お名前は50文字以内で入力してください',
    },
  },
  email: {
    required: 'メールアドレスは必須です',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '有効なメールアドレスを入力してください',
    },
  },
  message: {
    required: 'お問い合わせ内容は必須です',
    maxLength: {
      value: 1000,
      message: 'お問い合わせ内容は1000文字以内で入力してください',
    },
  },
};
