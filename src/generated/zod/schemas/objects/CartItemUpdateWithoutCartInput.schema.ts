import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutCartItemsNestedInput.schema';
import { ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema as ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema } from './ProductVariantUpdateOneRequiredWithoutCartItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema).optional(),
  variant: z.lazy(() => ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema).optional()
}).strict();
export const CartItemUpdateWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemUpdateWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateWithoutCartInput>;
export const CartItemUpdateWithoutCartInputObjectZodSchema = makeSchema();
