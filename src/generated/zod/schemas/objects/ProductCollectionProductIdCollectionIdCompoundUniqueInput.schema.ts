import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  collectionId: z.string()
}).strict();
export const ProductCollectionProductIdCollectionIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ProductCollectionProductIdCollectionIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionProductIdCollectionIdCompoundUniqueInput>;
export const ProductCollectionProductIdCollectionIdCompoundUniqueInputObjectZodSchema = makeSchema();
