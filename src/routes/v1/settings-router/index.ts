import { Router } from 'express';
import { getStoreBannerSettings } from '../../../services/settings';

const settingsRouter: Router = Router();

settingsRouter.get('/store-banner', async (_req, res) => {
  const result = await getStoreBannerSettings();
  return res.send_ok('Store banner settings retrieved', result);
});

export default settingsRouter;
