import { collections, kujiPrizes, productImages, productInventory, products, tags } from '../db/schema';

export type ProductSort = 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'trending';

export type ProductCursor = {
  id: string;
  createdAt?: string;
  priceCents?: number;
  name?: string;
  score?: number;
};

export type ProductListFilters = {
  collection?: string;
  tag?: string;
  type?: 'standard' | 'kuji';
  sort?: ProductSort;
  limit?: number;
  cursor?: string;
  status?: 'active' | 'draft' | 'archived';
};

export type ProductRow = typeof products.$inferSelect;
export type ProductInventoryRow = typeof productInventory.$inferSelect;
export type CollectionRow = typeof collections.$inferSelect;
export type ProductImageRow = typeof productImages.$inferSelect;
export type TagRow = typeof tags.$inferSelect;
export type KujiPrizeRow = typeof kujiPrizes.$inferSelect;

export type ProductRelationMaps = {
  images: Map<string, ProductImageRow[]>;
  tags: Map<string, TagRow[]>;
  inventory: Map<string, ProductInventoryRow>;
  collections: Map<string, CollectionRow>;
  kujiPrizes: Map<string, KujiPrizeRow[]>;
};

export type ProductCard = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productType: ProductRow['productType'];
  status: ProductRow['status'];
  priceCents: number;
  currency: string;
  collection: Pick<CollectionRow, 'id' | 'name' | 'slug'> | null;
  images: Array<{
    id: ProductImageRow['id'];
    storageKey: ProductImageRow['storageKey'];
    altText: ProductImageRow['altText'];
    sortOrder: ProductImageRow['sortOrder'];
    url: string;
  }>;
  inventory: {
    onHand: ProductInventoryRow['onHand'];
    reserved: ProductInventoryRow['reserved'];
    available: number;
    lowStockThreshold: ProductInventoryRow['lowStockThreshold'];
  } | null;
  ticketSummary?: {
    remainingTickets: number;
    totalTickets: number;
  };
};

export type ProductCardQueryRow = {
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
  remainingTickets: number;
  totalTickets: number;
};

export type ProductSuggestion = {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl: string | null;
  priceCents: number;
  currency: string;
};

export type ProductSuggestionQueryRow = {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  currency: string;
  imageStorageKey: string | null;
};

export type ProductRecommendationQueryRow = {
  id: string;
  score: number;
  inStock: boolean;
};

export type ProductRecommendationsResult = {
  items: ProductCard[];
  meta: {
    count: number;
    limit: number;
  };
};
