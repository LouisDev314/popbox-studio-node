import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { storeSettings } from '../../db/schema';
import HttpStatusCode from '../../constants/http-status-code';
import Exception from '../../utils/Exception';

const SHIPPING_SETTINGS_KEY = 'shipping';
const STORE_BANNER_SETTINGS_KEY = 'store_banner';
const STORE_BANNER_MESSAGE_MAX_LENGTH = 160;
const STORE_BANNER_LINK_LABEL_MAX_LENGTH = 40;
const STORE_BANNER_LINK_HREF_MAX_LENGTH = 300;

export type ShippingSettings = {
  flatShippingCents: number;
  freeShippingThresholdCents: number;
  currency: 'CAD';
};

export type StoreBannerSettings = {
  enabled: boolean;
  message: string;
  linkLabel: string | null;
  linkHref: string | null;
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

export const DEFAULT_STORE_BANNER_SETTINGS = {
  enabled: true,
  message: 'Free shipping across Canada on orders $149+ CAD · Otherwise flat rate $15.99',
  linkLabel: 'Shipping details',
  linkHref: '/legal/shipping-returns',
} satisfies StoreBannerSettings;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const throwInvalidShippingSettings = (code: number, message: string): never => {
  throw new Exception(code, message);
};

const throwInvalidStoreBannerSettings = (code: number, message: string): never => {
  throw new Exception(code, message);
};

const normalizeOptionalString = (value: unknown, fieldName: string, maxLength: number, code: number) => {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== 'string') {
    return throwInvalidStoreBannerSettings(code, `${fieldName} must be a string or null`);
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (trimmedValue.length > maxLength) {
    return throwInvalidStoreBannerSettings(code, `${fieldName} must be ${maxLength} characters or fewer`);
  }

  return trimmedValue;
};

const isSafeStoreBannerHref = (value: string) => {
  if (value.startsWith('/')) {
    return !value.startsWith('//');
  }

  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
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

const normalizeStoreBannerSettings = (value: unknown, code: number): StoreBannerSettings => {
  if (!isRecord(value)) {
    return throwInvalidStoreBannerSettings(code, 'Store banner settings must be an object');
  }

  const enabled = value.enabled;
  const rawMessage = value.message;

  if (typeof enabled !== 'boolean') {
    return throwInvalidStoreBannerSettings(code, 'Store banner enabled must be a boolean');
  }

  if (typeof rawMessage !== 'string') {
    return throwInvalidStoreBannerSettings(code, 'Store banner message must be a string');
  }

  const message = rawMessage.trim();

  if (message.length > STORE_BANNER_MESSAGE_MAX_LENGTH) {
    return throwInvalidStoreBannerSettings(
      code,
      `Store banner message must be ${STORE_BANNER_MESSAGE_MAX_LENGTH} characters or fewer`,
    );
  }

  if (enabled && !message) {
    return throwInvalidStoreBannerSettings(code, 'Store banner message is required when enabled');
  }

  const linkLabel = normalizeOptionalString(
    value.linkLabel,
    'Store banner link label',
    STORE_BANNER_LINK_LABEL_MAX_LENGTH,
    code,
  );
  const linkHref = normalizeOptionalString(
    value.linkHref,
    'Store banner link href',
    STORE_BANNER_LINK_HREF_MAX_LENGTH,
    code,
  );

  if (linkLabel && !linkHref) {
    return throwInvalidStoreBannerSettings(code, 'Store banner link href is required when link label is provided');
  }

  if (linkHref && !isSafeStoreBannerHref(linkHref)) {
    return throwInvalidStoreBannerSettings(
      code,
      'Store banner link href must be an internal path or a valid https URL',
    );
  }

  return {
    enabled,
    message,
    linkLabel,
    linkHref,
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

export const getStoreBannerSettings = async () => {
  const [existingSettings] = await db
    .select({
      value: storeSettings.value,
    })
    .from(storeSettings)
    .where(eq(storeSettings.key, STORE_BANNER_SETTINGS_KEY))
    .limit(1);

  if (existingSettings) {
    return normalizeStoreBannerSettings(existingSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  const [insertedSettings] = await db
    .insert(storeSettings)
    .values({
      key: STORE_BANNER_SETTINGS_KEY,
      value: DEFAULT_STORE_BANNER_SETTINGS,
    })
    .onConflictDoNothing({
      target: storeSettings.key,
    })
    .returning({
      value: storeSettings.value,
    });

  if (insertedSettings) {
    return normalizeStoreBannerSettings(insertedSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }

  const [recoveredSettings] = await db
    .select({
      value: storeSettings.value,
    })
    .from(storeSettings)
    .where(eq(storeSettings.key, STORE_BANNER_SETTINGS_KEY))
    .limit(1);

  if (!recoveredSettings) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Store banner settings are not configured');
  }

  return normalizeStoreBannerSettings(recoveredSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
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

export const updateStoreBannerSettings = async (payload: unknown) => {
  const settings = normalizeStoreBannerSettings(payload, HttpStatusCode.BAD_REQUEST);
  const [updatedSettings] = await db
    .insert(storeSettings)
    .values({
      key: STORE_BANNER_SETTINGS_KEY,
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
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Store banner settings update failed');
  }

  return normalizeStoreBannerSettings(updatedSettings.value, HttpStatusCode.INTERNAL_SERVER_ERROR);
};
