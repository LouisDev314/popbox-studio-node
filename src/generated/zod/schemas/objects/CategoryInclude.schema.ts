import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFindManySchema as ProductFindManySchema } from '../findManyProduct.schema';
import { CategoryCountOutputTypeArgsObjectSchema as CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  products: z.union([z.boolean(), z.lazy(() => ProductFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategoryIncludeObjectSchema: z.ZodType<Prisma.CategoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.CategoryInclude>;
export const CategoryIncludeObjectZodSchema = makeSchema();
