import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './objects/CollectionWhereInput.schema';

export const CollectionDeleteManySchema: z.ZodType<Prisma.CollectionDeleteManyArgs> = z.object({ where: CollectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CollectionDeleteManyArgs>;

export const CollectionDeleteManyZodSchema = z.object({ where: CollectionWhereInputObjectSchema.optional() }).strict();