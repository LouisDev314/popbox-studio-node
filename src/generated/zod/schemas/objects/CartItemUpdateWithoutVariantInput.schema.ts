import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema as CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './CartUpdateOneRequiredWithoutItemsNestedInput.schema';
import { ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutCartItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  cart: z.lazy(() => CartUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema).optional()
}).strict();
export const CartItemUpdateWithoutVariantInputObjectSchema: z.ZodType<Prisma.CartItemUpdateWithoutVariantInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUpdateWithoutVariantInput>;
export const CartItemUpdateWithoutVariantInputObjectZodSchema = makeSchema();
