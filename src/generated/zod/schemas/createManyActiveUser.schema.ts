import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserCreateManyInputObjectSchema as ActiveUserCreateManyInputObjectSchema } from './objects/ActiveUserCreateManyInput.schema';

export const ActiveUserCreateManySchema: z.ZodType<Prisma.ActiveUserCreateManyArgs> = z.object({ data: z.union([ ActiveUserCreateManyInputObjectSchema, z.array(ActiveUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserCreateManyArgs>;

export const ActiveUserCreateManyZodSchema = z.object({ data: z.union([ ActiveUserCreateManyInputObjectSchema, z.array(ActiveUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();