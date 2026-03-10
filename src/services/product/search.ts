import {
  AUTOCOMPLETE_DEFAULT_LIMIT,
  AUTOCOMPLETE_MAX_LIMIT,
  NAME_SIMILARITY_FLOOR,
  NAME_SIMILARITY_MATCH_THRESHOLD,
  NAME_SIMILARITY_WEIGHT,
  TEXT_WEIGHT,
} from '../../constants/search';
import { sql } from 'drizzle-orm';
import { DEFAULT_LIMIT } from '../../constants/pagination';
import { products } from '../../db/schema';
import { clampLimit } from '../../utils/limit';
import { db } from '../../db';
import { getProductCardsByIds, getProductSuggestionsByIds } from './index';

const normalizeSearchQuery = (query: string) => query.trim().replace(/\s+/g, ' ');

const buildPrefixTsQuery = (query: string) => {
  const tokens = query
    .split(/\s+/)
    .flatMap((term) => term.replace(/[^a-zA-Z0-9]+/g, ' ').split(/\s+/))
    .filter(Boolean);

  return tokens.map((token) => `${token}:*`).join(' & ');
};

export const searchProducts = async (query: string, limit = DEFAULT_LIMIT) => {
  const normalizedQuery = normalizeSearchQuery(query);

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

export const autocomplete = async (query: string, limit = AUTOCOMPLETE_DEFAULT_LIMIT) => {
  const normalizedQuery = normalizeSearchQuery(query);
  const prefixTsQuery = buildPrefixTsQuery(normalizedQuery);

  if (!normalizedQuery || !prefixTsQuery) {
    return {
      items: [],
    };
  }

  const safeLimit = Math.min(clampLimit(limit), AUTOCOMPLETE_MAX_LIMIT);
  const autocompleteSql = sql<{
    id: string;
  }>`
    WITH search_query AS (
      SELECT to_tsquery('simple', ${prefixTsQuery}) AS ts_query
    )
    SELECT p.id,
      (
        CASE
          WHEN lower(p.name) = lower(${normalizedQuery}) THEN 100
          WHEN p.name ILIKE ${`${normalizedQuery}%`} THEN 50
          ELSE 0
        END +
        ts_rank_cd(p.search_vector, sq.ts_query) * ${TEXT_WEIGHT} +
        GREATEST(similarity(p.name, ${normalizedQuery}) - ${NAME_SIMILARITY_FLOOR}, 0) * ${NAME_SIMILARITY_WEIGHT}
      )::float8 AS relevance
    FROM ${products} AS p
    CROSS JOIN search_query sq
    WHERE p.status = 'active'
      AND (
        p.name ILIKE ${`${normalizedQuery}%`}
        OR p.search_vector @@ sq.ts_query
        OR similarity(p.name, ${normalizedQuery}) >= ${NAME_SIMILARITY_MATCH_THRESHOLD}
      )
    ORDER BY relevance DESC, p.created_at DESC, p.id DESC
    LIMIT ${safeLimit}
  `;

  const result = await db.execute(autocompleteSql);
  const ids = result.map((row) => String(row.id));

  return {
    items: await getProductSuggestionsByIds(ids),
  };
};
