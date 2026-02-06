import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'

const cartitemscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CartItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CartItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CartItemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CartItemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CartItemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  cartId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  productId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  variantId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const CartItemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CartItemScalarWhereWithAggregatesInput> = cartitemscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CartItemScalarWhereWithAggregatesInput>;
export const CartItemScalarWhereWithAggregatesInputObjectZodSchema = cartitemscalarwherewithaggregatesinputSchema;
