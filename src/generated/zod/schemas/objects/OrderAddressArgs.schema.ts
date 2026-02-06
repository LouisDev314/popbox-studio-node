import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './OrderAddressSelect.schema';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './OrderAddressInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OrderAddressSelectObjectSchema).optional(),
  include: z.lazy(() => OrderAddressIncludeObjectSchema).optional()
}).strict();
export const OrderAddressArgsObjectSchema = makeSchema();
export const OrderAddressArgsObjectZodSchema = makeSchema();
