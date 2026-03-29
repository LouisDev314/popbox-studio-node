import { vi } from 'vitest';
import Stripe from 'stripe';
import type { Response } from 'supertest';

export const TEST_CLIENT_BASE_URL = 'https://client.example.com';
export const TEST_WEBHOOK_SECRET = 'whsec_launch_test';

type ChainMethodName =
  | 'from'
  | 'where'
  | 'innerJoin'
  | 'leftJoin'
  | 'orderBy'
  | 'limit'
  | 'values'
  | 'onConflictDoNothing'
  | 'set'
  | 'returning';

const DEFAULT_CHAIN_METHODS: ChainMethodName[] = [
  'from',
  'where',
  'innerJoin',
  'leftJoin',
  'orderBy',
  'limit',
  'values',
  'onConflictDoNothing',
  'set',
  'returning',
];

export const importFresh = async <T>(loader: () => Promise<T>) => {
  vi.resetModules();
  return loader();
};

export const createChain = <T>(result: T, methods: ChainMethodName[] = DEFAULT_CHAIN_METHODS) => {
  const promise = Promise.resolve(result);
  const chain: Record<string, unknown> = {
    then: promise.then.bind(promise),
    catch: promise.catch.bind(promise),
    finally: promise.finally.bind(promise),
  };

  for (const method of methods) {
    chain[method] = vi.fn(() => chain);
  }

  return chain as Record<ChainMethodName, ReturnType<typeof vi.fn>> & Promise<T>;
};

export const createDbLikeMock = () => ({
  select: vi.fn(),
  insert: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  execute: vi.fn(),
  transaction: vi.fn(),
});

export const buildCheckoutSession = (
  overrides: Partial<Stripe.Checkout.Session> = {},
): Stripe.Checkout.Session => {
  const defaultSession = {
    id: 'cs_test_launch',
    object: 'checkout.session',
    mode: 'payment',
    status: 'complete',
    payment_status: 'paid',
    currency: 'cad',
    amount_subtotal: 1000,
    amount_total: 2630,
    customer_email: 'customer@example.com',
    payment_intent: 'pi_test_launch',
    metadata: {
      orderId: 'ord_launch',
      orderPublicId: 'PBX-LAUNCH',
    },
    total_details: {
      amount_discount: 0,
      amount_shipping: 1500,
      amount_tax: 130,
    },
    customer_details: {
      email: 'customer@example.com',
      name: 'Ada Lovelace',
      phone: '+1 780 555 0100',
      address: {
        line1: '123 Maple Street',
        line2: null,
        city: 'Edmonton',
        state: 'AB',
        postal_code: 'T5J0N3',
        country: 'CA',
      },
    },
    collected_information: {
      shipping_details: {
        name: 'Ada Lovelace',
        address: {
          line1: '123 Maple Street',
          line2: null,
          city: 'Edmonton',
          state: 'AB',
          postal_code: 'T5J0N3',
          country: 'CA',
        },
      },
    },
  } satisfies Partial<Stripe.Checkout.Session>;

  return {
    ...defaultSession,
    ...overrides,
    metadata: {
      ...defaultSession.metadata,
      ...overrides.metadata,
    },
    total_details: {
      ...defaultSession.total_details,
      ...overrides.total_details,
    },
    customer_details: {
      ...defaultSession.customer_details,
      ...overrides.customer_details,
      address: {
        ...defaultSession.customer_details?.address,
        ...overrides.customer_details?.address,
      },
    },
    collected_information: {
      ...defaultSession.collected_information,
      ...overrides.collected_information,
      shipping_details: {
        ...defaultSession.collected_information?.shipping_details,
        ...overrides.collected_information?.shipping_details,
        address: {
          ...defaultSession.collected_information?.shipping_details?.address,
          ...overrides.collected_information?.shipping_details?.address,
        },
      },
    },
  } as Stripe.Checkout.Session;
};

export const buildWebhookRequest = (params: {
  eventId?: string;
  type?: Stripe.Event.Type;
  session?: Stripe.Checkout.Session;
} = {}) => {
  const stripe = new Stripe('sk_test_launch', {
    apiVersion: '2026-02-25.clover',
  });
  const session = params.session ?? buildCheckoutSession();
  const event = {
    id: params.eventId ?? 'evt_launch_1',
    object: 'event',
    api_version: '2026-02-25.clover',
    created: 1774656000,
    livemode: false,
    pending_webhooks: 1,
    request: {
      id: null,
      idempotency_key: null,
    },
    type: params.type ?? 'checkout.session.completed',
    data: {
      object: session,
    },
  } as Stripe.Event;
  const payload = JSON.stringify(event);
  const signature = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: process.env.STRIPE_WEBHOOK_SECRET ?? TEST_WEBHOOK_SECRET,
  });

  return {
    event,
    payload,
    signature,
  };
};

export const readCookie = (response: Pick<Response, 'headers'>, cookieName: string) => {
  const cookies = response.headers['set-cookie'];

  if (!Array.isArray(cookies)) {
    return null;
  }

  return cookies.find((cookie) => cookie.startsWith(`${cookieName}=`)) ?? null;
};
