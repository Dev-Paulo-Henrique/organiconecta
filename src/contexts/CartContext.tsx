import React, { createContext, useState, ReactNode, useEffect } from "react";

// Definindo o tipo do item no carrinho
interface CartItem {
  id: string;
  quantity: number;
  produtoNome: string;
  produtoImagens: string;
  produtoPreco: number | string;
  produtoQuantidade: number | string;
}

// Definindo o tipo do contexto
export interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  removeProduct: (id: string) => void;
  deleteItems: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Estado para verificar se estamos no cliente (navegador)
  const [isClient, setIsClient] = useState(false);

  // Recuperando os itens do carrinho do localStorage, se existirem
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Atualizando o estado para saber quando o código estiver sendo executado no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Persistindo os itens do carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  // Adicionando um item ao carrinho
  const addItem = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  // Removendo um item do carrinho (diminuindo a quantidade ou removendo totalmente)
  const removeItem = (id: string) => {
    setCartItems((prevItems) => {
      return prevItems.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as typeof prevItems);
    });
  };

  const removeProduct = (id: string) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };
  

  // Deletando todos os itens do carrinho
  const deleteItems = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addItem,
      removeItem,
      deleteItems,
      removeProduct
    }}>
      {children}
    </CartContext.Provider>
  );
};
