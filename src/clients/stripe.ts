import Stripe from 'stripe';
import getEnvConfig from '../config/env';

const env = getEnvConfig();

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: '2025-08-27.basil',
});

export default stripe;
