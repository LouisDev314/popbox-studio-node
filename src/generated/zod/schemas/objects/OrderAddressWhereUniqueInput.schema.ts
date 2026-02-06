import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressOrderIdTypeCompoundUniqueInputObjectSchema as OrderAddressOrderIdTypeCompoundUniqueInputObjectSchema } from './OrderAddressOrderIdTypeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId_type: z.lazy(() => OrderAddressOrderIdTypeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const OrderAddressWhereUniqueInputObjectSchema: z.ZodType<Prisma.OrderAddressWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressWhereUniqueInput>;
export const OrderAddressWhereUniqueInputObjectZodSchema = makeSchema();
