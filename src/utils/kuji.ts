export const LAST_ONE_PRIZE_TIER = 'LO';

const normalizeKujiPrizeIdentifier = (value: string | null | undefined) => value?.trim().toUpperCase() ?? '';

export const normalizeKujiPrizeCode = normalizeKujiPrizeIdentifier;

export const normalizeKujiPrizeTier = normalizeKujiPrizeIdentifier;

export const isLastOnePrizeTier = (prizeTier: string | null | undefined) =>
  normalizeKujiPrizeTier(prizeTier) === LAST_ONE_PRIZE_TIER;

export const sanitizeKujiPrizeCodeForStorage = (prizeCode: string) => {
  return normalizeKujiPrizeCode(prizeCode);
};

export const sanitizeKujiPrizeTierForStorage = (prizeTier: string) => {
  return normalizeKujiPrizeTier(prizeTier);
};
