'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { formatMoney } from '@/lib/currency';
import { saveOrderToken } from '@/lib/order-token';
import { useCart } from './cart-provider';

type SuccessPayload = {
  publicId: string;
  guestAccessToken: string;
  orderUrl: string;
  needsAttention: boolean;
  order: {
    totalCents: number;
    currency: string;
    customer: {
      email: string;
      firstName?: string | null;
    };
  };
};

const CheckoutSuccessClient = ({ sessionId }: { sessionId: string }) => {
  const { clearCart } = useCart();
  const [data, setData] = useState<SuccessPayload | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        const payload = await apiFetch<SuccessPayload>(`/v1/checkout/success?session_id=${encodeURIComponent(sessionId)}`);
        saveOrderToken(payload.publicId, payload.guestAccessToken);
        clearCart();
        setData(payload);
      } catch (checkoutError) {
        setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to verify checkout');
      }
    };

    void run();
  }, [clearCart, sessionId]);

  if (error) {
    return <StateCard title="Checkout verification failed" description={error} />;
  }

  if (!data) {
    return <StateCard title="Verifying payment" description="Checking your Stripe session and preparing your order access link." />;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="rounded-[2.5rem] border border-ink/10 bg-white p-10 shadow-card">
        <p className="text-xs uppercase tracking-[0.25em] text-ember">Checkout complete</p>
        <h1 className="mt-3 font-heading text-5xl uppercase text-ink">Order confirmed</h1>
        <p className="mt-4 text-lg text-ink/70">
          A secure order link has been sent to {data.order.customer.email}. Use the button below to access your order and
          kuji tickets now.
        </p>
        <div className="mt-8 rounded-[1.5rem] bg-paper p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-ink/50">Total paid</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{formatMoney(data.order.totalCents, data.order.currency)}</p>
          {data.needsAttention ? (
            <p className="mt-3 text-sm text-amber-700">Payment completed, but the order needs manual attention before fulfillment.</p>
          ) : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={data.orderUrl.replace(/^https?:\/\/[^/]+/, '')} className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-paper">
            View order
          </Link>
          <Link href="/products" className="rounded-full border border-ink/15 px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink">
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

const StateCard = ({ title, description }: { title: string; description: string }) => (
  <main className="mx-auto max-w-3xl px-6 py-12">
    <div className="rounded-[2rem] border border-ink/10 bg-white p-10 shadow-card">
      <h1 className="font-heading text-4xl uppercase text-ink">{title}</h1>
      <p className="mt-4 text-lg text-ink/70">{description}</p>
    </div>
  </main>
);

export default CheckoutSuccessClient;
