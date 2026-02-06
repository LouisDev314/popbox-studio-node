import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './CartItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CartItemWhereInputObjectSchema).optional()
}).strict();
export const ProductCountOutputTypeCountCartItemsArgsObjectSchema = makeSchema();
export const ProductCountOutputTypeCountCartItemsArgsObjectZodSchema = makeSchema();
