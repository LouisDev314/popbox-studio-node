import * as z from 'zod';
// prettier-ignore
export const OrderItemResultSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    productId: z.string(),
    variantId: z.string(),
    productName: z.string(),
    variantName: z.string().nullable(),
    quantity: z.number().int(),
    unitPrice: z.bigint(),
    currency: z.string(),
    order: z.unknown(),
    product: z.unknown(),
    variant: z.unknown(),
    shipmentItems: z.array(z.unknown())
}).strict();

export type OrderItemResultType = z.infer<typeof OrderItemResultSchema>;
