import { Router } from 'express';

const healthRouter: Router = Router();

healthRouter.get('/', (_req, res) => {
  res.send_ok('Healthy', {
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

export default healthRouter;
