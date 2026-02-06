import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionSelectObjectSchema as CollectionSelectObjectSchema } from './objects/CollectionSelect.schema';
import { CollectionIncludeObjectSchema as CollectionIncludeObjectSchema } from './objects/CollectionInclude.schema';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './objects/CollectionWhereUniqueInput.schema';

export const CollectionFindUniqueOrThrowSchema: z.ZodType<Prisma.CollectionFindUniqueOrThrowArgs> = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), where: CollectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CollectionFindUniqueOrThrowArgs>;

export const CollectionFindUniqueOrThrowZodSchema = z.object({ select: CollectionSelectObjectSchema.optional(), include: CollectionIncludeObjectSchema.optional(), where: CollectionWhereUniqueInputObjectSchema }).strict();