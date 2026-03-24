import { Router } from 'express';
import { z } from 'zod';
import validateParams from '../../../middleware/request-param-validation';
import { getActiveLegalDocumentByType, listActiveLegalDocuments } from '../../../services/legal';
import { legalDocumentTypeParamsSchema } from '../../../schemas/legal';
import { readValidatedParams } from '../../../utils/validated-request';

const legalRouter: Router = Router();

legalRouter.get('/', async (_req, res) => {
  const result = await listActiveLegalDocuments();
  return res.send_ok('Legal documents retrieved', result);
});

legalRouter.get('/:type', validateParams(legalDocumentTypeParamsSchema, 'legal document type'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof legalDocumentTypeParamsSchema>>(req);
  const result = await getActiveLegalDocumentByType(params.type);
  return res.send_ok('Legal document retrieved', result);
});

export default legalRouter;
