import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './objects/ShipmentItemInclude.schema';
import { ShipmentItemOrderByWithRelationInputObjectSchema as ShipmentItemOrderByWithRelationInputObjectSchema } from './objects/ShipmentItemOrderByWithRelationInput.schema';
import { ShipmentItemWhereInputObjectSchema as ShipmentItemWhereInputObjectSchema } from './objects/ShipmentItemWhereInput.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './objects/ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemScalarFieldEnumSchema } from './enums/ShipmentItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ShipmentItemFindManySelectSchema: z.ZodType<Prisma.ShipmentItemSelect> = z.object({
    id: z.boolean().optional(),
    shipmentId: z.boolean().optional(),
    orderItemId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    shipment: z.boolean().optional(),
    orderItem: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ShipmentItemSelect>;

export const ShipmentItemFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    shipmentId: z.boolean().optional(),
    orderItemId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    shipment: z.boolean().optional(),
    orderItem: z.boolean().optional()
  }).strict();

export const ShipmentItemFindManySchema: z.ZodType<Prisma.ShipmentItemFindManyArgs> = z.object({ select: ShipmentItemFindManySelectSchema.optional(), include: z.lazy(() => ShipmentItemIncludeObjectSchema.optional()), orderBy: z.union([ShipmentItemOrderByWithRelationInputObjectSchema, ShipmentItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShipmentItemWhereInputObjectSchema.optional(), cursor: ShipmentItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ShipmentItemScalarFieldEnumSchema, ShipmentItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ShipmentItemFindManyArgs>;

export const ShipmentItemFindManyZodSchema = z.object({ select: ShipmentItemFindManySelectSchema.optional(), include: z.lazy(() => ShipmentItemIncludeObjectSchema.optional()), orderBy: z.union([ShipmentItemOrderByWithRelationInputObjectSchema, ShipmentItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShipmentItemWhereInputObjectSchema.optional(), cursor: ShipmentItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ShipmentItemScalarFieldEnumSchema, ShipmentItemScalarFieldEnumSchema.array()]).optional() }).strict();