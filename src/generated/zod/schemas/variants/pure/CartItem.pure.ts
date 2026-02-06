import * as z from 'zod';
// prettier-ignore
export const CartItemModelSchema = z.object({
    id: z.string(),
    cartId: z.string(),
    productId: z.string(),
    variantId: z.string(),
    quantity: z.number().int(),
    cart: z.unknown(),
    product: z.unknown(),
    variant: z.unknown()
}).strict();

export type CartItemPureType = z.infer<typeof CartItemModelSchema>;
