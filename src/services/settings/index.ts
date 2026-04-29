import { randomUUID } from 'crypto';
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
const STORE_BANNER_MAX_ITEMS = 5;

export type ShippingSettings = {
  flatShippingCents: number;
  freeShippingThresholdCents: number;
  currency: 'CAD';
};

export type StoreBannerItem = {
  id: string;
  message: string;
  linkLabel: string | null;
  linkHref: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type StoreBannerSettings = {
  enabled: boolean;
  items: StoreBannerItem[];
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
  items: [
    {
      id: '00000000-0000-4000-8000-000000000001',
      message: 'Free shipping across Canada on orders $149+ CAD · Otherwise flat rate $15.99',
      linkLabel: 'Shipping details',
      linkHref: '/legal/shipping-returns',
      sortOrder: 0,
      isActive: true,
    },
  ],
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

const normalizeStoreBannerItem = (value: unknown, code: number): StoreBannerItem => {
  if (!isRecord(value)) {
    return throwInvalidStoreBannerSettings(code, 'Store banner item must be an object');
  }

  const rawId = value.id;
  const id = rawId === undefined || rawId === null ? randomUUID() : rawId;

  if (typeof id !== 'string') {
    return throwInvalidStoreBannerSettings(code, 'Store banner item id must be a string');
  }

  const normalizedId = id.trim() || randomUUID();

  if (typeof value.message !== 'string') {
    return throwInvalidStoreBannerSettings(code, 'Store banner item message must be a string');
  }

  const message = value.message.trim();

  if (!message) {
    return throwInvalidStoreBannerSettings(code, 'Store banner item message is required');
  }

  if (message.length > STORE_BANNER_MESSAGE_MAX_LENGTH) {
    return throwInvalidStoreBannerSettings(
      code,
      `Store banner item message must be ${STORE_BANNER_MESSAGE_MAX_LENGTH} characters or fewer`,
    );
  }

  const linkLabel = normalizeOptionalString(
    value.linkLabel,
    'Store banner item link label',
    STORE_BANNER_LINK_LABEL_MAX_LENGTH,
    code,
  );
  const linkHref = normalizeOptionalString(
    value.linkHref,
    'Store banner item link href',
    STORE_BANNER_LINK_HREF_MAX_LENGTH,
    code,
  );

  if (linkLabel && !linkHref) {
    return throwInvalidStoreBannerSettings(code, 'Store banner item link href is required when link label is provided');
  }

  if (linkHref && !isSafeStoreBannerHref(linkHref)) {
    return throwInvalidStoreBannerSettings(
      code,
      'Store banner item link href must be an internal path or a valid https URL',
    );
  }

  if (typeof value.sortOrder !== 'number' || !Number.isInteger(value.sortOrder) || value.sortOrder < 0) {
    return throwInvalidStoreBannerSettings(code, 'Store banner item sort order must be an integer 0 or greater');
  }

  if (typeof value.isActive !== 'boolean') {
    return throwInvalidStoreBannerSettings(code, 'Store banner item active state must be a boolean');
  }

  return {
    id: normalizedId,
    message,
    linkLabel,
    linkHref,
    sortOrder: value.sortOrder,
    isActive: value.isActive,
  };
};

const normalizeLegacyStoreBannerSettings = (
  value: Record<string, unknown>,
  enabled: boolean,
  code: number,
): StoreBannerSettings => {
  const rawMessage = value.message;

  if (rawMessage === undefined || rawMessage === null) {
    return {
      enabled,
      items: [],
    };
  }

  if (typeof rawMessage !== 'string') {
    return throwInvalidStoreBannerSettings(code, 'Store banner message must be a string');
  }

  const message = rawMessage.trim();

  if (!message) {
    return {
      enabled,
      items: [],
    };
  }

  return {
    enabled,
    items: [
      normalizeStoreBannerItem(
        {
          id: value.id,
          message,
          linkLabel: value.linkLabel,
          linkHref: value.linkHref,
          sortOrder: 0,
          isActive: true,
        },
        code,
      ),
    ],
  };
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

  if (typeof enabled !== 'boolean') {
    return throwInvalidStoreBannerSettings(code, 'Store banner enabled must be a boolean');
  }

  if (!('items' in value) && 'message' in value) {
    return normalizeLegacyStoreBannerSettings(value, enabled, code);
  }

  if (!Array.isArray(value.items)) {
    return throwInvalidStoreBannerSettings(code, 'Store banner items must be an array');
  }

  if (value.items.length > STORE_BANNER_MAX_ITEMS) {
    return throwInvalidStoreBannerSettings(code, `Store banner items must include ${STORE_BANNER_MAX_ITEMS} items or fewer`);
  }

  const items = value.items
    .map((item, index) => ({
      item: normalizeStoreBannerItem(item, code),
      index,
    }))
    .sort((left, right) => left.item.sortOrder - right.item.sortOrder || left.index - right.index)
    .map(({ item }) => item);

  return {
    enabled,
    items,
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
