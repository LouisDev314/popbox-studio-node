import { Router } from 'express';
import { contactLimiter } from '../../../middleware/rate-limit';
import validateBody from '../../../middleware/request-body-validation';
import { contactBodySchema } from '../../../schemas/contact';
import { sendContactEmail } from '../../../services/contact';

const contactRouter: Router = Router();

contactRouter.post('/', contactLimiter, validateBody(contactBodySchema, 'contact request'), async (req, res) => {
  await sendContactEmail(req.body);
  return res.send_ok('Contact email sent');
});

export default contactRouter;
