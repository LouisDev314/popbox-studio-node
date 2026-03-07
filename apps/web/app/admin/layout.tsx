import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Link href="/admin/products" className="rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink">
          Products
        </Link>
        <Link href="/admin/orders" className="rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink">
          Orders
        </Link>
      </div>
      {children}
    </main>
  );
}
