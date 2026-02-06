import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const CollectionUncheckedCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.CollectionUncheckedCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionUncheckedCreateWithoutProductsInput>;
export const CollectionUncheckedCreateWithoutProductsInputObjectZodSchema = makeSchema();
