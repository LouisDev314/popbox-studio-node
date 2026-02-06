import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionSelectObjectSchema as CollectionSelectObjectSchema } from './objects/CollectionSelect.schema';
import { CollectionCreateManyInputObjectSchema as CollectionCreateManyInputObjectSchema } from './objects/CollectionCreateManyInput.schema';

export const CollectionCreateManyAndReturnSchema: z.ZodType<Prisma.CollectionCreateManyAndReturnArgs> = z.object({ select: CollectionSelectObjectSchema.optional(), data: z.union([ CollectionCreateManyInputObjectSchema, z.array(CollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CollectionCreateManyAndReturnArgs>;

export const CollectionCreateManyAndReturnZodSchema = z.object({ select: CollectionSelectObjectSchema.optional(), data: z.union([ CollectionCreateManyInputObjectSchema, z.array(CollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();