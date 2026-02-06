import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './objects/ProductCollectionSelect.schema';
import { ProductCollectionIncludeObjectSchema as ProductCollectionIncludeObjectSchema } from './objects/ProductCollectionInclude.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './objects/ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionCreateInputObjectSchema as ProductCollectionCreateInputObjectSchema } from './objects/ProductCollectionCreateInput.schema';
import { ProductCollectionUncheckedCreateInputObjectSchema as ProductCollectionUncheckedCreateInputObjectSchema } from './objects/ProductCollectionUncheckedCreateInput.schema';
import { ProductCollectionUpdateInputObjectSchema as ProductCollectionUpdateInputObjectSchema } from './objects/ProductCollectionUpdateInput.schema';
import { ProductCollectionUncheckedUpdateInputObjectSchema as ProductCollectionUncheckedUpdateInputObjectSchema } from './objects/ProductCollectionUncheckedUpdateInput.schema';

export const ProductCollectionUpsertOneSchema: z.ZodType<Prisma.ProductCollectionUpsertArgs> = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), where: ProductCollectionWhereUniqueInputObjectSchema, create: z.union([ ProductCollectionCreateInputObjectSchema, ProductCollectionUncheckedCreateInputObjectSchema ]), update: z.union([ ProductCollectionUpdateInputObjectSchema, ProductCollectionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ProductCollectionUpsertArgs>;

export const ProductCollectionUpsertOneZodSchema = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), where: ProductCollectionWhereUniqueInputObjectSchema, create: z.union([ ProductCollectionCreateInputObjectSchema, ProductCollectionUncheckedCreateInputObjectSchema ]), update: z.union([ ProductCollectionUpdateInputObjectSchema, ProductCollectionUncheckedUpdateInputObjectSchema ]) }).strict();