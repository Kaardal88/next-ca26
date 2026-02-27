"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types/game";
import { it } from "node:test";

// 1. Definer hva som skal være i "ryggsekken"
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Lag en "Provider" - denne skal pakke inn appen din
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* const addToCart = (product: Product) => {
    if (cart.find((item) => {if(item.id === product.id){item.quantity += 1})) */

  /*


    setCart((prev) => {
      prev.map((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
          return prev;
        }
      });
      return [...prev, product];
    }); */

  // Tips: Her kan du senere legge til logikk for å sjekke om varen alt finnes
  /* }; */

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Lag en "hook" så det er superenkelt å bruke contexten senere
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
