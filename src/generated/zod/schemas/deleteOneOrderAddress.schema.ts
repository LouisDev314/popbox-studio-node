import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './objects/OrderAddressInclude.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './objects/OrderAddressWhereUniqueInput.schema';

export const OrderAddressDeleteOneSchema: z.ZodType<Prisma.OrderAddressDeleteArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrderAddressDeleteArgs>;

export const OrderAddressDeleteOneZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema }).strict();