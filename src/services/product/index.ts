import { and, asc, desc, eq, inArray, lt, gt, or, sql, type SQL } from 'drizzle-orm';
import { db } from '../../db';
import { collections, kujiPrizes, productImages, productInventory, productTags, products, tags } from '../../db/schema';
import { PRODUCT_RECOMMENDATIONS_DEFAULT_LIMIT, PRODUCT_RECOMMENDATIONS_MAX_LIMIT } from '../../constants/product';
import { decodeCursor, encodeCursor } from '../../utils/cursor';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import {
  ProductCard,
  ProductCardQueryRow,
  ProductCursor,
  ProductListFilters,
  ProductRecommendationQueryRow,
  ProductRecommendationsResult,
  ProductRelationMaps,
  ProductRow,
  ProductSuggestion,
  ProductSuggestionQueryRow,
  ProductSort,
  TagRow,
} from '../../types/product';
import { clampLimit } from '../../utils/limit';
import { buildImageUrl } from '../../utils/product';
import { LAST_ONE_PRIZE_CODE } from '../../utils/kuji';
import { listTrendingProductIds } from './trending';

const SORT_MAP: Record<ProductSort, readonly [SQL, SQL]> = {
  newest: [desc(products.createdAt), desc(products.id)],
  price_asc: [asc(products.priceCents), desc(products.id)],
  price_desc: [desc(products.priceCents), desc(products.id)],
  name_asc: [asc(products.name), desc(products.id)],
  name_desc: [desc(products.name), desc(products.id)],
  trending: [desc(products.createdAt), desc(products.id)],
};

const sortRows = (sort: ProductSort) => SORT_MAP[sort] ?? SORT_MAP.newest;

const clampRecommendationLimit = (limit?: number) => {
  if (!limit || Number.isNaN(limit)) {
    return PRODUCT_RECOMMENDATIONS_DEFAULT_LIMIT;
  }

  return Math.min(Math.max(limit, 1), PRODUCT_RECOMMENDATIONS_MAX_LIMIT);
};

const buildCursorCondition = (sort: ProductSort, cursor: ProductCursor | null): SQL | undefined => {
  if (!cursor) return undefined;

  switch (sort) {
    case 'price_asc':
      if (typeof cursor.priceCents !== 'number' || Number.isNaN(cursor.priceCents)) {
        return undefined;
      }

      return or(
        gt(products.priceCents, cursor.priceCents),
        and(eq(products.priceCents, cursor.priceCents), lt(products.id, cursor.id)),
      );

    case 'price_desc':
      if (typeof cursor.priceCents !== 'number' || Number.isNaN(cursor.priceCents)) {
        return undefined;
      }

      return or(
        lt(products.priceCents, cursor.priceCents),
        and(eq(products.priceCents, cursor.priceCents), lt(products.id, cursor.id)),
      );

    case 'name_asc':
      if (typeof cursor.name !== 'string') {
        return undefined;
      }

      return or(gt(products.name, cursor.name), and(eq(products.name, cursor.name), lt(products.id, cursor.id)));

    case 'name_desc':
      if (typeof cursor.name !== 'string') {
        return undefined;
      }

      return or(lt(products.name, cursor.name), and(eq(products.name, cursor.name), lt(products.id, cursor.id)));

    case 'newest': {
      if (typeof cursor.createdAt !== 'string') {
        return undefined;
      }

      const cursorDate = new Date(cursor.createdAt);
      if (Number.isNaN(cursorDate.getTime())) {
        return undefined;
      }

      return or(
        lt(products.createdAt, cursorDate),
        and(eq(products.createdAt, cursorDate), lt(products.id, cursor.id)),
      );
    }

    default:
      return undefined;
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
  const [imagesRows, inventoryRows, tagMap, productCollectionRows, prizeRows] = await Promise.all([
    db
      .select({
        id: productImages.id,
        productId: productImages.productId,
        storageKey: productImages.storageKey,
        altText: productImages.altText,
        sortOrder: productImages.sortOrder,
      })
      .from(productImages)
      .where(inArray(productImages.productId, productIds))
      .orderBy(asc(productImages.sortOrder), asc(productImages.id)),
    db
      .select({
        productId: productInventory.productId,
        onHand: productInventory.onHand,
        reserved: productInventory.reserved,
        lowStockThreshold: productInventory.lowStockThreshold,
      })
      .from(productInventory)
      .where(inArray(productInventory.productId, productIds)),
    loadProductTagMap(productIds),
    db
      .select({
        productId: products.id,
        collection: {
          id: collections.id,
          name: collections.name,
          slug: collections.slug,
        },
      })
      .from(products)
      .innerJoin(collections, eq(collections.id, products.collectionId))
      .where(inArray(products.id, productIds)),
    db
      .select({
        id: kujiPrizes.id,
        productId: kujiPrizes.productId,
        prizeCode: kujiPrizes.prizeCode,
        name: kujiPrizes.name,
        description: kujiPrizes.description,
        imageUrl: kujiPrizes.imageUrl,
        remainingQuantity: kujiPrizes.remainingQuantity,
        initialQuantity: kujiPrizes.initialQuantity,
        sortOrder: kujiPrizes.sortOrder,
      })
      .from(kujiPrizes)
      .where(inArray(kujiPrizes.productId, productIds))
      .orderBy(asc(kujiPrizes.sortOrder), asc(kujiPrizes.id)),
  ]);

  maps.tags = tagMap;

  for (const row of imagesRows) {
    const items = maps.images.get(row.productId) ?? [];
    items.push(row);
    maps.images.set(row.productId, items);
  }

  for (const row of inventoryRows) {
    maps.inventory.set(row.productId, row);
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

export const loadProductTagMap = async (productIds: string[]): Promise<Map<string, TagRow[]>> => {
  const tagMap = new Map<string, TagRow[]>();

  if (productIds.length === 0) {
    return tagMap;
  }

  const rows = await db
    .select({
      productId: productTags.productId,
      tag: {
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
        tagType: tags.tagType,
      },
    })
    .from(productTags)
    .innerJoin(tags, eq(tags.id, productTags.tagId))
    .where(inArray(productTags.productId, productIds))
    .orderBy(asc(tags.name));

  for (const row of rows) {
    const items = tagMap.get(row.productId) ?? [];
    items.push(row.tag);
    tagMap.set(row.productId, items);
  }

  return tagMap;
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
  ...(row.productType === 'kuji'
    ? {
        ticketSummary: {
          remainingTickets: Math.max(row.remainingTickets, 0),
          totalTickets: Math.max(row.totalTickets, 0),
        },
      }
    : {}),
});

export const mapProductSuggestion = (row: ProductSuggestionQueryRow): ProductSuggestion => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  thumbnailUrl: row.imageStorageKey ? buildImageUrl(row.imageStorageKey) : null,
  priceCents: row.priceCents,
  currency: row.currency,
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
      inventory.low_stock_threshold AS "inventoryLowStockThreshold",
      ticket_summary."remainingTickets" AS "remainingTickets",
      ticket_summary."totalTickets" AS "totalTickets"
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
    LEFT JOIN LATERAL (
      SELECT
        COALESCE(sum(GREATEST(kp.remaining_quantity, 0)), 0)::int AS "remainingTickets",
        COALESCE(sum(GREATEST(kp.initial_quantity, 0)), 0)::int AS "totalTickets"
      FROM ${kujiPrizes} AS kp
      WHERE p.product_type = 'kuji'
        AND kp.product_id = p.id
        AND UPPER(BTRIM(kp.prize_code)) <> ${LAST_ONE_PRIZE_CODE}
    ) AS ticket_summary
      ON true
    WHERE p.id IN (${requestedIds})
  `)) as ProductCardQueryRow[];

  const rowMap = new Map(rows.map((row) => [row.id, mapProductCard(row)]));

  return productIds.flatMap((productId) => {
    const productCard = rowMap.get(productId);
    return productCard ? [productCard] : [];
  });
};

export const getProductSuggestionsByIds = async (productIds: string[]): Promise<ProductSuggestion[]> => {
  if (productIds.length === 0) {
    return [];
  }

  const requestedIds = sql.join(
    productIds.map((productId) => sql`${productId}::uuid`),
    sql`, `,
  );

  const rows = (await db.execute(sql<ProductSuggestionQueryRow>`
    SELECT
      p.id AS "id",
      p.name AS "name",
      p.slug AS "slug",
      p.price_cents AS "priceCents",
      p.currency AS "currency",
      image.storage_key AS "imageStorageKey"
    FROM ${products} AS p
    LEFT JOIN LATERAL (
      SELECT pi.storage_key
      FROM ${productImages} AS pi
      WHERE pi.product_id = p.id
      ORDER BY pi.sort_order ASC, pi.id ASC
      LIMIT 1
    ) AS image
      ON true
    WHERE p.id IN (${requestedIds})
  `)) as ProductSuggestionQueryRow[];

  const rowMap = new Map(rows.map((row) => [row.id, mapProductSuggestion(row)]));

  return productIds.flatMap((productId) => {
    const suggestion = rowMap.get(productId);
    return suggestion ? [suggestion] : [];
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

export const getProductById = async (productId: string) => {
  const [row] = await db
    .select({
      id: products.id,
      collectionId: products.collectionId,
      name: products.name,
      slug: products.slug,
      description: products.description,
      productType: products.productType,
      status: products.status,
      priceCents: products.priceCents,
      currency: products.currency,
      sku: products.sku,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!row) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Product not found');
  }

  const relations = await loadProductRelations([row.id]);
  return mapProduct(row, relations);
};

export const getProductBySlug = async (slug: string) => {
  const [row] = await db
    .select({
      id: products.id,
      collectionId: products.collectionId,
      name: products.name,
      slug: products.slug,
      description: products.description,
      productType: products.productType,
      status: products.status,
      priceCents: products.priceCents,
      currency: products.currency,
      sku: products.sku,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.status, 'active')))
    .limit(1);

  if (!row) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Product not found');
  }

  const relations = await loadProductRelations([row.id]);
  return mapProduct(row, relations);
};

export const getProductRecommendationsBySlug = async (
  slug: string,
  limit?: number,
): Promise<ProductRecommendationsResult> => {
  const safeLimit = clampRecommendationLimit(limit);
  const [sourceProduct] = await db
    .select({
      id: products.id,
      collectionId: products.collectionId,
      productType: products.productType,
      priceCents: products.priceCents,
      currency: products.currency,
    })
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.status, 'active')))
    .limit(1);

  if (!sourceProduct) {
    throw new Exception(HttpStatusCode.NOT_FOUND, 'Product not found');
  }

  const recommendationAvailabilityCondition = sql`COALESCE(inventory.on_hand - inventory.reserved, 0) > 0`;

  const recommendationRows = (await db.execute(sql<ProductRecommendationQueryRow>`
    WITH source_tags AS (
      SELECT ${productTags.tagId} AS tag_id
      FROM ${productTags}
      WHERE ${productTags.productId} = ${sourceProduct.id}::uuid
    ),
    tag_overlap AS (
      SELECT ${productTags.productId} AS product_id,
        COUNT(*)::int AS shared_tag_count
      FROM ${productTags}
      INNER JOIN source_tags
        ON source_tags.tag_id = ${productTags.tagId}
      WHERE ${productTags.productId} <> ${sourceProduct.id}::uuid
      GROUP BY ${productTags.productId}
    )
    SELECT
      p.id AS "id",
      (
        CASE
          WHEN ${sourceProduct.collectionId}::uuid IS NOT NULL AND p.collection_id = ${sourceProduct.collectionId}::uuid
            THEN 40
          ELSE 0
        END +
        COALESCE(tag_overlap.shared_tag_count, 0) * 15 +
        CASE
          WHEN p.product_type = ${sourceProduct.productType} THEN 10
          ELSE 0
        END +
        CASE
          WHEN ${recommendationAvailabilityCondition} THEN 8
          ELSE 0
        END +
        CASE
          WHEN p.currency = ${sourceProduct.currency}
            AND ABS(p.price_cents - ${sourceProduct.priceCents}) <= GREATEST(500, FLOOR(${sourceProduct.priceCents} * 0.2))
            THEN 5
          ELSE 0
        END
      )::float8 AS "score",
      (${recommendationAvailabilityCondition}) AS "inStock"
    FROM ${products} AS p
    LEFT JOIN ${productInventory} AS inventory
      ON inventory.product_id = p.id
    LEFT JOIN tag_overlap
      ON tag_overlap.product_id = p.id
    WHERE p.status = 'active'
      AND p.id <> ${sourceProduct.id}::uuid
      AND ${recommendationAvailabilityCondition}
    ORDER BY "score" DESC, "inStock" DESC, p.created_at DESC, p.id DESC
    LIMIT ${safeLimit}
  `)) as ProductRecommendationQueryRow[];

  const items = await getProductCardsByIds(recommendationRows.map((row) => row.id));

  return {
    items,
    meta: {
      count: items.length,
      limit: safeLimit,
    },
  };
};

export const listProducts = async (filters: ProductListFilters) => {
  const sort = filters.sort ?? 'newest';
  const limit = clampLimit(filters.limit);
  const cursor = decodeCursor<ProductCursor>(filters.cursor);

  if (sort === 'trending') {
    const trendingPage = await listTrendingProductIds({
      collection: filters.collection,
      tag: filters.tag,
      type: filters.type,
      cursor,
      limit,
      excludeUnavailable: false,
    });

    return {
      items: await getProductCardsByIds(trendingPage.ids),
      nextCursor: trendingPage.nextCursor,
    };
  }

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
    .select({
      id: products.id,
      createdAt: products.createdAt,
      priceCents: products.priceCents,
      name: products.name,
    })
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
        ? encodeCursor(
            sort === 'price_asc' || sort === 'price_desc'
              ? {
                  id: lastItem.id,
                  priceCents: lastItem.priceCents,
                }
              : sort === 'name_asc' || sort === 'name_desc'
                ? {
                    id: lastItem.id,
                    name: lastItem.name,
                  }
                : {
                    id: lastItem.id,
                    createdAt: lastItem.createdAt.toISOString(),
                  },
          )
        : null,
  };
};
