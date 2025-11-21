// src/hooks/useCart.ts
import { useState } from 'react';
import type { CartItem, Product, UserData } from '../types/index';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.code === product.code);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }

    setCart(
      cart.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const getCartTotal = (currentUser: UserData | null) => {
    return cart.reduce((sum, item) => {
      let price = item.product.price;
      if (currentUser?.isDuoc) {
        price = price * 0.8;
      }
      return sum + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  };
};
