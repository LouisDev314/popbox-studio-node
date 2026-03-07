import { Router } from 'express';
import { webhookLimiter } from '../../../middleware/rate-limit';
import { handleStripeWebhook } from '../../../services/checkout';

const webhooksRouter: Router = Router();

webhooksRouter.post('/stripe', webhookLimiter, async (req, res) => {
  const result = await handleStripeWebhook(req.headers['stripe-signature'], req.body as Buffer);
  return res.send_ok('Stripe webhook received', result);
});

export default webhooksRouter;
