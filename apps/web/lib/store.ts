export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  imageUrl?: string | null;
  quantity: number;
  productType: 'standard' | 'kuji';
};

export const CART_STORAGE_KEY = 'popbox-cart';
export const WISHLIST_STORAGE_KEY = 'popbox-wishlist';
export const ORDER_TOKEN_STORAGE_KEY = 'popbox-order-tokens';
