import { db } from '../db';

export type DbClient = Pick<typeof db, 'select' | 'insert' | 'update' | 'delete' | 'execute'>;

export type CheckoutItemInput = {
  productId: string;
  quantity: number;
};

export type CreateCheckoutSessionInput = {
  email?: string;
  items: CheckoutItemInput[];
};

export type LockedProductRow = {
  productId: string;
  name: string;
  slug: string;
  description: string | null;
  productType: 'standard' | 'kuji';
  status: 'draft' | 'active' | 'archived';
  priceCents: number;
  currency: string;
  onHand: number;
  reserved: number;
};
