import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './objects/OrderAddressInclude.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './objects/OrderAddressWhereUniqueInput.schema';

export const OrderAddressFindUniqueOrThrowSchema: z.ZodType<Prisma.OrderAddressFindUniqueOrThrowArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrderAddressFindUniqueOrThrowArgs>;

export const OrderAddressFindUniqueOrThrowZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), where: OrderAddressWhereUniqueInputObjectSchema }).strict();