import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema as CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './CartUpdateOneRequiredWithoutItemsNestedInput.schema';
import { ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutCartItemsNestedInput.schema';
import { ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema as ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema } from './ProductVariantUpdateOneRequiredWithoutCartItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  cart: z.lazy(() => CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema).optional(),
  variant: z.lazy(() => ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema).optional()
}).strict();
export const CartItemUpdateInputObjectSchema: z.ZodType<Prisma.CartItemUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateInput>;
export const CartItemUpdateInputObjectZodSchema = makeSchema();
