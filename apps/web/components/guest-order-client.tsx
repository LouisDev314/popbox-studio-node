'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { formatMoney } from '@/lib/currency';
import { getOrderToken, saveOrderToken } from '@/lib/order-token';
import type { GuestOrderPayload, GuestTicketsPayload, OrderTicket } from '@/lib/types';

const hasTicketArray = (value: unknown): value is GuestTicketsPayload => {
  if (!value || typeof value !== 'object') return false;
  return 'tickets' in value && 'counts' in value;
};

const GuestOrderClient = ({ publicId, tokenFromQuery }: { publicId: string; tokenFromQuery?: string }) => {
  const [order, setOrder] = useState<GuestOrderPayload | null>(null);
  const [ticketState, setTicketState] = useState<GuestTicketsPayload | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = tokenFromQuery || getOrderToken(publicId);

    if (!token) {
      setError('Order access token is missing from the link.');
      return;
    }

    saveOrderToken(publicId, token);

    const run = async () => {
      try {
        const headers = {
          'x-order-token': token,
        };
        const [orderPayload, ticketsPayload] = await Promise.all([
          apiFetch<GuestOrderPayload>(`/v1/orders/${publicId}`, { headers }),
          apiFetch<GuestTicketsPayload>(`/v1/orders/${publicId}/tickets`, { headers }),
        ]);
        setOrder(orderPayload);
        setTicketState(ticketsPayload);
      } catch (orderError) {
        setError(orderError instanceof Error ? orderError.message : 'Unable to load order');
      }
    };

    void run();
  }, [publicId, tokenFromQuery]);

  const runReveal = async (path: string) => {
    const token = getOrderToken(publicId);
    const result = await apiFetch<GuestTicketsPayload | OrderTicket>(path, {
      method: 'POST',
      headers: {
        'x-order-token': token,
      },
    });

    if (hasTicketArray(result)) {
      setTicketState(result);
    } else {
      setTicketState((current) =>
        current
          ? {
              ...current,
              tickets: current.tickets.map((ticket) => (ticket.id === result.id ? result : ticket)),
              revealed: current.revealed.some((ticket) => ticket.id === result.id) ? current.revealed : [...current.revealed, result],
              unrevealed: current.unrevealed.filter((ticket) => ticket.id !== result.id),
              counts: {
                total: current.counts.total,
                revealed: current.revealed.length + 1,
                unrevealed: Math.max(current.unrevealed.length - 1, 0),
              },
            }
          : current,
      );
    }
  };

  if (error) {
    return <StateCard title="Order access failed" description={error} />;
  }

  if (!order || !ticketState) {
    return <StateCard title="Loading order" description="Fetching your secure order and ticket details." />;
  }

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <div className="rounded-[2.5rem] border border-ink/10 bg-white p-8 shadow-card">
        <p className="text-xs uppercase tracking-[0.25em] text-ember">Secure guest order</p>
        <h1 className="mt-3 font-heading text-4xl uppercase text-ink">{order.publicId}</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Metric label="Status" value={order.status.replace(/_/g, ' ')} />
          <Metric label="Total" value={formatMoney(order.totalCents, order.currency)} />
          <Metric label="Tickets" value={`${ticketState.counts.total}`} />
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <h2 className="font-heading text-2xl uppercase text-ink">Order items</h2>
          {order.items.map((item) => (
            <div key={item.id} className="rounded-[1.5rem] bg-paper p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-ember">{item.productType}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-semibold text-ink">{item.productName}</p>
                <p className="text-sm text-ink/60">x{item.quantity}</p>
              </div>
              <p className="mt-2 text-sm text-ink/70">{formatMoney(item.lineTotalCents, order.currency)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl uppercase text-ink">Tickets</h2>
            <button
              type="button"
              onClick={() => void runReveal(`/v1/orders/${publicId}/tickets/reveal-all`)}
              className="rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink"
            >
              Reveal all
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ticketState.tickets.map((ticket) => (
              <div key={ticket.id} className="rounded-[1.5rem] bg-paper p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{ticket.ticketNumber}</p>
                <p className="mt-2 text-sm text-ink/60">{ticket.revealedAt ? 'Revealed' : 'Hidden prize'}</p>
                <p className="mt-3 font-semibold text-ink">{ticket.prize ? `${ticket.prize.prizeCode} · ${ticket.prize.name}` : 'Reveal to see your prize'}</p>
                {!ticket.revealedAt ? (
                  <button
                    type="button"
                    onClick={() => void runReveal(`/v1/orders/${publicId}/tickets/${ticket.id}/reveal`)}
                    className="mt-4 rounded-full bg-ink px-4 py-2 text-xs uppercase tracking-[0.2em] text-paper"
                  >
                    Reveal
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-[1.5rem] bg-paper p-5">
    <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
  </div>
);

const StateCard = ({ title, description }: { title: string; description: string }) => (
  <main className="mx-auto max-w-3xl px-6 py-12">
    <div className="rounded-[2rem] border border-ink/10 bg-white p-10 shadow-card">
      <h1 className="font-heading text-4xl uppercase text-ink">{title}</h1>
      <p className="mt-4 text-lg text-ink/70">{description}</p>
    </div>
  </main>
);

export default GuestOrderClient;
