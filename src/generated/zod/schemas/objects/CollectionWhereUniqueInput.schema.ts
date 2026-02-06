import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(150).optional()
}).strict();
export const CollectionWhereUniqueInputObjectSchema: z.ZodType<Prisma.CollectionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionWhereUniqueInput>;
export const CollectionWhereUniqueInputObjectZodSchema = makeSchema();
