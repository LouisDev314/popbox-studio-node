import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  supabaseUserId: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const ActiveUserSelectObjectSchema: z.ZodType<Prisma.ActiveUserSelect> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserSelect>;
export const ActiveUserSelectObjectZodSchema = makeSchema();
