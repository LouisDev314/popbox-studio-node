import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WishlistUncheckedCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.WishlistUncheckedCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUncheckedCreateWithoutItemsInput>;
export const WishlistUncheckedCreateWithoutItemsInputObjectZodSchema = makeSchema();
