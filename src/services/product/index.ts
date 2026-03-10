import { and, asc, desc, eq, inArray, lt, gt, or, sql, type SQL } from 'drizzle-orm';
import getEnvConfig from '../../config/env';
import { db } from '../../db';
import { collections, kujiPrizes, productImages, productInventory, productTags, products, tags } from '../../db/schema';
import { decodeCursor, encodeCursor } from '../../utils/cursor';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import { DEFAULT_LIMIT, MAX_LIMIT } from '../../constants/pagination';
import {
  ProductCard,
  ProductCursor,
  ProductListFilters,
  ProductRelationMaps,
  ProductRow,
  ProductSort,
} from '../../types/product';
import {
  NAME_SIMILARITY_FLOOR,
  NAME_SIMILARITY_MATCH_THRESHOLD,
  NAME_SIMILARITY_WEIGHT,
  TEXT_WEIGHT,
} from '../../constants/search';

const { supabaseUrl, supabaseStorageBucket } = getEnvConfig();

type ProductCardQueryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productType: ProductRow['productType'];
  status: ProductRow['status'];
  priceCents: number;
  currency: string;
  collectionId: string | null;
  collectionName: string | null;
  collectionSlug: string | null;
  imageId: string | null;
  imageStorageKey: string | null;
  imageAltText: string | null;
  imageSortOrder: number | null;
  inventoryOnHand: number | null;
  inventoryReserved: number | null;
  inventoryLowStockThreshold: number | null;
};

const clampLimit = (limit?: number) => {
  if (!limit || Number.isNaN(limit)) return DEFAULT_LIMIT;
  return Math.min(Math.max(limit, 1), MAX_LIMIT);
};

const SORT_MAP: Record<ProductSort, readonly [SQL, SQL]> = {
  newest: [desc(products.createdAt), desc(products.id)],
  price_asc: [asc(products.priceCents), desc(products.id)],
  price_desc: [desc(products.priceCents), desc(products.id)],
  name_asc: [asc(products.name), desc(products.id)],
  name_desc: [desc(products.name), desc(products.id)],
};

const sortRows = (sort: ProductSort) => SORT_MAP[sort] ?? SORT_MAP.newest;

const buildCursorCondition = (sort: ProductSort, cursor: ProductCursor | null): SQL | undefined => {
  if (!cursor) return undefined;

  switch (sort) {
    case 'price_asc':
      return or(
        gt(products.priceCents, cursor.priceCents),
        and(eq(products.priceCents, cursor.priceCents), lt(products.id, cursor.id)),
      );

    case 'price_desc':
      return or(
        lt(products.priceCents, cursor.priceCents),
        and(eq(products.priceCents, cursor.priceCents), lt(products.id, cursor.id)),
      );

    case 'name_asc':
      return or(gt(products.name, cursor.name), and(eq(products.name, cursor.name), lt(products.id, cursor.id)));

    case 'name_desc':
      return or(lt(products.name, cursor.name), and(eq(products.name, cursor.name), lt(products.id, cursor.id)));

    case 'newest': {
      const cursorDate = new Date(cursor.createdAt);
      if (Number.isNaN(cursorDate.getTime())) {
        throw new Error('Invalid cursor.createdAt');
      }

      return or(
        lt(products.createdAt, cursorDate),
        and(eq(products.createdAt, cursorDate), lt(products.id, cursor.id)),
      );
    }

    default:
      return lt(products.id, cursor.id);
  }
};

export const loadProductRelations = async (productIds: string[]): Promise<ProductRelationMaps> => {
  // Init map to avoid N+1
  const maps: ProductRelationMaps = {
    images: new Map(),
    tags: new Map(),
    inventory: new Map(),
    collections: new Map(),
    kujiPrizes: new Map(),
  };

  // Short-circuit
  if (productIds.length === 0) {
    return maps;
  }

  // Runs all relation queries concurrently
  const [imagesRows, inventoryRows, productTagRows, productCollectionRows, prizeRows] = await Promise.all([
    db
      .select()
      .from(productImages)
      .where(inArray(productImages.productId, productIds))
      .orderBy(asc(productImages.sortOrder), asc(productImages.id)),
    db.select().from(productInventory).where(inArray(productInventory.productId, productIds)),
    db
      .select({
        productId: productTags.productId,
        tag: tags,
      })
      .from(productTags)
      .innerJoin(tags, eq(tags.id, productTags.tagId))
      .where(inArray(productTags.productId, productIds))
      .orderBy(asc(tags.name)),
    db
      .select({
        productId: products.id,
        collection: collections,
      })
      .from(products)
      .innerJoin(collections, eq(collections.id, products.collectionId))
      .where(inArray(products.id, productIds)),
    db
      .select()
      .from(kujiPrizes)
      .where(inArray(kujiPrizes.productId, productIds))
      .orderBy(asc(kujiPrizes.sortOrder), asc(kujiPrizes.id)),
  ]);

  for (const row of imagesRows) {
    const items = maps.images.get(row.productId) ?? [];
    items.push(row);
    maps.images.set(row.productId, items);
  }

  for (const row of inventoryRows) {
    maps.inventory.set(row.productId, row);
  }

  for (const row of productTagRows) {
    const items = maps.tags.get(row.productId) ?? [];
    items.push(row.tag);
    maps.tags.set(row.productId, items);
  }

  for (const row of productCollectionRows) {
    maps.collections.set(row.collection.id, row.collection);
  }

  for (const row of prizeRows) {
    const items = maps.kujiPrizes.get(row.productId) ?? [];
    items.push(row);
    maps.kujiPrizes.set(row.productId, items);
  }

  return maps;
};

// Supabase storage
const buildImageUrl = (storageKey: string) => {
  const cleanPath = storageKey.startsWith('/') ? storageKey.slice(1) : storageKey;
  return `${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucket}/${cleanPath}`;
};

export const mapProductCard = (row: ProductCardQueryRow): ProductCard => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  productType: row.productType,
  status: row.status,
  priceCents: row.priceCents,
  currency: row.currency,
  collection:
    row.collectionId && row.collectionName && row.collectionSlug
      ? {
          id: row.collectionId,
          name: row.collectionName,
          slug: row.collectionSlug,
        }
      : null,
  images:
    row.imageId && row.imageStorageKey && row.imageSortOrder !== null
      ? [
          {
            id: row.imageId,
            storageKey: row.imageStorageKey,
            altText: row.imageAltText,
            sortOrder: row.imageSortOrder,
            url: buildImageUrl(row.imageStorageKey),
          },
        ]
      : [],
  inventory:
    row.inventoryOnHand !== null && row.inventoryReserved !== null && row.inventoryLowStockThreshold !== null
      ? {
          onHand: row.inventoryOnHand,
          reserved: row.inventoryReserved,
          available: Math.max(row.inventoryOnHand - row.inventoryReserved, 0),
          lowStockThreshold: row.inventoryLowStockThreshold,
        }
      : null,
});

export const getProductCardsByIds = async (productIds: string[]): Promise<ProductCard[]> => {
  if (productIds.length === 0) {
    return [];
  }

  const requestedIds = sql.join(
    productIds.map((productId) => sql`${productId}::uuid`),
    sql`, `,
  );

  const rows = (await db.execute(sql<ProductCardQueryRow>`
    SELECT
      p.id AS "id",
      p.name AS "name",
      p.slug AS "slug",
      p.description AS "description",
      p.product_type AS "productType",
      p.status AS "status",
      p.price_cents AS "priceCents",
      p.currency AS "currency",
      c.id AS "collectionId",
      c.name AS "collectionName",
      c.slug AS "collectionSlug",
      image.id AS "imageId",
      image.storage_key AS "imageStorageKey",
      image.alt_text AS "imageAltText",
      image.sort_order AS "imageSortOrder",
      inventory.on_hand AS "inventoryOnHand",
      inventory.reserved AS "inventoryReserved",
      inventory.low_stock_threshold AS "inventoryLowStockThreshold"
    FROM ${products} AS p
    LEFT JOIN ${collections} AS c
      ON c.id = p.collection_id
    LEFT JOIN ${productInventory} AS inventory
      ON inventory.product_id = p.id
    LEFT JOIN LATERAL (
      SELECT
        pi.id,
        pi.storage_key,
        pi.alt_text,
        pi.sort_order
      FROM ${productImages} AS pi
      WHERE pi.product_id = p.id
      ORDER BY pi.sort_order ASC, pi.id ASC
      LIMIT 1
    ) AS image
      ON true
    WHERE p.id IN (${requestedIds})
  `)) as ProductCardQueryRow[];

  const rowMap = new Map(rows.map((row) => [row.id, mapProductCard(row)]));

  return productIds.flatMap((productId) => {
    const productCard = rowMap.get(productId);
    return productCard ? [productCard] : [];
  });
};

// Convert into API response shape
export const mapProduct = (product: ProductRow, relations: ProductRelationMaps) => {
  const inventory = relations.inventory.get(product.id);
  const collection = product.collectionId ? relations.collections.get(product.collectionId) : undefined;
  const kujiPrizeRows = relations.kujiPrizes.get(product.id) ?? [];

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    productType: product.productType,
    status: product.status,
    priceCents: product.priceCents,
    currency: product.currency,
    sku: product.sku,
    collection: collection
      ? {
          id: collection.id,
          name: collection.name,
          slug: collection.slug,
        }
      : null,
    images: (relations.images.get(product.id) ?? []).map((image) => ({
      id: image.id,
      storageKey: image.storageKey,
      altText: image.altText,
      sortOrder: image.sortOrder,
      url: buildImageUrl(image.storageKey),
    })),
    tags: (relations.tags.get(product.id) ?? []).map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      tagType: tag.tagType,
    })),
    inventory: inventory
      ? {
          onHand: inventory.onHand,
          reserved: inventory.reserved,
          available: Math.max(inventory.onHand - inventory.reserved, 0),
          lowStockThreshold: inventory.lowStockThreshold,
        }
      : null,
    kujiPrizes:
      product.productType === 'kuji'
        ? kujiPrizeRows.map((prize) => ({
            id: prize.id,
            prizeCode: prize.prizeCode,
            name: prize.name,
            description: prize.description,
            imageUrl: prize.imageUrl,
            remainingQuantity: prize.remainingQuantity,
            initialQuantity: prize.initialQuantity,
            sortOrder: prize.sortOrder,
          }))
        : [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const getProductBySlug = async (slug: string) => {
  const [row] = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.status, 'active')))
    .limit(1);

  if (!row) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Product not found');
  }

  const relations = await loadProductRelations([row.id]);
  return mapProduct(row, relations);
};

export const listProducts = async (filters: ProductListFilters) => {
  const sort = filters.sort ?? 'newest';
  const limit = clampLimit(filters.limit);
  const cursor = decodeCursor<ProductCursor>(filters.cursor);

  const conditions: SQL[] = [eq(products.status, filters.status ?? 'active')];

  if (filters.collection) {
    conditions.push(
      sql`${products.collectionId} IN (
        SELECT ${collections.id}
        FROM ${collections}
        WHERE ${collections.slug} = ${filters.collection}
      )`,
    );
  }

  if (filters.type) {
    conditions.push(eq(products.productType, filters.type));
  }

  if (filters.tag) {
    conditions.push(
      sql`${products.id} IN (
        SELECT ${productTags.productId}
        FROM ${productTags}
        JOIN ${tags} ON ${tags.id} = ${productTags.tagId}
        WHERE ${tags.slug} = ${filters.tag}
      )`,
    );
  }

  const cursorCondition = buildCursorCondition(sort, cursor);
  if (cursorCondition) {
    conditions.push(cursorCondition);
  }

  const rows = await db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(...sortRows(sort))
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const pageRows = rows.slice(0, limit);
  const lastItem = pageRows.at(-1);

  return {
    items: await getProductCardsByIds(pageRows.map((row) => row.id)),
    nextCursor:
      hasMore && lastItem
        ? encodeCursor({
            id: lastItem.id,
            createdAt: lastItem.createdAt?.toISOString() ?? null,
            priceCents: lastItem.priceCents,
          })
        : null,
  };
};

export const searchProducts = async (query: string, limit = DEFAULT_LIMIT) => {
  const normalizedQuery = query.trim().replace(/\s+/g, ' ');

  if (!normalizedQuery.trim()) {
    return {
      items: [],
      nextCursor: null,
    };
  }

  const safeLimit = clampLimit(limit);
  const searchSql = sql<{
    id: string;
  }>`
    WITH search_query AS (
      SELECT websearch_to_tsquery('simple', ${normalizedQuery}) AS ts_query
    )
    SELECT p.id,
      (
        ts_rank_cd(p.search_vector, sq.ts_query) * ${TEXT_WEIGHT} +
        GREATEST(similarity(p.name, ${normalizedQuery}) - ${NAME_SIMILARITY_FLOOR}, 0) * ${NAME_SIMILARITY_WEIGHT}
      )::float8 AS relevance
    FROM ${products} AS p
    CROSS JOIN search_query sq
    WHERE p.status = 'active'
      AND (
        p.search_vector @@ sq.ts_query
        OR similarity(p.name, ${normalizedQuery}) >= ${NAME_SIMILARITY_MATCH_THRESHOLD}
      )
    ORDER BY relevance DESC, p.created_at DESC, p.id DESC
    LIMIT ${safeLimit}
  `;

  const result = await db.execute(searchSql);
  const ids = result.map((row) => String(row.id));

  return {
    items: await getProductCardsByIds(ids),
    nextCursor: null,
  };
};
