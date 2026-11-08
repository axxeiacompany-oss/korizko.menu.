import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, MenuItem, SelectedOption } from '../types/menu';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: MenuItem,
    quantity: number,
    selectedOptions: SelectedOption[],
    notes?: string
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  showCurrencyDual: boolean;
  setShowCurrencyDual: (val: boolean) => void;
  storePhone: string;
  setStorePhone: (phone: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'korizko_cart_v1';
const STORE_PHONE_KEY = 'korizko_phone_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCurrencyDual, setShowCurrencyDual] = useState(false);
  // Default WhatsApp phone for KORIZKO from user template
  const [storePhone, setStorePhone] = useState<string>(() => {
    return localStorage.getItem(STORE_PHONE_KEY) || '595991607393';
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_PHONE_KEY, storePhone);
    } catch (e) {
      console.error('Error saving store phone:', e);
    }
  }, [storePhone]);

  const addToCart = (
    product: MenuItem,
    quantity: number,
    selectedOptions: SelectedOption[],
    notes?: string
  ) => {
    // Generate unique ID based on item ID and choices
    const sortedOptionKeys = selectedOptions
      .map((o) => `${o.groupId}:${o.choiceId}`)
      .sort()
      .join('|');
    const cartItemId = `${product.id}_${sortedOptionKeys}_${notes || ''}`;

    // Calculate unit price with option modifiers
    const optionsModifier = selectedOptions.reduce(
      (sum, opt) => sum + (opt.priceModifier || 0),
      0
    );
    const unitPrice = product.price + optionsModifier;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          quantity,
          selectedOptions,
          notes,
          unitPrice,
          totalPrice: unitPrice * quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        showCurrencyDual,
        setShowCurrencyDual,
        storePhone,
        setStorePhone,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
