import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserUpdateInputObjectSchema as ActiveUserUpdateInputObjectSchema } from './objects/ActiveUserUpdateInput.schema';
import { ActiveUserUncheckedUpdateInputObjectSchema as ActiveUserUncheckedUpdateInputObjectSchema } from './objects/ActiveUserUncheckedUpdateInput.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';

export const ActiveUserUpdateOneSchema: z.ZodType<Prisma.ActiveUserUpdateArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(),  data: z.union([ActiveUserUpdateInputObjectSchema, ActiveUserUncheckedUpdateInputObjectSchema]), where: ActiveUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ActiveUserUpdateArgs>;

export const ActiveUserUpdateOneZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(),  data: z.union([ActiveUserUpdateInputObjectSchema, ActiveUserUncheckedUpdateInputObjectSchema]), where: ActiveUserWhereUniqueInputObjectSchema }).strict();