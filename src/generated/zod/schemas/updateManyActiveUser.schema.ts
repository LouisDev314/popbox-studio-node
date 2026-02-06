import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserUpdateManyMutationInputObjectSchema as ActiveUserUpdateManyMutationInputObjectSchema } from './objects/ActiveUserUpdateManyMutationInput.schema';
import { ActiveUserWhereInputObjectSchema as ActiveUserWhereInputObjectSchema } from './objects/ActiveUserWhereInput.schema';

export const ActiveUserUpdateManySchema: z.ZodType<Prisma.ActiveUserUpdateManyArgs> = z.object({ data: ActiveUserUpdateManyMutationInputObjectSchema, where: ActiveUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserUpdateManyArgs>;

export const ActiveUserUpdateManyZodSchema = z.object({ data: ActiveUserUpdateManyMutationInputObjectSchema, where: ActiveUserWhereInputObjectSchema.optional() }).strict();