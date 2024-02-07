import { useState, useContext, useCallback } from 'react';
import { CartContext, CartProvider } from './CartContext';
import { defaultCartContext } from './CartInterface';
import { useEffect } from 'react';

export const CartContextContainer = ({ children }) => {
  const [state, setState] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : defaultCartContext;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = useCallback(
    (item) => {
      const itemExists = state.items.some(
        (existingItem) => existingItem.product.id === item.product.id
      );

      if (!itemExists) {
        setState((prevState) => ({
          ...prevState,
          items: [...prevState.items, item],
        }));
      }
    },
    [state]
  );

  const removeFromCart = useCallback((itemId) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.id !== itemId),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      items: [],
    }));
  }, []);

  return (
    <CartProvider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        clearCart,
        count: state.items.length,
      }}
    >
      {children}
    </CartProvider>
  );
};

export const useCartContext = () => useContext(CartContext);
