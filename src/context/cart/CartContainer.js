import { useState, useContext, useCallback } from "react";
import { CartContext, CartProvider } from "./CartContext";
import { defaultCartContext } from "./CartInterface";
import { useEffect } from "react";

export const CartContextContainer = ({ children }) => {
  const [state, setState] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : defaultCartContext;
  });

  useEffect(() => {
    // Update localStorage whenever the cart state changes
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = useCallback((item) => {
    setState((prevState) => ({
      ...prevState,
      items: [...prevState.items, item],
    }));
  }, []);

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
      }}
    >
      {children}
    </CartProvider>
  );
};

export const useCartContext = () => useContext(CartContext);
