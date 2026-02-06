import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';

export const ActiveUserFindUniqueOrThrowSchema: z.ZodType<Prisma.ActiveUserFindUniqueOrThrowArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActiveUserFindUniqueOrThrowArgs>;

export const ActiveUserFindUniqueOrThrowZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema }).strict();