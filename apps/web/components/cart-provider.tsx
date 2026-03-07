'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { CART_STORAGE_KEY, type CartItem, WISHLIST_STORAGE_KEY } from '@/lib/store';

type CartContextValue = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const readJson = <T,>(key: string, fallback: T) => {
  if (typeof window === 'undefined') return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setCart(readJson<CartItem[]>(CART_STORAGE_KEY, []));
    setWishlist(readJson<string[]>(WISHLIST_STORAGE_KEY, []));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      wishlist,
      addToCart: (item) => {
        setCart((current) => {
          const existing = current.find((entry) => entry.productId === item.productId);
          if (!existing) return [...current, item];

          return current.map((entry) =>
            entry.productId === item.productId
              ? {
                  ...entry,
                  quantity: entry.quantity + item.quantity,
                }
              : entry,
          );
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          setCart((current) => current.filter((entry) => entry.productId !== productId));
          return;
        }

        setCart((current) =>
          current.map((entry) =>
            entry.productId === productId
              ? {
                  ...entry,
                  quantity,
                }
              : entry,
          ),
        );
      },
      removeFromCart: (productId) => {
        setCart((current) => current.filter((entry) => entry.productId !== productId));
      },
      clearCart: () => setCart([]),
      toggleWishlist: (productId) => {
        setWishlist((current) =>
          current.includes(productId) ? current.filter((entry) => entry !== productId) : [...current, productId],
        );
      },
    }),
    [cart, wishlist],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
