export const LAST_ONE_PRIZE_CODE = 'LO';

export const normalizeKujiPrizeCode = (prizeCode: string | null | undefined) => prizeCode?.trim().toUpperCase() ?? '';

export const isLastOnePrizeCode = (prizeCode: string | null | undefined) =>
  normalizeKujiPrizeCode(prizeCode) === LAST_ONE_PRIZE_CODE;

export const sanitizeKujiPrizeCodeForStorage = (prizeCode: string) => {
  const trimmedPrizeCode = prizeCode.trim();
  return isLastOnePrizeCode(trimmedPrizeCode) ? LAST_ONE_PRIZE_CODE : trimmedPrizeCode;
};
