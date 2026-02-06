import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionCountOutputTypeCountProductsArgsObjectSchema as CollectionCountOutputTypeCountProductsArgsObjectSchema } from './CollectionCountOutputTypeCountProductsArgs.schema'

const makeSchema = () => z.object({
  products: z.union([z.boolean(), z.lazy(() => CollectionCountOutputTypeCountProductsArgsObjectSchema)]).optional()
}).strict();
export const CollectionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CollectionCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CollectionCountOutputTypeSelect>;
export const CollectionCountOutputTypeSelectObjectZodSchema = makeSchema();
