import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionSelectObjectSchema as CollectionSelectObjectSchema } from './objects/CollectionSelect.schema';
import { CollectionIncludeObjectSchema as CollectionIncludeObjectSchema } from './objects/CollectionInclude.schema';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './objects/CollectionWhereUniqueInput.schema';
import { CollectionCreateInputObjectSchema as CollectionCreateInputObjectSchema } from './objects/CollectionCreateInput.schema';
import { CollectionUncheckedCreateInputObjectSchema as CollectionUncheckedCreateInputObjectSchema } from './objects/CollectionUncheckedCreateInput.schema';
import { CollectionUpdateInputObjectSchema as CollectionUpdateInputObjectSchema } from './objects/CollectionUpdateInput.schema';
import { CollectionUncheckedUpdateInputObjectSchema as CollectionUncheckedUpdateInputObjectSchema } from './objects/CollectionUncheckedUpdateInput.schema';

export const CollectionUpsertOneSchema: z.ZodType<Prisma.CollectionUpsertArgs> = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), where: CollectionWhereUniqueInputObjectSchema, create: z.union([ CollectionCreateInputObjectSchema, CollectionUncheckedCreateInputObjectSchema ]), update: z.union([ CollectionUpdateInputObjectSchema, CollectionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.CollectionUpsertArgs>;

export const CollectionUpsertOneZodSchema = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), where: CollectionWhereUniqueInputObjectSchema, create: z.union([ CollectionCreateInputObjectSchema, CollectionUncheckedCreateInputObjectSchema ]), update: z.union([ CollectionUpdateInputObjectSchema, CollectionUncheckedUpdateInputObjectSchema ]) }).strict();