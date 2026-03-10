import { DEFAULT_LIMIT, MAX_LIMIT } from '../constants/pagination';

export const clampLimit = (limit?: number) => {
  if (!limit || Number.isNaN(limit)) return DEFAULT_LIMIT;
  return Math.min(Math.max(limit, 1), MAX_LIMIT);
};
