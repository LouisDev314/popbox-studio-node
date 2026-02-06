import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantCountOutputTypeCountCartItemsArgsObjectSchema as ProductVariantCountOutputTypeCountCartItemsArgsObjectSchema } from './ProductVariantCountOutputTypeCountCartItemsArgs.schema';
import { ProductVariantCountOutputTypeCountOrderItemsArgsObjectSchema as ProductVariantCountOutputTypeCountOrderItemsArgsObjectSchema } from './ProductVariantCountOutputTypeCountOrderItemsArgs.schema'

const makeSchema = () => z.object({
  cartItems: z.union([z.boolean(), z.lazy(() => ProductVariantCountOutputTypeCountCartItemsArgsObjectSchema)]).optional(),
  orderItems: z.union([z.boolean(), z.lazy(() => ProductVariantCountOutputTypeCountOrderItemsArgsObjectSchema)]).optional()
}).strict();
export const ProductVariantCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ProductVariantCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCountOutputTypeSelect>;
export const ProductVariantCountOutputTypeSelectObjectZodSchema = makeSchema();
