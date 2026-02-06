import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressSelectObjectSchema as OrderAddressSelectObjectSchema } from './objects/OrderAddressSelect.schema';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './objects/OrderAddressInclude.schema';
import { OrderAddressCreateInputObjectSchema as OrderAddressCreateInputObjectSchema } from './objects/OrderAddressCreateInput.schema';
import { OrderAddressUncheckedCreateInputObjectSchema as OrderAddressUncheckedCreateInputObjectSchema } from './objects/OrderAddressUncheckedCreateInput.schema';

export const OrderAddressCreateOneSchema: z.ZodType<Prisma.OrderAddressCreateArgs> = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), data: z.union([OrderAddressCreateInputObjectSchema, OrderAddressUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OrderAddressCreateArgs>;

export const OrderAddressCreateOneZodSchema = z.object({ select: OrderAddressSelectObjectSchema.optional(), include: OrderAddressIncludeObjectSchema.optional(), data: z.union([OrderAddressCreateInputObjectSchema, OrderAddressUncheckedCreateInputObjectSchema]) }).strict();