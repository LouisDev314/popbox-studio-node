import { Router } from 'express';
import { z } from 'zod';
import validateParams from '../../../middleware/request-param-validation';
import validateQuery from '../../../middleware/request-query-validation';
import { getProductBySlug, listProducts } from '../../../services/catalog';
import { readValidatedParams, readValidatedQuery } from '../../../utils/validated-request';

const productsRouter: Router = Router();

const listProductsQuerySchema = z
  .object({
    limit: z.coerce.number().min(1).max(50).optional(),
    cursor: z.string().optional(),
    collection: z.string().optional(),
    tag: z.string().optional(),
    type: z.enum(['standard', 'kuji']).optional(),
    sort: z.enum(['newest', 'price_asc', 'price_desc', 'trending']).optional(),
  })
  .strict();

const productSlugParamsSchema = z.object({
  slug: z.string().min(1),
});

productsRouter.get('/', validateQuery(listProductsQuerySchema, 'product listing filters'), async (req, res) => {
  const query = readValidatedQuery<Parameters<typeof listProducts>[0]>(req);
  const result = await listProducts(query);
  return res.send_ok('Products retrieved', result);
});

productsRouter.get('/:slug', validateParams(productSlugParamsSchema, 'product slug'), async (req, res) => {
  const params = readValidatedParams<z.infer<typeof productSlugParamsSchema>>(req);
  const result = await getProductBySlug(params.slug);
  return res.send_ok('Product retrieved', result);
});

export default productsRouter;
