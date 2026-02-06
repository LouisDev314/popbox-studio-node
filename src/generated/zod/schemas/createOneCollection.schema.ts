import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionSelectObjectSchema as CollectionSelectObjectSchema } from './objects/CollectionSelect.schema';
import { CollectionIncludeObjectSchema as CollectionIncludeObjectSchema } from './objects/CollectionInclude.schema';
import { CollectionCreateInputObjectSchema as CollectionCreateInputObjectSchema } from './objects/CollectionCreateInput.schema';
import { CollectionUncheckedCreateInputObjectSchema as CollectionUncheckedCreateInputObjectSchema } from './objects/CollectionUncheckedCreateInput.schema';

export const CollectionCreateOneSchema: z.ZodType<Prisma.CollectionCreateArgs> = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), data: z.union([CollectionCreateInputObjectSchema, CollectionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.CollectionCreateArgs>;

export const CollectionCreateOneZodSchema = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), data: z.union([CollectionCreateInputObjectSchema, CollectionUncheckedCreateInputObjectSchema]) }).strict();