import { Router } from 'express';
import { z } from 'zod';
import validateQuery from '../../../middleware/request-query-validation';
import { searchProducts } from '../../../services/catalog';
import { readValidatedQuery } from '../../../utils/validated-request';

const searchRouter: Router = Router();

const searchQuerySchema = z
  .object({
    q: z.string().min(2),
    limit: z.coerce.number().min(1).max(50).optional(),
  })
  .strict();

searchRouter.get('/', validateQuery(searchQuerySchema, 'search query'), async (req, res) => {
  const query = readValidatedQuery<z.infer<typeof searchQuerySchema>>(req);
  const result = await searchProducts(query.q, query.limit);
  return res.send_ok('Search results retrieved', result);
});

export default searchRouter;
