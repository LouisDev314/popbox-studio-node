import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserCreateManyInputObjectSchema as ActiveUserCreateManyInputObjectSchema } from './objects/ActiveUserCreateManyInput.schema';

export const ActiveUserCreateManyAndReturnSchema: z.ZodType<Prisma.ActiveUserCreateManyAndReturnArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(), data: z.union([ ActiveUserCreateManyInputObjectSchema, z.array(ActiveUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserCreateManyAndReturnArgs>;

export const ActiveUserCreateManyAndReturnZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(), data: z.union([ ActiveUserCreateManyInputObjectSchema, z.array(ActiveUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();