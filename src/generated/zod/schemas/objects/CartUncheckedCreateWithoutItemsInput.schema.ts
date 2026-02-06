import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const CartUncheckedCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.CartUncheckedCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.CartUncheckedCreateWithoutItemsInput>;
export const CartUncheckedCreateWithoutItemsInputObjectZodSchema = makeSchema();
