import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressWhereInputObjectSchema as OrderAddressWhereInputObjectSchema } from './objects/OrderAddressWhereInput.schema';

export const OrderAddressDeleteManySchema: z.ZodType<Prisma.OrderAddressDeleteManyArgs> = z.object({ where: OrderAddressWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrderAddressDeleteManyArgs>;

export const OrderAddressDeleteManyZodSchema = z.object({ where: OrderAddressWhereInputObjectSchema.optional() }).strict();