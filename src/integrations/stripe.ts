import Stripe from 'stripe';
import getEnvConfig from '../config/env';

const stripe = new Stripe(getEnvConfig().stripeSecretKey, {
  apiVersion: '2026-02-25.clover',
  maxNetworkRetries: 2,
  timeout: 20000,
});

export default stripe;
