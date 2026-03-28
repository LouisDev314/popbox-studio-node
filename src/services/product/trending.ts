import { sql, type SQL } from 'drizzle-orm';
import { db } from '../../db';
import {
  collections,
  inventoryReservations,
  orderItems,
  orders,
  productInventory,
  productTags,
  products,
  tags,
} from '../../db/schema';
import { ProductCursor, ProductListFilters } from '../../types/product';
import { encodeCursor } from '../../utils/cursor';
import { clampLimit } from '../../utils/limit';

const TRENDING_DEFAULT_LIMIT = 8;

const TRENDING_PAID_STATUSES = ['paid', 'packed', 'shipped'] as const;
const TRENDING_RESERVATION_STATUSES = ['active'] as const;

const TRENDING_LOOKBACK_DAYS = {
  paidHot: 3,
  paidWarm: 14,
  paidCool: 30,
  reservationHot: 1,
  reservationWarm: 7,
} as const;

// Keep weights simple and explainable:
// paid demand outranks reservation intent, and newer activity outranks older activity.
const TRENDING_WEIGHTS = {
  paidHot: 8,
  paidWarm: 4,
  paidCool: 2,
  reservationHot: 3,
  reservationWarm: 1,
} as const;

type TrendingProductRow = {
  id: string;
  score: number;
  createdAt: Date;
};

const joinOrderStatuses = (values: readonly (typeof TRENDING_PAID_STATUSES)[number][]) =>
  sql.join(
    values.map((value) => sql`${value}::order_status`),
    sql`, `,
  );

const joinReservationStatuses = (values: readonly (typeof TRENDING_RESERVATION_STATUSES)[number][]) =>
  sql.join(
    values.map((value) => sql`${value}::inventory_reservation_status`),
    sql`, `,
  );

// Shared options for both homepage trending and full trending listing.
type TrendingProductListOptions = {
  collection?: ProductListFilters['collection'] | undefined;
  tag?: ProductListFilters['tag'] | undefined;
  type?: ProductListFilters['type'] | undefined;
  cursor?: ProductCursor | null;
  excludeUnavailable?: boolean;
  limit?: number;
};

type TrendingProductListResult = {
  ids: string[];
  nextCursor: string | null;
};

const buildTrendingFilterConditions = (options: TrendingProductListOptions) => {
  const conditions: SQL[] = [sql`p.status = 'active'`];

  if (options.type) {
    conditions.push(sql`p.product_type = ${options.type}`);
  }

  if (options.collection) {
    conditions.push(sql`EXISTS (
      SELECT 1
      FROM ${collections} AS c
      WHERE c.id = p.collection_id
        AND c.slug = ${options.collection}
    )`);
  }

  if (options.tag) {
    conditions.push(sql`EXISTS (
      SELECT 1
      FROM ${productTags} AS pt
      INNER JOIN ${tags} AS t
        ON t.id = pt.tag_id
      WHERE pt.product_id = p.id
        AND t.slug = ${options.tag}
    )`);
  }

  // Surface-level availability rule:
  // homepage excludes products that are not currently buyable,
  // while the full trending listing may still include them.
  if (options.excludeUnavailable) {
    conditions.push(sql`COALESCE(inventory.on_hand - inventory.reserved, 0) > 0`);
  }

  return conditions;
};

const buildTrendingCursorCondition = (cursor: ProductCursor | null) => {
  if (
    !cursor ||
    typeof cursor.id !== 'string' ||
    typeof cursor.score !== 'number' ||
    Number.isNaN(cursor.score) ||
    typeof cursor.createdAt !== 'string'
  ) {
    return undefined;
  }

  const cursorDate = new Date(cursor.createdAt);

  if (Number.isNaN(cursorDate.getTime())) {
    return undefined;
  }

  return sql`(
    ranked_products.score < ${cursor.score}
    OR (
      ranked_products.score = ${cursor.score}
      AND (
        ranked_products."createdAt" < ${cursorDate}
        OR (ranked_products."createdAt" = ${cursorDate} AND ranked_products.id < ${cursor.id})
      )
    )
  )`;
};

export const listTrendingProductIds = async (
  options: TrendingProductListOptions = {},
): Promise<TrendingProductListResult> => {
  const safeLimit = clampLimit(options.limit ?? TRENDING_DEFAULT_LIMIT);
  const filterConditions = buildTrendingFilterConditions(options);
  const cursorCondition = buildTrendingCursorCondition(options.cursor ?? null);

  if (safeLimit === 0) {
    return {
      ids: [],
      nextCursor: null,
    };
  }

  const rows = (await db.execute(sql<TrendingProductRow>`
    WITH paid_demand AS (
      SELECT
        ${orderItems.productId} AS product_id,
        SUM(
          -- Windows are exclusive on purpose so one paid event contributes once at its freshest bucket.
          CASE
            WHEN COALESCE(${orders.paidAt}, ${orders.placedAt}, ${orders.createdAt}) >= now() - (${TRENDING_LOOKBACK_DAYS.paidHot} * interval '1 day')
              THEN ${orderItems.quantity} * ${TRENDING_WEIGHTS.paidHot}
            WHEN COALESCE(${orders.paidAt}, ${orders.placedAt}, ${orders.createdAt}) >= now() - (${TRENDING_LOOKBACK_DAYS.paidWarm} * interval '1 day')
              THEN ${orderItems.quantity} * ${TRENDING_WEIGHTS.paidWarm}
            WHEN COALESCE(${orders.paidAt}, ${orders.placedAt}, ${orders.createdAt}) >= now() - (${TRENDING_LOOKBACK_DAYS.paidCool} * interval '1 day')
              THEN ${orderItems.quantity} * ${TRENDING_WEIGHTS.paidCool}
            ELSE 0
          END
        )::int AS score
      FROM ${orderItems}
      INNER JOIN ${orders}
        ON ${orders.id} = ${orderItems.orderId}
      WHERE ${orders.status} IN (${joinOrderStatuses(TRENDING_PAID_STATUSES)})
        AND COALESCE(${orders.paidAt}, ${orders.placedAt}, ${orders.createdAt}) >= now() - (${TRENDING_LOOKBACK_DAYS.paidCool} * interval '1 day')
      GROUP BY ${orderItems.productId}
    ),
    reservation_demand AS (
      SELECT
        ${inventoryReservations.productId} AS product_id,
        SUM(
          -- Reservation intent is exclusive and counts only active, unexpired holds.
          -- Intentionally exclude converted reservations because paid orders already capture that demand.
          CASE
            WHEN ${inventoryReservations.createdAt} >= now() - (${TRENDING_LOOKBACK_DAYS.reservationHot} * interval '1 day')
              THEN ${inventoryReservations.quantity} * ${TRENDING_WEIGHTS.reservationHot}
            WHEN ${inventoryReservations.createdAt} >= now() - (${TRENDING_LOOKBACK_DAYS.reservationWarm} * interval '1 day')
              THEN ${inventoryReservations.quantity} * ${TRENDING_WEIGHTS.reservationWarm}
            ELSE 0
          END
        )::int AS score
      FROM ${inventoryReservations}
      WHERE ${inventoryReservations.status} IN (${joinReservationStatuses(TRENDING_RESERVATION_STATUSES)})
        AND ${inventoryReservations.createdAt} >= now() - (${TRENDING_LOOKBACK_DAYS.reservationWarm} * interval '1 day')
        AND ${inventoryReservations.expiresAt} > now()
      GROUP BY ${inventoryReservations.productId}
    ),
    ranked_products AS (
      SELECT
        p.id AS "id",
        p.created_at AS "createdAt",
        (COALESCE(paid_demand.score, 0) + COALESCE(reservation_demand.score, 0))::int AS "score"
      FROM ${products} AS p
      LEFT JOIN ${productInventory} AS inventory
        ON inventory.product_id = p.id
      LEFT JOIN paid_demand
        ON paid_demand.product_id = p.id
      LEFT JOIN reservation_demand
        ON reservation_demand.product_id = p.id
      WHERE ${sql.join(filterConditions, sql` AND `)}
    )
    SELECT
      ranked_products.id AS "id",
      ranked_products.score AS "score",
      ranked_products."createdAt" AS "createdAt"
    FROM ranked_products
    ${cursorCondition ? sql`WHERE ${cursorCondition}` : sql``}
    -- Zero-score products are allowed on purpose.
    -- In sparse-demand periods, this backfills with newer active products while preserving deterministic cursor pagination.
    ORDER BY
      ranked_products.score DESC,
      ranked_products."createdAt" DESC,
      ranked_products.id DESC
    LIMIT ${safeLimit + 1}
  `)) as TrendingProductRow[];

  const pageRows = rows.slice(0, safeLimit);
  const lastRow = pageRows.at(-1);

  return {
    ids: pageRows.map((row) => row.id),
    nextCursor:
      rows.length > safeLimit && lastRow
        ? encodeCursor({
            id: lastRow.id,
            score: lastRow.score,
            createdAt: lastRow.createdAt.toISOString(),
          })
        : null,
  };
};

export const getTrendingProductIds = async (
  options: Omit<TrendingProductListOptions, 'cursor'> = {},
): Promise<string[]> => {
  const result = await listTrendingProductIds(options);
  return result.ids;
};
