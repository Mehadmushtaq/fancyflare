import { useState, useContext, useCallback } from 'react';
import { CartContext, CartProvider } from './CartContext';
import { defaultCartContext } from './CartInterface';
import { useEffect } from 'react';
import { useToast } from '../../hooks/useToast';

export const CartContextContainer = ({ children }) => {
  const [state, setState] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : defaultCartContext;
  });

  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const clearCart = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      items: [],
    }));
  }, []);

  useEffect(() => {
    const clearCartTimeout = setTimeout(() => {
      clearCart();
      toast.error('Cart cleared due to inactivity');
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    return () => clearTimeout(clearCartTimeout);
  }, [clearCart, toast]);

  const calculateItemPrice = (item) => {
    const { color, variant, quantity } = item;

    let percentageOff = 0;
    if (item.product.is_discount === 1) {
      percentageOff = item.product.after_discount_price / 100; //after_discount_price actually percentage off like 10%
    }

    const selectedColor = item.product_color.find((c) => c.color === color);
    if (!selectedColor) return 0;

    // Determine the price based on the selected variant
    let price;
    switch (variant) {
      case 'small':
        price = selectedColor.small_size_price || 0;
        break;
      case 'medium':
        price = selectedColor.medium_size_price || 0;
        break;
      case 'large':
        price = selectedColor.large_size_price || 0;
        break;
      case 'extra_large':
        price = selectedColor.extra_large_size_price || 0;
        break;
      default:
        price = selectedColor.medium_size_price || 0;
    }

    const discountedPrice =
      item.product.is_discount === 1 ? price - price * percentageOff : price;

    // Calculate the total price for the item
    return discountedPrice * quantity;
  };

  const calculateTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + calculateItemPrice(item),
      0
    );
  };

  const addToCart = useCallback(
    (item) => {
      const itemExists = state.items.some(
        (existingItem) => existingItem.product.id === item.product.id
      );

      if (!itemExists) {
        const newItem = {
          ...item,
          totalPrice: calculateItemPrice(item),
        };

        setState((prevState) => ({
          ...prevState,
          items: [...prevState.items, newItem],
        }));

        toast.success('Added to cart');
      } else
        toast.error('Already in cart. To increase quantity go to cart page');
    },
    [state]
  );

  const updateCartItem = (itemId, updateFn) => {
    const updatedItems = state.items.map((item) =>
      item.product.id === itemId ? updateFn(item) : item
    );
    setState((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const increaseQuantity = useCallback(
    (itemId) => {
      updateCartItem(itemId, (item) => ({
        ...item,
        quantity: item.quantity + 1,
        totalPrice: calculateItemPrice({
          ...item,
          quantity: item.quantity + 1,
        }),
      }));
    },
    [state]
  );

  const decreaseQuantity = useCallback(
    (itemId) => {
      updateCartItem(itemId, (item) => ({
        ...item,
        quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        totalPrice: calculateItemPrice({
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        }),
      }));
    },
    [state]
  );

  const removeFromCart = useCallback((itemId) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.product.id !== itemId),
    }));
  }, []);

  return (
    <CartProvider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        count: state.items.length,
        totalPrice: calculateTotalPrice(),
      }}
    >
      {children}
    </CartProvider>
  );
};

export const useCartContext = () => useContext(CartContext);
