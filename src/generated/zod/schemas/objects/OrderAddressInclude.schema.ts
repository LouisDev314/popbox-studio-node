import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema'

const makeSchema = () => z.object({
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional()
}).strict();
export const OrderAddressIncludeObjectSchema: z.ZodType<Prisma.OrderAddressInclude> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressInclude>;
export const OrderAddressIncludeObjectZodSchema = makeSchema();
