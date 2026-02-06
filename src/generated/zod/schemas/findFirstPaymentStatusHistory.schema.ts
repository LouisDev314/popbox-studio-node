import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PaymentStatusHistoryIncludeObjectSchema as PaymentStatusHistoryIncludeObjectSchema } from './objects/PaymentStatusHistoryInclude.schema';
import { PaymentStatusHistoryOrderByWithRelationInputObjectSchema as PaymentStatusHistoryOrderByWithRelationInputObjectSchema } from './objects/PaymentStatusHistoryOrderByWithRelationInput.schema';
import { PaymentStatusHistoryWhereInputObjectSchema as PaymentStatusHistoryWhereInputObjectSchema } from './objects/PaymentStatusHistoryWhereInput.schema';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './objects/PaymentStatusHistoryWhereUniqueInput.schema';
import { PaymentStatusHistoryScalarFieldEnumSchema } from './enums/PaymentStatusHistoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PaymentStatusHistoryFindFirstSelectSchema: z.ZodType<Prisma.PaymentStatusHistorySelect> = z.object({
    id: z.boolean().optional(),
    paymentId: z.boolean().optional(),
    fromStatus: z.boolean().optional(),
    toStatus: z.boolean().optional(),
    reason: z.boolean().optional(),
    stripeEventId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    payment: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistorySelect>;

export const PaymentStatusHistoryFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    paymentId: z.boolean().optional(),
    fromStatus: z.boolean().optional(),
    toStatus: z.boolean().optional(),
    reason: z.boolean().optional(),
    stripeEventId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    payment: z.boolean().optional()
  }).strict();

export const PaymentStatusHistoryFindFirstSchema: z.ZodType<Prisma.PaymentStatusHistoryFindFirstArgs> = z.object({ select: PaymentStatusHistoryFindFirstSelectSchema.optional(), include: z.lazy(() => PaymentStatusHistoryIncludeObjectSchema.optional()), orderBy: z.union([PaymentStatusHistoryOrderByWithRelationInputObjectSchema, PaymentStatusHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentStatusHistoryWhereInputObjectSchema.optional(), cursor: PaymentStatusHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PaymentStatusHistoryScalarFieldEnumSchema, PaymentStatusHistoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.PaymentStatusHistoryFindFirstArgs>;

export const PaymentStatusHistoryFindFirstZodSchema = z.object({ select: PaymentStatusHistoryFindFirstSelectSchema.optional(), include: z.lazy(() => PaymentStatusHistoryIncludeObjectSchema.optional()), orderBy: z.union([PaymentStatusHistoryOrderByWithRelationInputObjectSchema, PaymentStatusHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: PaymentStatusHistoryWhereInputObjectSchema.optional(), cursor: PaymentStatusHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([PaymentStatusHistoryScalarFieldEnumSchema, PaymentStatusHistoryScalarFieldEnumSchema.array()]).optional() }).strict();