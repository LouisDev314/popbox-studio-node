import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserUpdateManyMutationInputObjectSchema as ActiveUserUpdateManyMutationInputObjectSchema } from './objects/ActiveUserUpdateManyMutationInput.schema';
import { ActiveUserWhereInputObjectSchema as ActiveUserWhereInputObjectSchema } from './objects/ActiveUserWhereInput.schema';

export const ActiveUserUpdateManyAndReturnSchema: z.ZodType<Prisma.ActiveUserUpdateManyAndReturnArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(), data: ActiveUserUpdateManyMutationInputObjectSchema, where: ActiveUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserUpdateManyAndReturnArgs>;

export const ActiveUserUpdateManyAndReturnZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(), data: ActiveUserUpdateManyMutationInputObjectSchema, where: ActiveUserWhereInputObjectSchema.optional() }).strict();