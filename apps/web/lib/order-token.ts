'use client';

import { ORDER_TOKEN_STORAGE_KEY } from './store';

type OrderTokenMap = Record<string, string>;

const readTokenMap = (): OrderTokenMap => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(ORDER_TOKEN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OrderTokenMap) : {};
  } catch {
    return {};
  }
};

export const saveOrderToken = (publicId: string, token: string) => {
  const current = readTokenMap();
  current[publicId] = token;
  window.localStorage.setItem(ORDER_TOKEN_STORAGE_KEY, JSON.stringify(current));
};

export const getOrderToken = (publicId: string) => {
  const current = readTokenMap();
  return current[publicId] ?? '';
};
