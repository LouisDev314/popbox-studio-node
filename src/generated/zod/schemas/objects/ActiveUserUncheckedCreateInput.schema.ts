import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema'

const makeSchema = () => z.object({
  id: z.string(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().max(100).optional().nullable(),
  role: UserRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const ActiveUserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ActiveUserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserUncheckedCreateInput>;
export const ActiveUserUncheckedCreateInputObjectZodSchema = makeSchema();
