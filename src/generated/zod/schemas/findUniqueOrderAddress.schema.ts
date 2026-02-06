import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './objects/OrderAddressInclude.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './objects/OrderAddressWhereUniqueInput.schema';

export const OrderAddressFindUniqueSchema: z.ZodType<Prisma.OrderAddressFindUniqueArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrderAddressFindUniqueArgs>;

export const OrderAddressFindUniqueZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema }).strict();