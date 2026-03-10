import { collections, kujiPrizes, productImages, productInventory, products, tags } from '../db/schema';

export type ProductSort = 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

export type ProductCursor = {
  id: string;
  createdAt: string;
  priceCents: number;
  name: string;
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
