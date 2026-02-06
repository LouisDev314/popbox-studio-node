import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductImageWhereInputObjectSchema as ProductImageWhereInputObjectSchema } from './ProductImageWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductImageWhereInputObjectSchema).optional()
}).strict();
export const ProductCountOutputTypeCountImagesArgsObjectSchema = makeSchema();
export const ProductCountOutputTypeCountImagesArgsObjectZodSchema = makeSchema();
