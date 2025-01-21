type Format = 'YYYY/MM/DD' | 'YYYY/MM/DD HH:mm';

/**
 * 日付をフォーマット
 */
export const formatDateForDisplay = (isoDate: string, format: Format = 'YYYY/MM/DD') => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString('ja-JP', options);
};
