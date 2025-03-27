
/**
 * 値がnull or undefinedでないかどうかを判定する
 */
export const isNotNullish = (value: number | null | undefined): boolean => {
  return value !== null && value !== undefined;
};
