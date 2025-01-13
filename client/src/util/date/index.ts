// YYYY/MM/DD HH:mm
export const formatDateForDisplay = (isoDate: string) => {
  return new Date(isoDate).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
};
