import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';

export const ActiveUserDeleteOneSchema: z.ZodType<Prisma.ActiveUserDeleteArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActiveUserDeleteArgs>;

export const ActiveUserDeleteOneZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema }).strict();