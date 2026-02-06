import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional()
}).strict();
export const WishlistWhereUniqueInputObjectSchema: z.ZodType<Prisma.WishlistWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistWhereUniqueInput>;
export const WishlistWhereUniqueInputObjectZodSchema = makeSchema();
