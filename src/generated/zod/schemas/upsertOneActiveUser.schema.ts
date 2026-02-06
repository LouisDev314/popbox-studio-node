import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';
import { ActiveUserCreateInputObjectSchema as ActiveUserCreateInputObjectSchema } from './objects/ActiveUserCreateInput.schema';
import { ActiveUserUncheckedCreateInputObjectSchema as ActiveUserUncheckedCreateInputObjectSchema } from './objects/ActiveUserUncheckedCreateInput.schema';
import { ActiveUserUpdateInputObjectSchema as ActiveUserUpdateInputObjectSchema } from './objects/ActiveUserUpdateInput.schema';
import { ActiveUserUncheckedUpdateInputObjectSchema as ActiveUserUncheckedUpdateInputObjectSchema } from './objects/ActiveUserUncheckedUpdateInput.schema';

export const ActiveUserUpsertOneSchema: z.ZodType<Prisma.ActiveUserUpsertArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema, create: z.union([ ActiveUserCreateInputObjectSchema, ActiveUserUncheckedCreateInputObjectSchema ]), update: z.union([ ActiveUserUpdateInputObjectSchema, ActiveUserUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ActiveUserUpsertArgs>;

export const ActiveUserUpsertOneZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(),  where: ActiveUserWhereUniqueInputObjectSchema, create: z.union([ ActiveUserCreateInputObjectSchema, ActiveUserUncheckedCreateInputObjectSchema ]), update: z.union([ ActiveUserUpdateInputObjectSchema, ActiveUserUncheckedUpdateInputObjectSchema ]) }).strict();