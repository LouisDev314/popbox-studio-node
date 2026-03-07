'use client';

import { useMemo, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { formatMoney } from '@/lib/currency';
import { useCart } from './cart-provider';

type CheckoutResponse = {
  checkoutUrl: string | null;
  sessionId: string;
  publicId: string;
};

const emptyAddress = {
  fullName: '',
  line1: '',
  line2: '',
  city: '',
  province: '',
  postalCode: '',
  countryCode: 'CA',
  phone: '',
};

const CartPageClient = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddress: emptyAddress,
  });

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.priceCents * item.quantity, 0), [cart]);

  const handleCheckout = async () => {
    setSubmitting(true);
    setError('');

    try {
      const result = await apiFetch<CheckoutResponse>('/v1/checkout/session', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          shippingAddress: form.shippingAddress,
          billingSameAsShipping: true,
        }),
      });

      if (!result.checkoutUrl) {
        throw new Error('Stripe checkout URL was not returned');
      }

      window.location.href = result.checkoutUrl;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unable to create checkout session');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ember">Local cart</p>
          <h1 className="font-heading text-4xl uppercase text-ink">Review your order</h1>
        </div>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
              <p className="text-lg text-ink/70">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-ember">{item.productType}</p>
                    <h2 className="font-heading text-2xl text-ink">{item.name}</h2>
                    <p className="text-sm text-ink/60">{formatMoney(item.priceCents)} each</p>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.productId)} className="text-sm uppercase tracking-[0.2em] text-ink/50">
                    Remove
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.productId, Number(event.target.value) || 1)}
                    className="w-24 rounded-full border border-ink/20 bg-paper px-4 py-2"
                  />
                  <p className="text-xl font-semibold text-ink">{formatMoney(item.priceCents * item.quantity)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50">Order total</p>
          <p className="mt-2 text-4xl font-semibold text-ink">{formatMoney(subtotal)}</p>
          <p className="mt-3 text-sm text-ink/60">Shipping and tax are finalized in Stripe Checkout.</p>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <h2 className="font-heading text-2xl uppercase text-ink">Shipping details</h2>
          <Input label="Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="First name" value={form.firstName} onChange={(value) => setForm((current) => ({ ...current, firstName: value }))} />
            <Input label="Last name" value={form.lastName} onChange={(value) => setForm((current) => ({ ...current, lastName: value }))} />
          </div>
          <Input label="Phone" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
          <Input
            label="Recipient name"
            value={form.shippingAddress.fullName}
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                shippingAddress: {
                  ...current.shippingAddress,
                  fullName: value,
                },
              }))
            }
          />
          <Input
            label="Address line 1"
            value={form.shippingAddress.line1}
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                shippingAddress: {
                  ...current.shippingAddress,
                  line1: value,
                },
              }))
            }
          />
          <Input
            label="Address line 2"
            value={form.shippingAddress.line2}
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                shippingAddress: {
                  ...current.shippingAddress,
                  line2: value,
                },
              }))
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="City"
              value={form.shippingAddress.city}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  shippingAddress: {
                    ...current.shippingAddress,
                    city: value,
                  },
                }))
              }
            />
            <Input
              label="Province"
              value={form.shippingAddress.province}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  shippingAddress: {
                    ...current.shippingAddress,
                    province: value,
                  },
                }))
              }
            />
          </div>
          <Input
            label="Postal code"
            value={form.shippingAddress.postalCode}
            onChange={(value) =>
              setForm((current) => ({
                ...current,
                shippingAddress: {
                  ...current.shippingAddress,
                  postalCode: value,
                },
              }))
            }
          />

          {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

          <button
            type="button"
            disabled={submitting || cart.length === 0}
            onClick={handleCheckout}
            className="w-full rounded-full bg-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-paper disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Creating checkout session...' : 'Proceed to Stripe checkout'}
          </button>
        </div>
      </section>
    </main>
  );
};

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-ink/15 bg-paper px-4 py-3 outline-none"
      />
    </label>
  );
}

export default CartPageClient;
