import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserWhereInputObjectSchema as ActiveUserWhereInputObjectSchema } from './objects/ActiveUserWhereInput.schema';

export const ActiveUserDeleteManySchema: z.ZodType<Prisma.ActiveUserDeleteManyArgs> = z.object({ where: ActiveUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserDeleteManyArgs>;

export const ActiveUserDeleteManyZodSchema = z.object({ where: ActiveUserWhereInputObjectSchema.optional() }).strict();