import { Router } from 'express';
import { z } from 'zod';
import validateQuery from '../../../middleware/request-query-validation';
import { readValidatedQuery } from '../../../utils/validated-request';
import { searchProducts } from '../../../services/product';
import { searchQuerySchema } from '../../../schemas/search';

const searchRouter: Router = Router();

searchRouter.get('/', validateQuery(searchQuerySchema, 'search query'), async (req, res) => {
  const query = readValidatedQuery<z.infer<typeof searchQuerySchema>>(req);
  const result = await searchProducts(query.q, query.limit);
  return res.send_ok('Search results retrieved', result);
});

export default searchRouter;
