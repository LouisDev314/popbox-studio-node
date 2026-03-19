import { and, asc, desc, eq, inArray, sql } from 'drizzle-orm';
import { supabaseAdmin } from '../../integrations/supabase';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import { DbClient } from '../../types/checkout';
import { collections, kujiPrizes, productImages, productInventory, products, tags } from '../../db/schema';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { decodeCursor, encodeCursor } from '../../utils/cursor';
import { listProducts } from '../product';
import { clampLimit } from '../../utils/limit';
import {
  assertProductExists,
  buildStoragePath,
  ensureUniqueSlug,
  replaceProductTags,
  syncKujiInventory,
  throwStorageFailure,
} from '../../utils/product';
import { mapProductImage, rollbackUploadedProductImages, validateProductImageFiles } from './helpers';

type CursorPayload = {
  createdAt: string;
  id: string;
};

const assertInventoryNotBelowReserved = (onHand: number, reserved: number) => {
  if (onHand < reserved) {
    throw new Exception(HttpStatusCode.CONFLICT, 'Inventory onHand cannot be lower than reserved inventory');
  }
};

const assertKujiPrizeQuantitiesAreValid = (initialQuantity: number, remainingQuantity: number) => {
  if (remainingQuantity > initialQuantity) {
    throw new Exception(
      HttpStatusCode.CONFLICT,
      'Kuji prize remainingQuantity cannot be greater than initialQuantity',
    );
  }
};

const syncKujiInventoryWithinTx = async (tx: DbClient, productId: string) => {
  const [sumRow] = await tx
    .select({
      remaining: sql<number>`COALESCE(sum(${kujiPrizes.remainingQuantity}), 0)::int`,
    })
    .from(kujiPrizes)
    .where(eq(kujiPrizes.productId, productId));

  const totalRemaining = sumRow?.remaining ?? 0;
  const inventoryResult = await tx.execute<{ onHand: number; reserved: number }>(sql`
    SELECT on_hand AS "onHand", reserved
    FROM product_inventory
    WHERE product_id = ${productId}
    FOR UPDATE
  `);
  const existingInventory = inventoryResult[0];

  if (existingInventory) {
    assertInventoryNotBelowReserved(totalRemaining, Number(existingInventory.reserved));

    await tx
      .update(productInventory)
      .set({
        onHand: totalRemaining,
      })
      .where(eq(productInventory.productId, productId));

    return;
  }

  await tx.insert(productInventory).values({
    productId,
    onHand: totalRemaining,
    reserved: 0,
    lowStockThreshold: 0,
  });
};

export const listAdminProducts = async (filters: {
  status?: 'draft' | 'active' | 'archived';
  cursor?: string;
  limit?: number;
}) => {
  if (filters.status) {
    const productFilters: Parameters<typeof listProducts>[0] = {
      status: filters.status,
    };

    if (filters.cursor) productFilters.cursor = filters.cursor;
    if (filters.limit !== undefined) productFilters.limit = filters.limit;

    return listProducts(productFilters);
  }

  const limit = clampLimit(filters.limit);
  const cursor = decodeCursor<CursorPayload>(filters.cursor);
  const conditions = [];

  if (cursor) {
    conditions.push(
      sql`(${products.createdAt} < ${new Date(cursor.createdAt)} OR (${products.createdAt} = ${new Date(cursor.createdAt)} AND ${products.id} < ${cursor.id}))`,
    );
  }

  const rows = await db
    .select({
      product: products,
      collection: collections,
      inventory: productInventory,
    })
    .from(products)
    .leftJoin(collections, eq(collections.id, products.collectionId))
    .leftJoin(productInventory, eq(productInventory.productId, products.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(products.createdAt), desc(products.id))
    .limit(limit + 1);

  const pageRows = rows.slice(0, limit);
  const lastRow = pageRows.at(-1);

  return {
    items: pageRows.map((row) => ({
      id: row.product.id,
      name: row.product.name,
      slug: row.product.slug,
      productType: row.product.productType,
      status: row.product.status,
      priceCents: row.product.priceCents,
      currency: row.product.currency,
      sku: row.product.sku,
      collection: row.collection
        ? {
            id: row.collection.id,
            name: row.collection.name,
            slug: row.collection.slug,
          }
        : null,
      inventory: row.inventory
        ? {
            onHand: row.inventory.onHand,
            reserved: row.inventory.reserved,
            lowStockThreshold: row.inventory.lowStockThreshold,
          }
        : null,
      createdAt: row.product.createdAt,
      updatedAt: row.product.updatedAt,
    })),
    nextCursor:
      rows.length > limit && lastRow
        ? encodeCursor({
            id: lastRow.product.id,
            createdAt: lastRow.product.createdAt.toISOString(),
          })
        : null,
  };
};

export const createProduct = async (payload: {
  collectionId?: string | null;
  name: string;
  description?: string | null;
  productType: 'standard' | 'kuji';
  status: 'draft' | 'active' | 'archived';
  priceCents: number;
  currency?: string;
  sku?: string | null;
  tagIds?: string[];
  lowStockThreshold?: number;
  onHand?: number;
}) => {
  const slug = await ensureUniqueSlug(products, payload.name);

  const [product] = await db
    .insert(products)
    .values({
      collectionId: payload.collectionId ?? null,
      name: payload.name,
      slug,
      description: payload.description ?? null,
      productType: payload.productType,
      status: payload.status,
      priceCents: payload.priceCents,
      currency: payload.currency ?? 'CAD',
      sku: payload.sku ?? null,
    })
    .returning();

  if (!product) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Product creation failed');
  }

  await replaceProductTags(product.id, payload.tagIds ?? []);
  await db.insert(productInventory).values({
    productId: product.id,
    onHand: payload.productType === 'kuji' ? 0 : Math.max(payload.onHand ?? 0, 0),
    reserved: 0,
    lowStockThreshold: Math.max(payload.lowStockThreshold ?? 0, 0),
  });

  return product;
};

export const updateProduct = async (
  productId: string,
  payload: Partial<{
    collectionId: string | null;
    name: string;
    description: string | null;
    productType: 'standard' | 'kuji';
    status: 'draft' | 'active' | 'archived';
    priceCents: number;
    currency: string;
    sku: string | null;
    tagIds: string[];
    lowStockThreshold: number;
  }>,
) => {
  const existingProduct = await assertProductExists(productId);
  const nextSlug = payload.name ? await ensureUniqueSlug(products, payload.name, productId) : existingProduct.slug;

  const [updated] = await db
    .update(products)
    .set({
      collectionId: payload.collectionId === undefined ? existingProduct.collectionId : payload.collectionId,
      name: payload.name ?? existingProduct.name,
      slug: nextSlug,
      description: payload.description === undefined ? existingProduct.description : payload.description,
      productType: payload.productType ?? existingProduct.productType,
      status: payload.status ?? existingProduct.status,
      priceCents: payload.priceCents ?? existingProduct.priceCents,
      currency: payload.currency ?? existingProduct.currency,
      sku: payload.sku === undefined ? existingProduct.sku : payload.sku,
    })
    .where(eq(products.id, productId))
    .returning();

  if (payload.tagIds) {
    await replaceProductTags(productId, payload.tagIds);
  }

  if (payload.lowStockThreshold !== undefined) {
    await db
      .update(productInventory)
      .set({
        lowStockThreshold: Math.max(payload.lowStockThreshold, 0),
      })
      .where(eq(productInventory.productId, productId));
  }

  if ((payload.productType ?? existingProduct.productType) === 'kuji') {
    await syncKujiInventory(productId);
  }

  return updated;
};

export const uploadProductImages = async (
  productId: string,
  files: Express.Multer.File[],
  metadata?: {
    altTexts?: Array<string | null | undefined>;
  },
) => {
  await assertProductExists(productId);
  validateProductImageFiles(files);

  const altTexts = metadata?.altTexts ?? [];
  if (altTexts.length > 0 && altTexts.length !== files.length) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'altTexts must match the number of uploaded files');
  }

  const [lastImage] = await db
    .select({
      sortOrder: sql<number>`COALESCE(MAX(${productImages.sortOrder}), 0)::int`,
    })
    .from(productImages)
    .where(eq(productImages.productId, productId));

  const uploadedStorageKeys: string[] = [];
  const pendingImages: Array<{
    productId: string;
    storageKey: string;
    altText: string | null;
    sortOrder: number;
  }> = [];

  try {
    for (const [index, file] of files.entries()) {
      const storageKey = buildStoragePath(productId, file.originalname);
      const { error } = await supabaseAdmin.storage
        .from(getEnvConfig().supabaseStorageBucket)
        .upload(storageKey, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      throwStorageFailure('Unable to upload image', error);

      uploadedStorageKeys.push(storageKey);
      pendingImages.push({
        productId,
        storageKey,
        altText: altTexts[index] ?? null,
        sortOrder: (lastImage?.sortOrder ?? 0) + index + 1,
      });
    }
  } catch (error) {
    await rollbackUploadedProductImages(productId, uploadedStorageKeys, error);
    throw error;
  }

  try {
    const insertedImages = await db.transaction(async (tx) => {
      const rows = await tx.insert(productImages).values(pendingImages).returning();

      if (rows.length !== pendingImages.length) {
        throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Image record creation failed');
      }

      return rows;
    });

    return {
      images: insertedImages.map(mapProductImage),
    };
  } catch (error) {
    await rollbackUploadedProductImages(productId, uploadedStorageKeys, error);
    throw error;
  }
};

export const reorderProductImages = async (productId: string, imageIds: string[]) => {
  const rows = await db
    .select()
    .from(productImages)
    .where(and(eq(productImages.productId, productId), inArray(productImages.id, imageIds)));

  if (rows.length !== imageIds.length) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'One or more product images were not found');
  }

  await Promise.all(
    imageIds.map((imageId, index) =>
      db
        .update(productImages)
        .set({
          sortOrder: index + 1,
        })
        .where(and(eq(productImages.id, imageId), eq(productImages.productId, productId))),
    ),
  );

  return db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId))
    .orderBy(asc(productImages.sortOrder), asc(productImages.id));
};

export const deleteProductImage = async (productId: string, imageId: string) => {
  const [image] = await db
    .select()
    .from(productImages)
    .where(and(eq(productImages.id, imageId), eq(productImages.productId, productId)))
    .limit(1);

  if (!image) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Product image not found');
  }

  const { error } = await supabaseAdmin.storage.from(getEnvConfig().supabaseStorageBucket).remove([image.storageKey]);
  throwStorageFailure('Unable to remove image from storage', error);

  await db.delete(productImages).where(eq(productImages.id, imageId));
  return {
    id: imageId,
    deleted: true,
  };
};

export const listAdminCollections = async () => {
  return db.select().from(collections).orderBy(asc(collections.sortOrder), asc(collections.id));
};

export const createCollection = async (payload: {
  name: string;
  description?: string | null;
  sortOrder?: number;
  isActive?: boolean;
}) => {
  const slug = await ensureUniqueSlug(collections, payload.name);

  const [collection] = await db
    .insert(collections)
    .values({
      name: payload.name,
      slug,
      description: payload.description ?? null,
      sortOrder: payload.sortOrder ?? 0,
      isActive: payload.isActive ?? true,
    })
    .returning();

  if (!collection) {
    throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Collection creation failed');
  }

  return collection;
};

export const updateCollection = async (
  collectionId: string,
  payload: Partial<{
    name: string;
    description: string | null;
    sortOrder: number;
    isActive: boolean;
  }>,
) => {
  const [existing] = await db.select().from(collections).where(eq(collections.id, collectionId)).limit(1);

  if (!existing) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Collection not found');
  }

  const slug = payload.name ? await ensureUniqueSlug(collections, payload.name, collectionId) : existing.slug;

  const [updated] = await db
    .update(collections)
    .set({
      name: payload.name ?? existing.name,
      slug,
      description: payload.description === undefined ? existing.description : payload.description,
      sortOrder: payload.sortOrder ?? existing.sortOrder,
      isActive: payload.isActive ?? existing.isActive,
    })
    .where(eq(collections.id, collectionId))
    .returning();

  return updated;
};

export const listAdminTags = async () => {
  return db.select().from(tags).orderBy(asc(tags.tagType), asc(tags.name));
};

export const createTag = async (payload: { name: string; tagType: string }) => {
  const slug = await ensureUniqueSlug(tags, payload.name);
  const [tag] = await db
    .insert(tags)
    .values({
      name: payload.name,
      slug,
      tagType: payload.tagType,
    })
    .returning();

  return tag;
};

export const updateTag = async (tagId: string, payload: Partial<{ name: string; tagType: string }>) => {
  const [existing] = await db.select().from(tags).where(eq(tags.id, tagId)).limit(1);

  if (!existing) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Tag not found');
  }

  const slug = payload.name ? await ensureUniqueSlug(tags, payload.name, tagId) : existing.slug;
  const [updated] = await db
    .update(tags)
    .set({
      name: payload.name ?? existing.name,
      slug,
      tagType: payload.tagType ?? existing.tagType,
    })
    .where(eq(tags.id, tagId))
    .returning();

  return updated;
};

export const updateStandardInventory = async (
  productId: string,
  payload: {
    onHand?: number;
    lowStockThreshold?: number;
  },
) => {
  const product = await assertProductExists(productId);

  if (product.productType === 'kuji') {
    throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Kuji inventory is derived from prize quantities');
  }

  const [existingInventory] = await db
    .select()
    .from(productInventory)
    .where(eq(productInventory.productId, productId))
    .limit(1);
  if (!existingInventory) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Inventory record not found');
  }

  const [updated] = await db.transaction(async (tx) => {
    const inventoryResult = await tx.execute<{ onHand: number; reserved: number; lowStockThreshold: number }>(sql`
      SELECT
        on_hand AS "onHand",
        reserved,
        low_stock_threshold AS "lowStockThreshold"
      FROM product_inventory
      WHERE product_id = ${productId}
      FOR UPDATE
    `);
    const lockedInventory = inventoryResult[0];

    if (!lockedInventory) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Inventory record not found');
    }

    const nextOnHand = payload.onHand ?? Number(lockedInventory.onHand);
    assertInventoryNotBelowReserved(nextOnHand, Number(lockedInventory.reserved));

    return tx
      .update(productInventory)
      .set({
        onHand: nextOnHand,
        lowStockThreshold: payload.lowStockThreshold ?? Number(lockedInventory.lowStockThreshold),
      })
      .where(eq(productInventory.productId, productId))
      .returning();
  });

  return updated;
};

export const listKujiPrizes = async (productId: string) => {
  const product = await assertProductExists(productId);

  if (product.productType !== 'kuji') {
    throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Only kuji products have kuji prizes');
  }

  return db
    .select()
    .from(kujiPrizes)
    .where(eq(kujiPrizes.productId, productId))
    .orderBy(asc(kujiPrizes.sortOrder), asc(kujiPrizes.id));
};

export const createKujiPrize = async (
  productId: string,
  payload: {
    prizeCode: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    initialQuantity: number;
    remainingQuantity?: number;
    sortOrder?: number;
  },
) => {
  const product = await assertProductExists(productId);
  if (product.productType !== 'kuji') {
    throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Only kuji products can define kuji prizes');
  }

  const remainingQuantity = payload.remainingQuantity ?? payload.initialQuantity;
  assertKujiPrizeQuantitiesAreValid(payload.initialQuantity, remainingQuantity);

  const [prize] = await db.transaction(async (tx) => {
    const [createdPrize] = await tx
      .insert(kujiPrizes)
      .values({
        productId,
        prizeCode: payload.prizeCode,
        name: payload.name,
        description: payload.description ?? null,
        imageUrl: payload.imageUrl ?? null,
        initialQuantity: payload.initialQuantity,
        remainingQuantity,
        sortOrder: payload.sortOrder ?? 0,
      })
      .returning();

    await syncKujiInventoryWithinTx(tx, productId);
    return [createdPrize];
  });

  return prize;
};

export const updateKujiPrize = async (
  productId: string,
  prizeId: string,
  payload: Partial<{
    prizeCode: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    initialQuantity: number;
    remainingQuantity: number;
    sortOrder: number;
  }>,
) => {
  await assertProductExists(productId);
  const [updated] = await db.transaction(async (tx) => {
    const prizeResult = await tx.execute<typeof kujiPrizes.$inferSelect>(sql`
      SELECT *
      FROM kuji_prizes
      WHERE id = ${prizeId}
        AND product_id = ${productId}
      FOR UPDATE
    `);
    const existing = prizeResult[0];

    if (!existing) {
      throw new Exception(HttpStatusCode.NOT_FOUND, 'Kuji prize not found');
    }

    const nextInitialQuantity = payload.initialQuantity ?? existing.initialQuantity;
    const nextRemainingQuantity = payload.remainingQuantity ?? existing.remainingQuantity;
    assertKujiPrizeQuantitiesAreValid(nextInitialQuantity, nextRemainingQuantity);

    const [nextPrize] = await tx
      .update(kujiPrizes)
      .set({
        prizeCode: payload.prizeCode ?? existing.prizeCode,
        name: payload.name ?? existing.name,
        description: payload.description === undefined ? existing.description : payload.description,
        imageUrl: payload.imageUrl === undefined ? existing.imageUrl : payload.imageUrl,
        initialQuantity: nextInitialQuantity,
        remainingQuantity: nextRemainingQuantity,
        sortOrder: payload.sortOrder ?? existing.sortOrder,
      })
      .where(eq(kujiPrizes.id, prizeId))
      .returning();

    await syncKujiInventoryWithinTx(tx, productId);
    return [nextPrize];
  });

  return updated;
};

export const deleteKujiPrize = async (productId: string, prizeId: string) => {
  await db.transaction(async (tx) => {
    await tx.delete(kujiPrizes).where(and(eq(kujiPrizes.id, prizeId), eq(kujiPrizes.productId, productId)));
    await syncKujiInventoryWithinTx(tx, productId);
  });

  return {
    id: prizeId,
    deleted: true,
  };
};
