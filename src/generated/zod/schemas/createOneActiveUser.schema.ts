import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserSelectObjectSchema as ActiveUserSelectObjectSchema } from './objects/ActiveUserSelect.schema';
import { ActiveUserCreateInputObjectSchema as ActiveUserCreateInputObjectSchema } from './objects/ActiveUserCreateInput.schema';
import { ActiveUserUncheckedCreateInputObjectSchema as ActiveUserUncheckedCreateInputObjectSchema } from './objects/ActiveUserUncheckedCreateInput.schema';

export const ActiveUserCreateOneSchema: z.ZodType<Prisma.ActiveUserCreateArgs> = z.object({ select: ActiveUserSelectObjectSchema.optional(),  data: z.union([ActiveUserCreateInputObjectSchema, ActiveUserUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ActiveUserCreateArgs>;

export const ActiveUserCreateOneZodSchema = z.object({ select: ActiveUserSelectObjectSchema.optional(),  data: z.union([ActiveUserCreateInputObjectSchema, ActiveUserUncheckedCreateInputObjectSchema]) }).strict();