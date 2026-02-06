import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';

export const ActiveUserFindUniqueSchema: z.ZodType<Prisma.ActiveUserFindUniqueArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActiveUserFindUniqueArgs>;

export const ActiveUserFindUniqueZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema }).strict();