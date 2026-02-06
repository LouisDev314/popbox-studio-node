import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionSelectObjectSchema as CollectionSelectObjectSchema } from './objects/CollectionSelect.schema';
import { CollectionIncludeObjectSchema as CollectionIncludeObjectSchema } from './objects/CollectionInclude.schema';
import { CollectionUpdateInputObjectSchema as CollectionUpdateInputObjectSchema } from './objects/CollectionUpdateInput.schema';
import { CollectionUncheckedUpdateInputObjectSchema as CollectionUncheckedUpdateInputObjectSchema } from './objects/CollectionUncheckedUpdateInput.schema';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './objects/CollectionWhereUniqueInput.schema';

export const CollectionUpdateOneSchema: z.ZodType<Prisma.CollectionUpdateArgs> = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), data: z.union([CollectionUpdateInputObjectSchema, CollectionUncheckedUpdateInputObjectSchema]), where: CollectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CollectionUpdateArgs>;

export const CollectionUpdateOneZodSchema = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), data: z.union([CollectionUpdateInputObjectSchema, CollectionUncheckedUpdateInputObjectSchema]), where: CollectionWhereUniqueInputObjectSchema }).strict();