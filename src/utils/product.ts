import { randomUUID } from 'crypto';
import slugify from './slugify';
import getEnvConfig from '../config/env';
import { and, eq, sql } from 'drizzle-orm';
import { collections, kujiPrizes, productInventory, products, productTags, tags } from '../db/schema';
import { db } from '../db';
import Exception from './Exception';
import HttpStatusCode from '../constants/http-status-code';
import { LAST_ONE_PRIZE_CODE } from './kuji';

const assertInventoryNotBelowReserved = (onHand: number, reserved: number) => {
  if (onHand < reserved) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Inventory onHand cannot be lower than reserved inventory');
  }
};

export const buildStoragePath = (
  productId: string,
  fileName: string,
  options?: {
    subdirectory?: string;
    unique?: boolean;
  },
) => {
  const fileSlug = slugify(fileName) || 'image';
  const pathSegments = ['products', productId];

  if (options?.subdirectory) {
    pathSegments.push(slugify(options.subdirectory) || options.subdirectory);
  }

  pathSegments.push(options?.unique ? `${randomUUID()}-${fileSlug}` : fileSlug);
  return pathSegments.join('/');
};

// Supabase storage
export const buildImageUrl = (storageKey: string) => {
  const cleanPath = storageKey.startsWith('/') ? storageKey.slice(1) : storageKey;
  return `${getEnvConfig().supabaseUrl}/storage/v1/object/public/${getEnvConfig().supabaseStorageBucket}/${cleanPath}`;
};

export const isMissingStorageBucket = (error: { message?: string } | null) => {
  const message = error?.message?.toLowerCase() ?? '';
  return message.includes('bucket') && message.includes('not found');
};

export const throwStorageFailure = (message: string, error: { message?: string } | null) => {
  if (!error) return;

  if (isMissingStorageBucket(error)) {
    throw new Exception(
      HttpStatusCode.SERVICE_UNAVAILABLE,
      `Storage bucket "${getEnvConfig().supabaseStorageBucket}" is not provisioned`,
      {
        data: error,
      },
    );
  }

  throw new Exception(HttpStatusCode.BAD_GATEWAY, message, { data: error });
};

export const ensureUniqueSlug = async (
  table: typeof products | typeof collections | typeof tags,
  rawValue: string,
  currentId?: string,
) => {
  const base = slugify(rawValue);
  let nextSlug = base;
  let attempt = 1;

  while (true) {
    const rows = await db.select().from(table).where(eq(table.slug, nextSlug)).limit(1);
    const match = rows[0];

    if (!match || ('id' in match && match.id === currentId)) {
      return nextSlug;
    }

    attempt += 1;
    nextSlug = `${base}-${attempt}`;
  }
};

export const ensureKujiInventoryRecord = async (productId: string) => {
  const [sumRow] = await db
    .select({
      remaining: sql<number>`COALESCE(sum(${kujiPrizes.remainingQuantity}), 0)::int`,
    })
    .from(kujiPrizes)
    .where(
      and(
        eq(kujiPrizes.productId, productId),
        sql`UPPER(BTRIM(${kujiPrizes.prizeCode})) <> ${LAST_ONE_PRIZE_CODE}`,
      ),
    );

  const totalRemaining = sumRow?.remaining ?? 0;
  const [existingInventory] = await db
    .select()
    .from(productInventory)
    .where(eq(productInventory.productId, productId))
    .limit(1);

  if (existingInventory) {
    assertInventoryNotBelowReserved(totalRemaining, existingInventory.reserved);
    return;
  }

  await db.insert(productInventory).values({
    productId,
    onHand: 0,
    reserved: 0,
    lowStockThreshold: 0,
  });
};

export const assertProductExists = async (productId: string) => {
  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);

  if (!product) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Product not found');
  }

  return product;
};

export const replaceProductTags = async (productId: string, tagIds: string[]) => {
  await db.delete(productTags).where(eq(productTags.productId, productId));

  if (!tagIds.length) return;

  await db.insert(productTags).values(
    tagIds.map((tagId) => ({
      productId,
      tagId,
    })),
  );
};
