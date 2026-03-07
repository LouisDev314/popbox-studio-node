import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import StorefrontHeader from '@/components/storefront-header';

export const metadata: Metadata = {
  title: 'Popbox Studio',
  description: 'Single-vendor anime merchandise and kuji storefront',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <CartProvider>
          <StorefrontHeader />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
