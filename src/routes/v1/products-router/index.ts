import { Router } from 'express';
import { z } from 'zod';
import validateParams from '../../../middleware/request-param-validation';
import validateQuery from '../../../middleware/request-query-validation';
import { readValidatedParams, readValidatedQuery } from '../../../utils/validated-request';
import { getProductBySlug, listProducts } from '../../../services/product';
import { listProductsQuerySchema, productSlugParamsSchema } from '../../../schemas/product';

const productsRouter: Router = Router();

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
