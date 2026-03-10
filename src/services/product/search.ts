import {
  AUTOCOMPLETE_DEFAULT_LIMIT,
  AUTOCOMPLETE_MAX_LIMIT,
  NAME_SIMILARITY_FLOOR,
  NAME_SIMILARITY_MATCH_THRESHOLD,
  NAME_SIMILARITY_WEIGHT,
  TEXT_WEIGHT,
} from '../../constants/search';
import { sql, type SQL } from 'drizzle-orm';
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

const buildNameSimilarityScore = (query: string) => sql`
  GREATEST(similarity(${products.name}, ${query}) - ${NAME_SIMILARITY_FLOOR}, 0) * ${NAME_SIMILARITY_WEIGHT}
`;

const runRankedProductQuery = async ({
  tsQuery,
  matchCondition,
  relevance,
  limit,
}: {
  tsQuery: SQL;
  matchCondition: SQL;
  relevance: SQL;
  limit: number;
}) => {
  const result = await db.execute(sql`
    WITH search_query AS (
      SELECT ${tsQuery} AS ts_query
    )
    SELECT ${products.id} AS id,
      (${relevance})::float8 AS relevance
    FROM ${products}
    CROSS JOIN search_query sq
    WHERE ${products.status} = 'active'
      AND (${matchCondition})
    ORDER BY relevance DESC, ${products.createdAt} DESC, ${products.id} DESC
    LIMIT ${limit}
  `);

  return result.map((row) => String(row.id));
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
  const ids = await runRankedProductQuery({
    tsQuery: sql`websearch_to_tsquery('simple', ${normalizedQuery})`,
    matchCondition: sql`
      ${products.searchVector} @@ sq.ts_query
      OR similarity(${products.name}, ${normalizedQuery}) >= ${NAME_SIMILARITY_MATCH_THRESHOLD}
    `,
    relevance: sql`
      ts_rank_cd(${products.searchVector}, sq.ts_query) * ${TEXT_WEIGHT} +
      ${buildNameSimilarityScore(normalizedQuery)}
    `,
    limit: safeLimit,
  });

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
  const prefixPattern = `${normalizedQuery}%`;
  const ids = await runRankedProductQuery({
    tsQuery: sql`to_tsquery('simple', ${prefixTsQuery})`,
    matchCondition: sql`
      ${products.name} ILIKE ${prefixPattern}
      OR ${products.searchVector} @@ sq.ts_query
      OR similarity(${products.name}, ${normalizedQuery}) >= ${NAME_SIMILARITY_MATCH_THRESHOLD}
    `,
    relevance: sql`
      CASE
        WHEN lower(${products.name}) = lower(${normalizedQuery}) THEN 100
        WHEN ${products.name} ILIKE ${prefixPattern} THEN 50
        ELSE 0
      END +
      ts_rank_cd(${products.searchVector}, sq.ts_query) * ${TEXT_WEIGHT} +
      ${buildNameSimilarityScore(normalizedQuery)}
    `,
    limit: safeLimit,
  });

  return {
    items: await getProductSuggestionsByIds(ids),
  };
};
