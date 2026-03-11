import { db } from '../db';

export type DbClient = Pick<typeof db, 'select' | 'insert' | 'update' | 'delete' | 'execute'>;

export type AddressInput = {
  fullName: string;
  line1: string;
  line2?: string | null;
  city: string;
  province: string;
  postalCode: string;
  countryCode: string;
  phone?: string | null;
};

export type CheckoutItemInput = {
  productId: string;
  quantity: number;
};

export type CreateCheckoutSessionInput = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  items: CheckoutItemInput[];
  shippingAddress: AddressInput;
  billingAddress?: AddressInput | null;
  billingSameAsShipping?: boolean;
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
