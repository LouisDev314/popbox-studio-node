import ProductCard from '@/components/product-card';
import { apiFetch } from '@/lib/api';
import type { HomeResponse, StoreProduct } from '@/lib/types';

export default async function HomePage() {
  const data = await apiFetch<HomeResponse>('/v1/home');

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10">
      <section className="grid gap-8 rounded-[2.5rem] bg-ink px-8 py-10 text-paper shadow-card lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-blush">Shopify replacement, finally</p>
          <h1 className="font-heading text-5xl uppercase leading-none lg:text-7xl">
            Collect the next drop before it disappears.
          </h1>
          <p className="max-w-2xl text-lg text-paper/75">
            Kuji draws, premium figures, plushies, cards, and standard merch, all handled with a clean guest checkout and
            secure order access.
          </p>
        </div>
        <div className="rounded-[2rem] border border-paper/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-paper/60">What’s inside</p>
          <div className="mt-4 grid gap-3">
            {['Ichiban Kuji', 'Anime figures', 'Plushies', 'Cards', 'Standard merchandise'].map((item) => (
              <div key={item} className="rounded-full border border-paper/10 px-4 py-3 text-sm uppercase tracking-[0.18em]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader title="New Drops" subtitle="Latest active products in the catalog." />
        <ProductGrid products={data.newDrops} />
      </section>

      <section className="space-y-6">
        <SectionHeader title="Trending Now" subtitle="What’s moving through checkout right now." />
        <ProductGrid products={data.trendingNow} />
      </section>

      <section className="space-y-6">
        <SectionHeader title="All Products Preview" subtitle="Jump straight into the full listing page for filters and search." />
        <ProductGrid products={data.allProductsPreview} />
      </section>
    </main>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-ember">{title}</p>
        <h2 className="font-heading text-3xl uppercase text-ink">{title}</h2>
      </div>
      <p className="max-w-xl text-sm text-ink/60">{subtitle}</p>
    </div>
  );
}

function ProductGrid({ products }: { products: StoreProduct[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
