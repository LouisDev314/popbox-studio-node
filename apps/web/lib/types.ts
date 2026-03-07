export type StoreTag = {
  id: string;
  name: string;
  tagType?: string;
};

export type StoreImage = {
  id: string;
  url: string;
  altText?: string | null;
};

export type StorePrize = {
  id: string;
  prizeCode: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  remainingQuantity: number;
};

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  productType: 'standard' | 'kuji';
  status: 'draft' | 'active' | 'archived';
  priceCents: number;
  currency: string;
  images: StoreImage[];
  tags: StoreTag[];
  inventory?: {
    available: number;
    onHand: number;
    reserved: number;
    lowStockThreshold: number;
  } | null;
  kujiPrizes: StorePrize[];
};

export type HomeResponse = {
  newDrops: StoreProduct[];
  trendingNow: StoreProduct[];
  allProductsPreview: StoreProduct[];
};

export type PaginatedProductsResponse = {
  items: StoreProduct[];
  nextCursor: string | null;
};

export type OrderTicket = {
  id: string;
  ticketNumber: string;
  revealedAt: string | null;
  voidedAt: string | null;
  prize: null | {
    name: string;
    prizeCode: string;
  };
};

export type GuestOrderPayload = {
  publicId: string;
  status: string;
  totalCents: number;
  currency: string;
  customer: {
    email: string;
    firstName?: string | null;
  };
  items: Array<{
    id: string;
    productName: string;
    productType: string;
    quantity: number;
    lineTotalCents: number;
  }>;
  tickets: OrderTicket[];
};

export type GuestTicketsPayload = {
  tickets: OrderTicket[];
  revealed: OrderTicket[];
  unrevealed: OrderTicket[];
  counts: {
    total: number;
    revealed: number;
    unrevealed: number;
  };
};
