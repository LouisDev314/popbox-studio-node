import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedOneWithoutImagesInputObjectSchema as ProductCreateNestedOneWithoutImagesInputObjectSchema } from './ProductCreateNestedOneWithoutImagesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  objectKey: z.string().max(512),
  altText: z.string().max(150).optional().nullable(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutImagesInputObjectSchema)
}).strict();
export const ProductImageCreateInputObjectSchema: z.ZodType<Prisma.ProductImageCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageCreateInput>;
export const ProductImageCreateInputObjectZodSchema = makeSchema();
