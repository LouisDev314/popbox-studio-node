import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionProductIdCollectionIdCompoundUniqueInputObjectSchema as ProductCollectionProductIdCollectionIdCompoundUniqueInputObjectSchema } from './ProductCollectionProductIdCollectionIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  productId_collectionId: z.lazy(() => ProductCollectionProductIdCollectionIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ProductCollectionWhereUniqueInputObjectSchema: z.ZodType<Prisma.ProductCollectionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionWhereUniqueInput>;
export const ProductCollectionWhereUniqueInputObjectZodSchema = makeSchema();
