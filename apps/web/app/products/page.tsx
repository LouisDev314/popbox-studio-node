import Link from 'next/link';
import ProductCard from '@/components/product-card';
import { apiFetch } from '@/lib/api';
import type { PaginatedProductsResponse } from '@/lib/types';

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const key of ['cursor', 'collection', 'tag', 'type', 'sort']) {
    const value = params[key];
    if (typeof value === 'string' && value.length) {
      query.set(key, value);
    }
  }

  const q = typeof params.q === 'string' ? params.q : '';
  const endpoint = q ? `/v1/search?q=${encodeURIComponent(q)}` : `/v1/products?${query.toString()}`;
  const data = await apiFetch<PaginatedProductsResponse>(endpoint);

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ember">Catalog</p>
          <h1 className="font-heading text-4xl uppercase text-ink">Shop the full inventory</h1>
        </div>
        <form className="flex w-full max-w-xl items-center gap-3 rounded-full border border-ink/10 bg-white px-4 py-3 shadow-card">
          <input
            type="text"
            name="q"
            placeholder="Search figures, kuji, cards..."
            defaultValue={q}
            className="w-full bg-transparent outline-none"
          />
          <button type="submit" className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-paper">
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {data.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {data.nextCursor ? (
        <div className="flex justify-center">
          <Link
            href={`/products?cursor=${encodeURIComponent(data.nextCursor)}`}
            className="rounded-full border border-ink/15 px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink"
          >
            Load more
          </Link>
        </div>
      ) : null}
    </main>
  );
}
