import { Router } from 'express';
import { z } from 'zod';
import validateBody from '../../../middleware/request-body-validation';
import validateQuery from '../../../middleware/request-query-validation';
import { checkoutLimiter } from '../../../middleware/rate-limit';
import { createCheckoutSession, getCheckoutSuccess } from '../../../services/checkout';
import { readValidatedBody, readValidatedQuery } from '../../../utils/validated-request';
import { checkoutBodySchema, successQuerySchema } from '../../../schemas/checkout';

const checkoutRouter: Router = Router();

checkoutRouter.post(
  '/session',
  checkoutLimiter,
  validateBody(checkoutBodySchema, 'checkout request'),
  async (req, res) => {
    const idempotencyKey = req.get('Idempotency-Key')?.trim();

    if (!idempotencyKey) {
      return res.send_badRequest('Idempotency-Key header is required');
    }

    if (idempotencyKey.length > 255) {
      return res.send_badRequest('Idempotency-Key header must be 255 characters or fewer');
    }

    const body = readValidatedBody<Parameters<typeof createCheckoutSession>[0]>(req);
    const result = await createCheckoutSession(body, idempotencyKey);
    return res.send_created('Checkout session created', result);
  },
);

checkoutRouter.get('/success', validateQuery(successQuerySchema, 'checkout success query'), async (req, res) => {
  const query = readValidatedQuery<z.infer<typeof successQuerySchema>>(req);
  const result = await getCheckoutSuccess(query.session_id);
  return res.send_ok('Checkout session verified', result);
});

export default checkoutRouter;
