import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ActiveUserWhereUniqueInputObjectSchema: z.ZodType<Prisma.ActiveUserWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ActiveUserWhereUniqueInput>;
export const ActiveUserWhereUniqueInputObjectZodSchema = makeSchema();
