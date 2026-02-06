import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './objects/ProductCollectionSelect.schema';
import { ProductCollectionIncludeObjectSchema as ProductCollectionIncludeObjectSchema } from './objects/ProductCollectionInclude.schema';
import { ProductCollectionCreateInputObjectSchema as ProductCollectionCreateInputObjectSchema } from './objects/ProductCollectionCreateInput.schema';
import { ProductCollectionUncheckedCreateInputObjectSchema as ProductCollectionUncheckedCreateInputObjectSchema } from './objects/ProductCollectionUncheckedCreateInput.schema';

export const ProductCollectionCreateOneSchema: z.ZodType<Prisma.ProductCollectionCreateArgs> = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), data: z.union([ProductCollectionCreateInputObjectSchema, ProductCollectionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProductCollectionCreateArgs>;

export const ProductCollectionCreateOneZodSchema = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), data: z.union([ProductCollectionCreateInputObjectSchema, ProductCollectionUncheckedCreateInputObjectSchema]) }).strict();