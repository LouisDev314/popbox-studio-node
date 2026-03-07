import Image from 'next/image';
import AddToCartPanel from '@/components/add-to-cart-panel';
import { apiFetch } from '@/lib/api';
import { formatMoney } from '@/lib/currency';
import type { StoreImage, StorePrize, StoreProduct } from '@/lib/types';

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await apiFetch<StoreProduct>(`/v1/products/${slug}`);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {(product.images.length ? product.images : [{ id: 'placeholder', url: '', altText: product.name } as StoreImage]).map(
            (image) => (
              <div key={image.id} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-card">
                {image.url ? (
                  <Image src={image.url} alt={image.altText || product.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-ink/40">
                    No image
                  </div>
                )}
              </div>
            ),
          )}
        </div>

        <article className="space-y-5 rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-ember">{product.productType}</p>
          <h1 className="font-heading text-5xl uppercase text-ink">{product.name}</h1>
          <p className="text-lg text-ink/70">{product.description || 'No additional description available.'}</p>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span key={tag.id} className="rounded-full bg-ink/5 px-3 py-2 text-xs uppercase tracking-[0.15em] text-ink/60">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="rounded-[1.5rem] bg-paper p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-ink/50">Availability</p>
            <p className="mt-2 text-2xl font-semibold text-ink">{product.inventory?.available ?? 0} available</p>
          </div>
        </article>

        {product.productType === 'kuji' ? (
          <section className="space-y-4 rounded-[2rem] border border-ink/10 bg-white p-8 shadow-card">
            <h2 className="font-heading text-3xl uppercase text-ink">Kuji prize lineup</h2>
            <div className="grid gap-4">
              {product.kujiPrizes.map((prize: StorePrize) => (
                <div key={prize.id} className="flex items-center justify-between rounded-[1.5rem] border border-ink/10 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-ember">{prize.prizeCode}</p>
                    <p className="font-semibold text-ink">{prize.name}</p>
                    {prize.description ? <p className="text-sm text-ink/60">{prize.description}</p> : null}
                  </div>
                  <p className="text-sm uppercase tracking-[0.18em] text-ink/50">{prize.remainingQuantity} left</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </section>

      <aside className="space-y-6">
        <AddToCartPanel product={product} />
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50">Price snapshot</p>
          <p className="mt-2 text-4xl font-semibold text-ink">{formatMoney(product.priceCents, product.currency)}</p>
        </div>
      </aside>
    </main>
  );
}
