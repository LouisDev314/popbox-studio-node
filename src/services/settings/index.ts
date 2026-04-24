import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { storeSettings } from '../../db/schema';
import HttpStatusCode from '../../constants/http-status-code';
import Exception from '../../utils/Exception';

const SHIPPING_SETTINGS_KEY = 'shipping';

export type ShippingSettings = {
  flatShippingCents: number;
  freeShippingThresholdCents: number;
  currency: 'CAD';
};

export type CalculateShippingInput = {
  subtotalCents: number;
  flatShippingCents: number;
  freeShippingThresholdCents: number;
};

export const DEFAULT_SHIPPING_SETTINGS = {
  flatShippingCents: 1200,
  freeShippingThresholdCents: 14900,
  currency: 'CAD',
} satisfies ShippingSettings;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const throwInvalidShippingSettings = (code: number, message: string): never => {
  throw new Exception(code, message);
};

const normalizeShippingSettings = (value: unknown, code: number): ShippingSettings => {
  if (!isRecord(value)) {
    return throwInvalidShippingSettings(code, 'Shipping settings must be an object');
  }

  const flatShippingCents = value.flatShippingCents;
  const freeShippingThresholdCents = value.freeShippingThresholdCents;
  const currency = value.currency;

  if (
    typeof flatShippingCents !== 'number' ||
    typeof freeShippingThresholdCents !== 'number' ||
    !Number.isInteger(flatShippingCents) ||
    !Number.isInteger(freeShippingThresholdCents)
  ) {
    return throwInvalidShippingSettings(code, 'Shipping settings cents values must be integers');
  }

  if (flatShippingCents < 0 || freeShippingThresholdCents < 0) {
    return throwInvalidShippingSettings(code, 'Shipping settings cents values must be 0 or greater');
  }

  if (currency !== 'CAD') {
    return throwInvalidShippingSettings(code, 'Shipping settings currency must be CAD');
  }

  return {
    flatShippingCents,
    freeShippingThresholdCents,
    currency,
  };
};

export const calculateShippingCents = ({
  subtotalCents,
  flatShippingCents,
  freeShippingThresholdCents,
}: CalculateShippingInput) => {
  if (!Number.isInteger(subtotalCents) || subtotalCents < 0) {
    throw new Error('subtotalCents must be a non-negative integer');
  }

  if (!Number.isInteger(flatShippingCents) || flatShippingCents < 0) {
    throw new Error('flatShippingCents must be a non-negative integer');
  }

  if (!Number.isInteger(freeShippingThresholdCents) || freeShippingThresholdCents < 0) {
    throw new Error('freeShippingThresholdCents must be a non-negative integer');
  }

  return subtotalCents >= freeShippingThresholdCents ? 0 : flatShippingCents;
};

export const getShippingSettings = async () => {
  const [existingSettings] = await db
    .select({
      value: storeSettings.value,
    })
    .from(storeSettings)
    .where(eq(storeSettings.key, SHIPPING_SETTINGS_KEY))
    .limit(1);

  if (existingSettings) {
    return normalizeShippingSettings(existingSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  const [insertedSettings] = await db
    .insert(storeSettings)
    .values({
      key: SHIPPING_SETTINGS_KEY,
      value: DEFAULT_SHIPPING_SETTINGS,
    })
    .onConflictDoNothing({
      target: storeSettings.key,
    })
    .returning({
      value: storeSettings.value,
    });

  if (insertedSettings) {
    return normalizeShippingSettings(insertedSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  const [recoveredSettings] = await db
    .select({
      value: storeSettings.value,
    })
    .from(storeSettings)
    .where(eq(storeSettings.key, SHIPPING_SETTINGS_KEY))
    .limit(1);

  if (!recoveredSettings) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Shipping settings are not configured');
  }

  return normalizeShippingSettings(recoveredSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
};

export const updateShippingSettings = async (payload: unknown) => {
  const settings = normalizeShippingSettings(payload, HttpStatusCode.BAD_REQUEST);
  const [updatedSettings] = await db
    .insert(storeSettings)
    .values({
      key: SHIPPING_SETTINGS_KEY,
      value: settings,
    })
    .onConflictDoUpdate({
      target: storeSettings.key,
      set: {
        value: settings,
      },
    })
    .returning({
      value: storeSettings.value,
    });

  if (!updatedSettings) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Shipping settings update failed');
  }

  return normalizeShippingSettings(updatedSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
};
