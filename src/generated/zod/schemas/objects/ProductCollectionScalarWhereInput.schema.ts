import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema'

const productcollectionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProductCollectionScalarWhereInputObjectSchema), z.lazy(() => ProductCollectionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProductCollectionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProductCollectionScalarWhereInputObjectSchema), z.lazy(() => ProductCollectionScalarWhereInputObjectSchema).array()]).optional(),
  productId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  collectionId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  sortOrder: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const ProductCollectionScalarWhereInputObjectSchema: z.ZodType<Prisma.ProductCollectionScalarWhereInput> = productcollectionscalarwhereinputSchema as unknown as z.ZodType<Prisma.ProductCollectionScalarWhereInput>;
export const ProductCollectionScalarWhereInputObjectZodSchema = productcollectionscalarwhereinputSchema;
