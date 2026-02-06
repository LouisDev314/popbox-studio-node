import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const CategoryCountOutputTypeCountProductsArgsObjectSchema = makeSchema();
export const CategoryCountOutputTypeCountProductsArgsObjectZodSchema = makeSchema();
