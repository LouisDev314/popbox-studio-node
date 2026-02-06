import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionUpdateManyMutationInputObjectSchema as CollectionUpdateManyMutationInputObjectSchema } from './objects/CollectionUpdateManyMutationInput.schema';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './objects/CollectionWhereInput.schema';

export const CollectionUpdateManySchema: z.ZodType<Prisma.CollectionUpdateManyArgs> = z.object({ data: CollectionUpdateManyMutationInputObjectSchema, where: CollectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CollectionUpdateManyArgs>;

export const CollectionUpdateManyZodSchema = z.object({ data: CollectionUpdateManyMutationInputObjectSchema, where: CollectionWhereInputObjectSchema.optional() }).strict();