'use client';

import { useEffect, useState } from 'react';
import { authorizedApiFetch } from '@/lib/api';
import { formatMoney } from '@/lib/currency';
import { useAdminSession } from './use-admin-session';

type Order = {
  id: string;
  publicId: string;
  status: string;
  totalCents: number;
  currency: string;
  customer: {
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
};

const OrdersAdmin = () => {
  const { token, loading } = useAdminSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const run = async () => {
      try {
        const payload = await authorizedApiFetch<{ items: Order[] }>('/v1/admin/orders', token);
        setOrders(payload.items);
      } catch (ordersError) {
        setError(ordersError instanceof Error ? ordersError.message : 'Unable to load orders');
      }
    };

    void run();
  }, [token]);

  if (loading) {
    return <AdminState title="Loading admin session" description="Checking Supabase auth state." />;
  }

  return (
    <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
      <p className="text-xs uppercase tracking-[0.25em] text-ember">Order queue</p>
      <h1 className="mt-2 font-heading text-3xl uppercase text-ink">Orders</h1>
      {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
      <div className="mt-6 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex flex-col gap-3 rounded-[1.5rem] bg-paper px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ember">{order.status.replace(/_/g, ' ')}</p>
              <p className="font-semibold text-ink">{order.publicId}</p>
              <p className="text-sm text-ink/60">{order.customer.email}</p>
            </div>
            <p className="text-sm font-semibold text-ink">{formatMoney(order.totalCents, order.currency)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
    <h1 className="font-heading text-3xl uppercase text-ink">{title}</h1>
    <p className="mt-3 text-sm text-ink/60">{description}</p>
  </div>
);

export default OrdersAdmin;
