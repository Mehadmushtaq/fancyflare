import React from "react";
import { defaultCartContext } from "./CartInterface";

export const CartContext = React.createContext(defaultCartContext);
export const CartProvider = CartContext.Provider;
export const CartConsumer = CartContext.Consumer;
