// contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo do produto
interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

// Definindo o tipo do contexto
export interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
}

// Criando o contexto com valor inicial undefined
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Definindo o provider para envolver a aplicação
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
        return [...prevItems];
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
