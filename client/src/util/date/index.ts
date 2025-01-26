/**
 * 日付をフォーマット
 */
export const formatDateForDisplay = (isoDate: string) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString('ja-JP', options);
};
