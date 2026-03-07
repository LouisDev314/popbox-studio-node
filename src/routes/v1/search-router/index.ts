import { Router } from 'express';
import { z } from 'zod';
import validateQuery from '../../../middleware/request-query-validation';
import { searchProducts } from '../../../services/catalog';

const searchRouter: Router = Router();

const searchQuerySchema = z.object({
  q: z.string().min(2),
  limit: z.coerce.number().min(1).max(50).optional(),
  cursor: z.string().optional(),
});

searchRouter.get('/', validateQuery(searchQuerySchema, 'search query'), async (req, res) => {
  const result = await searchProducts(String(req.query.q), req.query.limit ? Number(req.query.limit) : undefined);
  return res.send_ok('Search results retrieved', result);
});

export default searchRouter;
