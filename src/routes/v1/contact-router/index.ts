import { Router } from 'express';
import { contactLimiter } from '../../../middleware/rate-limit';
import validateBody from '../../../middleware/request-body-validation';
import { contactBodySchema, type ContactBody } from '../../../schemas/contact';
import { sendContactEmail } from '../../../services/contact';
import { readValidatedBody } from '../../../utils/validated-request';

const contactRouter: Router = Router();

contactRouter.post('/', contactLimiter, validateBody(contactBodySchema, 'contact request'), async (req, res) => {
  const body = readValidatedBody<ContactBody>(req);
  await sendContactEmail(body);
  return res.send_ok('Contact email sent');
});

export default contactRouter;
