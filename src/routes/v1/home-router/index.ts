import { Router } from 'express';
import { getHomepageData } from '../../../services/home';

const homeRouter: Router = Router();

homeRouter.get('/', async (_req, res) => {
  const result = await getHomepageData();
  return res.send_ok('Homepage data retrieved', result);
});

export default homeRouter;
