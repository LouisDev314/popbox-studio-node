import * as z from 'zod';
// prettier-ignore
export const OrderItemInputSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    productId: z.string(),
    variantId: z.string(),
    productName: z.string(),
    variantName: z.string().optional().nullable(),
    quantity: z.number().int(),
    unitPrice: z.bigint(),
    currency: z.string(),
    order: z.unknown(),
    product: z.unknown(),
    variant: z.unknown(),
    shipmentItems: z.array(z.unknown())
}).strict();

export type OrderItemInputType = z.infer<typeof OrderItemInputSchema>;
