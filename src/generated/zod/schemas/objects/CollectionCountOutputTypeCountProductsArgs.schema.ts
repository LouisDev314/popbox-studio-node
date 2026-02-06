import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereInputObjectSchema as ProductCollectionWhereInputObjectSchema } from './ProductCollectionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionWhereInputObjectSchema).optional()
}).strict();
export const CollectionCountOutputTypeCountProductsArgsObjectSchema = makeSchema();
export const CollectionCountOutputTypeCountProductsArgsObjectZodSchema = makeSchema();
