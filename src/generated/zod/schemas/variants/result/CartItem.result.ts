import * as z from 'zod';
// prettier-ignore
export const CartItemResultSchema = z.object({
    id: z.string(),
    cartId: z.string(),
    productId: z.string(),
    variantId: z.string(),
    quantity: z.number().int(),
    cart: z.unknown(),
    product: z.unknown(),
    variant: z.unknown()
}).strict();

export type CartItemResultType = z.infer<typeof CartItemResultSchema>;
