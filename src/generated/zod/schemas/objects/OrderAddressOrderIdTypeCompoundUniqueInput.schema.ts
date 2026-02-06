import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AddressTypeSchema } from '../enums/AddressType.schema'

const makeSchema = () => z.object({
  orderId: z.string(),
  type: AddressTypeSchema
}).strict();
export const OrderAddressOrderIdTypeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.OrderAddressOrderIdTypeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressOrderIdTypeCompoundUniqueInput>;
export const OrderAddressOrderIdTypeCompoundUniqueInputObjectZodSchema = makeSchema();
