'use client';

import { useState } from 'react';
import { useCart } from './cart-provider';
import { formatMoney } from '@/lib/currency';

type AddToCartPanelProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    productType: 'standard' | 'kuji';
    priceCents: number;
    currency: string;
    images: Array<{
      url: string;
    }>;
  };
};

const AddToCartPanel = ({ product }: AddToCartPanelProps) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isWished = wishlist.includes(product.id);

  return (
    <div className="space-y-4 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm uppercase tracking-[0.25em] text-ink/60">{product.productType === 'kuji' ? 'Per draw' : 'Unit price'}</p>
        <p className="text-3xl font-semibold text-ink">{formatMoney(product.priceCents, product.currency)}</p>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink">Quantity</span>
        <input
          type="number"
          min={1}
          max={20}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value) || 1)}
          className="w-full rounded-full border border-ink/20 bg-paper px-4 py-3 text-ink outline-none"
        />
      </label>
      <button
        type="button"
        onClick={() =>
          addToCart({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            priceCents: product.priceCents,
            imageUrl: product.images[0]?.url ?? null,
            quantity,
            productType: product.productType,
          })
        }
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-paper"
      >
        Add to cart
      </button>
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        className="w-full rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
      >
        {isWished ? 'Remove from wishlist' : 'Save to wishlist'}
      </button>
    </div>
  );
};

export default AddToCartPanel;
