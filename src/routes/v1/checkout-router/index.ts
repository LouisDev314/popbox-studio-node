import { Router } from 'express';
import { z } from 'zod';
import validateBody from '../../../middleware/request-body-validation';
import validateQuery from '../../../middleware/request-query-validation';
import { checkoutLimiter } from '../../../middleware/rate-limit';
import { createCheckoutSession, getCheckoutSuccess } from '../../../services/checkout';
import { readValidatedBody, readValidatedQuery } from '../../../utils/validated-request';

const checkoutRouter: Router = Router();

const addressSchema = z.object({
  fullName: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional().nullable(),
  city: z.string().min(1),
  province: z.string().min(1),
  postalCode: z.string().min(1),
  countryCode: z.string().length(2),
  phone: z.string().optional().nullable(),
});

const checkoutBodySchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.coerce.number().int().min(1).max(20),
      }),
    )
    .min(1),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional().nullable(),
  billingSameAsShipping: z.boolean().optional(),
});

const successQuerySchema = z.object({
  session_id: z.string().min(1),
});

checkoutRouter.post(
  '/session',
  checkoutLimiter,
  validateBody(checkoutBodySchema, 'checkout request'),
  async (req, res) => {
    const body = readValidatedBody<Parameters<typeof createCheckoutSession>[0]>(req);
    const result = await createCheckoutSession(body);
    return res.send_created('Checkout session created', result);
  },
);

checkoutRouter.get('/success', validateQuery(successQuerySchema, 'checkout success query'), async (req, res) => {
  const query = readValidatedQuery<z.infer<typeof successQuerySchema>>(req);
  const result = await getCheckoutSuccess(query.session_id);
  return res.send_ok('Checkout session verified', result);
});

export default checkoutRouter;
