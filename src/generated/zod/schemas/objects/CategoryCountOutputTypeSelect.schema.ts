import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCountOutputTypeCountProductsArgsObjectSchema as CategoryCountOutputTypeCountProductsArgsObjectSchema } from './CategoryCountOutputTypeCountProductsArgs.schema'

const makeSchema = () => z.object({
  products: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeCountProductsArgsObjectSchema)]).optional()
}).strict();
export const CategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCountOutputTypeSelect>;
export const CategoryCountOutputTypeSelectObjectZodSchema = makeSchema();
