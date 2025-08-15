import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface CartItem {
  cartItemId: string;       // Unique ID for each cart entry
  id: string;               // Dish ID
  dishName: string;
  quantity: number;
  specialInstructions?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "cartItemId">) => {
    setCart((prev) => {
      const existsIndex = prev.findIndex(
        (i) =>
          i.id === item.id &&
          (i.specialInstructions || "").trim().toLowerCase() ===
            (item.specialInstructions || "").trim().toLowerCase()
      );

      if (existsIndex !== -1) {
        // Increase quantity of existing cart item
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          quantity: updated[existsIndex].quantity + item.quantity,
        };
        return updated;
      } else {
        // Add new cart item with unique cartItemId
        return [...prev, { ...item, cartItemId: uuidv4() }];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
