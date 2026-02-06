import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionSelectObjectSchema as CollectionSelectObjectSchema } from './objects/CollectionSelect.schema';
import { CollectionUpdateManyMutationInputObjectSchema as CollectionUpdateManyMutationInputObjectSchema } from './objects/CollectionUpdateManyMutationInput.schema';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './objects/CollectionWhereInput.schema';

export const CollectionUpdateManyAndReturnSchema: z.ZodType<Prisma.CollectionUpdateManyAndReturnArgs> = z.object({ select: CollectionSelectObjectSchema.optional(), data: CollectionUpdateManyMutationInputObjectSchema, where: CollectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CollectionUpdateManyAndReturnArgs>;

export const CollectionUpdateManyAndReturnZodSchema = z.object({ select: CollectionSelectObjectSchema.optional(), data: CollectionUpdateManyMutationInputObjectSchema, where: CollectionWhereInputObjectSchema.optional() }).strict();