import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(150),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const CollectionCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.CollectionCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionCreateWithoutProductsInput>;
export const CollectionCreateWithoutProductsInputObjectZodSchema = makeSchema();
