import {
  boolean,
  check,
  customType,
  index,
  integer,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const tsvector = customType<{ data: string }>({
  dataType() {
    return 'tsvector';
  },
});

const createdAtColumn = () => timestamp('created_at', { withTimezone: true }).notNull().defaultNow();
const updatedAtColumn = () => timestamp('updated_at', { withTimezone: true }).notNull().defaultNow();

const authSchema = pgSchema('auth');

export const userRoleEnum = pgEnum('user_role', ['admin', 'customer']);
export const productTypeEnum = pgEnum('product_type', ['standard', 'kuji']);
export const productStatusEnum = pgEnum('product_status', ['draft', 'active', 'archived']);
export const inventoryReservationStatusEnum = pgEnum('inventory_reservation_status', [
  'active',
  'converted',
  'expired',
  'released',
]);
export const orderStatusEnum = pgEnum('order_status', [
  'pending_payment',
  'paid',
  'packed',
  'shipped',
  'cancelled',
  'refunded',
  'paid_needs_attention',
  'expired',
]);
export const paymentProviderEnum = pgEnum('payment_provider', ['stripe']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'failed', 'refunded']);
export const webhookStatusEnum = pgEnum('webhook_status', ['received', 'processed', 'failed']);
export const legalDocumentTypeEnum = pgEnum('legal_document_type', [
  'faq',
  'shipping_returns',
  'terms',
  'privacy',
]);

const authUsers = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const users = pgTable(
  'users',
  {
    id: uuid('id')
      .primaryKey()
      .references(() => authUsers.id, { onDelete: 'cascade' }),
    email: varchar('email', { length: 320 }).notNull(),
    role: userRoleEnum('role').notNull().default('customer'),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [uniqueIndex('users_email_unique').on(table.email)],
);

export const customers = pgTable(
  'customers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    email: varchar('email', { length: 320 }).notNull(),
    firstName: varchar('first_name', { length: 120 }),
    lastName: varchar('last_name', { length: 120 }),
    phone: varchar('phone', { length: 40 }),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('customers_email_unique').on(table.email),
    index('customers_user_id_idx').on(table.userId),
    index('customers_created_at_idx').on(table.createdAt, table.id),
  ],
);

export const addresses = pgTable(
  'addresses',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id').references(() => customers.id, { onDelete: 'set null' }),
    fullName: varchar('full_name', { length: 200 }).notNull(),
    line1: varchar('line1', { length: 200 }).notNull(),
    line2: varchar('line2', { length: 200 }),
    city: varchar('city', { length: 120 }).notNull(),
    province: varchar('province', { length: 120 }).notNull(),
    postalCode: varchar('postal_code', { length: 32 }).notNull(),
    countryCode: varchar('country_code', { length: 2 }).notNull().default('CA'),
    phone: varchar('phone', { length: 40 }),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [index('addresses_customer_id_idx').on(table.customerId, table.createdAt)],
);

export const collections = pgTable(
  'collections',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 160 }).notNull(),
    slug: varchar('slug', { length: 180 }).notNull(),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('collections_slug_unique').on(table.slug),
    index('collections_active_sort_idx').on(table.isActive, table.sortOrder, table.id),
    check('collections_sort_order_check', sql`${table.sortOrder} >= 0`),
  ],
);

export const tags = pgTable(
  'tags',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 160 }).notNull(),
    slug: varchar('slug', { length: 180 }).notNull(),
    tagType: varchar('tag_type', { length: 64 }).notNull(),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [uniqueIndex('tags_slug_unique').on(table.slug), index('tags_tag_type_idx').on(table.tagType, table.name)],
);

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    collectionId: uuid('collection_id').references(() => collections.id, { onDelete: 'set null' }),
    name: varchar('name', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 220 }).notNull(),
    description: text('description'),
    productType: productTypeEnum('product_type').notNull().default('standard'),
    status: productStatusEnum('status').notNull().default('draft'),
    priceCents: integer('price_cents').notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('CAD'),
    sku: varchar('sku', { length: 120 }),
    searchVector: tsvector('search_vector')
      .notNull()
      .default(sql`''::tsvector`),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('products_slug_unique').on(table.slug),
    uniqueIndex('products_sku_unique').on(table.sku),
    index('products_status_created_idx').on(table.status, table.createdAt, table.id),
    index('products_collection_status_created_idx').on(table.collectionId, table.status, table.createdAt, table.id),
    index('products_type_status_created_idx').on(table.productType, table.status, table.createdAt, table.id),
    index('products_status_price_asc_idx').on(table.status, table.priceCents.asc(), table.id.desc()),
    index('products_status_price_desc_idx').on(table.status, table.priceCents.desc(), table.id.desc()),
    index('products_status_name_asc_idx').on(table.status, table.name.asc(), table.id.desc()),
    index('products_status_name_desc_idx').on(table.status, table.name.desc(), table.id.desc()),
    index('products_updated_idx').on(table.updatedAt.desc(), table.id.desc()),
    check('products_price_cents_check', sql`${table.priceCents} >= 0`),
  ],
);

export const productTags = pgTable(
  'product_tags',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
    createdAt: createdAtColumn(),
  },
  (table) => [
    primaryKey({ columns: [table.productId, table.tagId], name: 'product_tags_pk' }),
    index('product_tags_tag_id_idx').on(table.tagId, table.productId),
  ],
);

export const productImages = pgTable(
  'product_images',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    storageKey: varchar('storage_key', { length: 255 }).notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    altText: varchar('alt_text', { length: 255 }),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    index('product_images_product_sort_idx').on(table.productId, table.sortOrder, table.id),
    check('product_images_sort_order_check', sql`${table.sortOrder} >= 0`),
  ],
);

export const productInventory = pgTable(
  'product_inventory',
  {
    productId: uuid('product_id')
      .primaryKey()
      .references(() => products.id, { onDelete: 'cascade' }),
    onHand: integer('on_hand').notNull().default(0),
    reserved: integer('reserved').notNull().default(0),
    lowStockThreshold: integer('low_stock_threshold').notNull().default(0),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    index('product_inventory_on_hand_idx').on(table.onHand, table.reserved),
    check('product_inventory_on_hand_check', sql`${table.onHand} >= 0`),
    check('product_inventory_reserved_check', sql`${table.reserved} >= 0`),
    check('product_inventory_low_stock_check', sql`${table.lowStockThreshold} >= 0`),
  ],
);

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    publicId: varchar('public_id', { length: 40 }).notNull(),
    customerId: uuid('customer_id')
      .notNull()
      .references(() => customers.id, { onDelete: 'restrict' }),
    status: orderStatusEnum('status').notNull().default('pending_payment'),
    currency: varchar('currency', { length: 3 }).notNull().default('CAD'),
    subtotalCents: integer('subtotal_cents').notNull().default(0),
    taxCents: integer('tax_cents').notNull().default(0),
    shippingCents: integer('shipping_cents').notNull().default(0),
    totalCents: integer('total_cents').notNull().default(0),
    stripeCheckoutSessionId: varchar('stripe_checkout_session_id', { length: 255 }),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }),
    checkoutIdempotencyKey: varchar('checkout_idempotency_key', { length: 255 }),
    customerDetailsJson: jsonb('customer_details_json').$type<Record<string, unknown> | null>(),
    shippingAddressJson: jsonb('shipping_address_json').$type<Record<string, unknown>>().notNull(),
    billingAddressJson: jsonb('billing_address_json').$type<Record<string, unknown> | null>(),
    guestAccessTokenHash: varchar('guest_access_token_hash', { length: 255 }),
    confirmationEmailSentAt: timestamp('confirmation_email_sent_at', { withTimezone: true }),
    confirmationEmailError: text('confirmation_email_error'),
    orderNotificationSentAt: timestamp('order_notification_sent_at', { withTimezone: true }),
    orderNotificationError: text('order_notification_error'),
    includesLastOnePrize: boolean('includes_last_one_prize').notNull().default(false),
    placedAt: timestamp('placed_at', { withTimezone: true }),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
    refundedAt: timestamp('refunded_at', { withTimezone: true }),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('orders_public_id_unique').on(table.publicId),
    uniqueIndex('orders_stripe_checkout_session_unique').on(table.stripeCheckoutSessionId),
    uniqueIndex('orders_checkout_idempotency_key_unique').on(table.checkoutIdempotencyKey),
    index('orders_customer_created_idx').on(table.customerId, table.createdAt, table.id),
    index('orders_status_created_idx').on(table.status, table.createdAt, table.id),
    index('orders_created_idx').on(table.createdAt.desc(), table.id.desc()),
    index('orders_placed_at_idx').on(table.placedAt, table.id),
    check('orders_subtotal_cents_check', sql`${table.subtotalCents} >= 0`),
    check('orders_tax_cents_check', sql`${table.taxCents} >= 0`),
    check('orders_shipping_cents_check', sql`${table.shippingCents} >= 0`),
    check('orders_total_cents_check', sql`${table.totalCents} >= 0`),
  ],
);

export const inventoryReservations = pgTable(
  'inventory_reservations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'restrict' }),
    quantity: integer('quantity').notNull(),
    status: inventoryReservationStatusEnum('status').notNull().default('active'),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    index('inventory_reservations_order_id_idx').on(table.orderId, table.status),
    index('inventory_reservations_product_id_idx').on(table.productId, table.status),
    index('inventory_reservations_status_expires_idx').on(table.status, table.expiresAt, table.id),
    check('inventory_reservations_quantity_check', sql`${table.quantity} > 0`),
  ],
);

export const kujiPrizes = pgTable(
  'kuji_prizes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    prizeCode: varchar('prize_code', { length: 64 }).notNull(),
    name: varchar('name', { length: 200 }).notNull(),
    description: text('description'),
    imageUrl: varchar('image_url', { length: 500 }),
    initialQuantity: integer('initial_quantity').notNull(),
    remainingQuantity: integer('remaining_quantity').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    index('kuji_prizes_product_sort_idx').on(table.productId, table.sortOrder, table.id),
    index('kuji_prizes_product_remaining_idx').on(table.productId, table.remainingQuantity, table.id),
    uniqueIndex('kuji_prizes_product_code_unique').on(table.productId, table.prizeCode),
    check('kuji_prizes_initial_quantity_check', sql`${table.initialQuantity} >= 0`),
    check('kuji_prizes_remaining_quantity_check', sql`${table.remainingQuantity} >= 0`),
    check('kuji_prizes_sort_order_check', sql`${table.sortOrder} >= 0`),
  ],
);

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'restrict' }),
    productName: varchar('product_name', { length: 200 }).notNull(),
    productType: productTypeEnum('product_type').notNull(),
    unitPriceCents: integer('unit_price_cents').notNull(),
    quantity: integer('quantity').notNull(),
    lineTotalCents: integer('line_total_cents').notNull(),
    metadata: jsonb('metadata').$type<Record<string, unknown> | null>(),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    index('order_items_order_id_idx').on(table.orderId, table.id),
    index('order_items_product_id_idx').on(table.productId, table.createdAt),
    check('order_items_quantity_check', sql`${table.quantity} > 0`),
    check('order_items_unit_price_check', sql`${table.unitPriceCents} >= 0`),
    check('order_items_line_total_check', sql`${table.lineTotalCents} >= 0`),
  ],
);

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    provider: paymentProviderEnum('provider').notNull().default('stripe'),
    providerPaymentIntentId: varchar('provider_payment_intent_id', { length: 255 }),
    providerCheckoutSessionId: varchar('provider_checkout_session_id', { length: 255 }),
    amountCents: integer('amount_cents').notNull(),
    refundedAmountCents: integer('refunded_amount_cents').notNull().default(0),
    currency: varchar('currency', { length: 3 }).notNull().default('CAD'),
    status: paymentStatusEnum('status').notNull().default('pending'),
    rawResponse: jsonb('raw_response').$type<Record<string, unknown> | null>(),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('payments_order_id_unique').on(table.orderId),
    uniqueIndex('payments_provider_payment_intent_unique').on(table.providerPaymentIntentId),
    uniqueIndex('payments_provider_checkout_session_unique').on(table.providerCheckoutSessionId),
    check('payments_amount_cents_check', sql`${table.amountCents} >= 0`),
    check('payments_refunded_amount_cents_check', sql`${table.refundedAmountCents} >= 0`),
    check('payments_refunded_amount_not_exceed_amount_check', sql`${table.refundedAmountCents} <= ${table.amountCents}`),
  ],
);

export const legalDocuments = pgTable(
  'legal_documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: legalDocumentTypeEnum('type').notNull(),
    content: text('content').notNull(),
    version: integer('version').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('legal_documents_type_version_unique').on(table.type, table.version),
    uniqueIndex('legal_documents_one_active_per_type_unique')
      .on(table.type)
      .where(sql`${table.isActive} = true`),
    index('legal_documents_type_active_idx').on(table.type, table.isActive),
    index('legal_documents_type_created_at_idx').on(table.type, table.createdAt),
    check('legal_documents_version_check', sql`${table.version} > 0`),
  ],
);

export const faqItems = pgTable(
  'faq_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    category: varchar('category', { length: 120 }),
    sortOrder: integer('sort_order').notNull().default(0),
    isPublished: boolean('is_published').notNull().default(false),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    index('faq_items_published_sort_idx').on(table.isPublished, table.sortOrder, table.createdAt, table.id),
    index('faq_items_category_sort_idx').on(table.category, table.sortOrder, table.createdAt, table.id),
    check('faq_items_sort_order_check', sql`${table.sortOrder} >= 0`),
  ],
);

export const paymentRefunds = pgTable(
  'payment_refunds',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    paymentId: uuid('payment_id')
      .notNull()
      .references(() => payments.id, { onDelete: 'cascade' }),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    providerRefundId: varchar('provider_refund_id', { length: 255 }).notNull(),
    idempotencyKey: varchar('idempotency_key', { length: 255 }),
    amountCents: integer('amount_cents').notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('CAD'),
    status: varchar('status', { length: 64 }).notNull(),
    reason: varchar('reason', { length: 255 }),
    providerCreatedAt: timestamp('provider_created_at', { withTimezone: true }),
    rawResponse: jsonb('raw_response').$type<Record<string, unknown> | null>(),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('payment_refunds_provider_refund_id_unique').on(table.providerRefundId),
    uniqueIndex('payment_refunds_idempotency_key_unique').on(table.idempotencyKey),
    index('payment_refunds_payment_created_idx').on(table.paymentId, table.createdAt, table.id),
    index('payment_refunds_order_created_idx').on(table.orderId, table.createdAt, table.id),
    check('payment_refunds_amount_cents_check', sql`${table.amountCents} >= 0`),
  ],
);

export const tickets = pgTable(
  'tickets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    orderItemId: uuid('order_item_id')
      .notNull()
      .references(() => orderItems.id, { onDelete: 'cascade' }),
    customerId: uuid('customer_id')
      .notNull()
      .references(() => customers.id, { onDelete: 'restrict' }),
    kujiProductId: uuid('kuji_product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'restrict' }),
    kujiPrizeId: uuid('kuji_prize_id')
      .notNull()
      .references(() => kujiPrizes.id, { onDelete: 'restrict' }),
    ticketNumber: varchar('ticket_number', { length: 64 }).notNull(),
    revealedAt: timestamp('revealed_at', { withTimezone: true }),
    voidedAt: timestamp('voided_at', { withTimezone: true }),
    voidReason: varchar('void_reason', { length: 255 }),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    index('tickets_order_id_idx').on(table.orderId, table.createdAt, table.id),
    index('tickets_order_item_id_idx').on(table.orderItemId, table.createdAt),
    index('tickets_customer_id_idx').on(table.customerId, table.createdAt),
    index('tickets_kuji_product_id_idx').on(table.kujiProductId, table.createdAt),
    index('tickets_order_revealed_idx').on(table.orderId, table.revealedAt, table.createdAt),
    uniqueIndex('tickets_ticket_number_unique').on(table.ticketNumber),
  ],
);

export const shipments = pgTable(
  'shipments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    carrierName: varchar('carrier_name', { length: 120 }),
    trackingNumber: varchar('tracking_number', { length: 120 }),
    trackingUrl: varchar('tracking_url', { length: 500 }),
    shippedAt: timestamp('shipped_at', { withTimezone: true }),
    deliveredAt: timestamp('delivered_at', { withTimezone: true }),
    createdAt: createdAtColumn(),
    updatedAt: updatedAtColumn(),
  },
  (table) => [
    uniqueIndex('shipments_order_id_unique').on(table.orderId),
    index('shipments_tracking_number_idx').on(table.trackingNumber),
  ],
);

export const stripeWebhookEvents = pgTable(
  'stripe_webhook_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    stripeEventId: varchar('stripe_event_id', { length: 255 }).notNull(),
    eventType: varchar('event_type', { length: 160 }).notNull(),
    processedAt: timestamp('processed_at', { withTimezone: true }),
    status: webhookStatusEnum('status').notNull().default('received'),
    payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
    errorMessage: text('error_message'),
    createdAt: createdAtColumn(),
  },
  (table) => [
    uniqueIndex('stripe_webhook_events_event_id_unique').on(table.stripeEventId),
    index('stripe_webhook_events_status_created_idx').on(table.status, table.createdAt),
  ],
);
