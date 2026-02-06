import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionCreateManyInputObjectSchema as CollectionCreateManyInputObjectSchema } from './objects/CollectionCreateManyInput.schema';

export const CollectionCreateManySchema: z.ZodType<Prisma.CollectionCreateManyArgs> = z.object({ data: z.union([ CollectionCreateManyInputObjectSchema, z.array(CollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CollectionCreateManyArgs>;

export const CollectionCreateManyZodSchema = z.object({ data: z.union([ CollectionCreateManyInputObjectSchema, z.array(CollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();