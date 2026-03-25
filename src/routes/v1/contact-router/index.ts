import { Router } from 'express';
import { checkoutLimiter } from '../../../middleware/rate-limit';
import validateBody from '../../../middleware/request-body-validation';
import { contactBodySchema } from '../../../schemas/contact';

const contactRouter: Router = Router();

contactRouter.post('/', checkoutLimiter, validateBody(contactBodySchema, 'contact request'), async (req, res) => {
  return res.send_created('Contact email sent', {});
});

export default contactRouter;
