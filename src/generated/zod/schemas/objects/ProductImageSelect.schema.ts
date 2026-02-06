import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  productId: z.boolean().optional(),
  objectKey: z.boolean().optional(),
  altText: z.boolean().optional(),
  sortOrder: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional()
}).strict();
export const ProductImageSelectObjectSchema: z.ZodType<Prisma.ProductImageSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageSelect>;
export const ProductImageSelectObjectZodSchema = makeSchema();
