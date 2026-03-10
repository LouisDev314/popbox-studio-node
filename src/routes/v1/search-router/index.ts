import { Router } from 'express';
import { z } from 'zod';
import validateQuery from '../../../middleware/request-query-validation';
import { readValidatedQuery } from '../../../utils/validated-request';

import { autocompleteQuerySchema, searchQuerySchema } from '../../../schemas/search';
import { autocomplete, searchProducts } from '../../../services/product/search';

const searchRouter: Router = Router();

searchRouter.get('/', validateQuery(searchQuerySchema, 'search query'), async (req, res) => {
  const query = readValidatedQuery<z.infer<typeof searchQuerySchema>>(req);
  const result = await searchProducts(query.q, query.limit);
  return res.send_ok('Search results retrieved', result);
});

searchRouter.get('/autocomplete', validateQuery(autocompleteQuerySchema, 'search query'), async (req, res) => {
  const query = readValidatedQuery<z.infer<typeof autocompleteQuerySchema>>(req);
  const result = await autocomplete(query.q, query.limit);
  return res.send_ok('Autocomplete suggestions retrieved', result);
});

export default searchRouter;
