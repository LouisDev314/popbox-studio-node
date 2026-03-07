'use client';

import Link from 'next/link';
import { useCart } from './cart-provider';

const StorefrontHeader = () => {
  const { cart, wishlist } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link href="/" className="font-heading text-2xl uppercase tracking-[0.3em] text-ink">
            Popbox
          </Link>
          <p className="text-xs uppercase tracking-[0.25em] text-ink/60">Figures, kuji, plushies, cards</p>
        </div>
        <nav className="flex items-center gap-5 text-sm font-medium text-ink">
          <Link href="/products">Shop</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          <span className="rounded-full border border-ink/15 px-3 py-1 text-xs uppercase tracking-[0.2em]">
            Wishlist {wishlist.length}
          </span>
          <Link href="/admin/products" className="text-ink/70">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default StorefrontHeader;
