import React, { createContext, useEffect, useState } from "react";
import {
  addItemToCart,
  deleteItem,
  getCartTotal,
  removeItemFromCart
} from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleCartHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const toggleCartHidden = () => setHidden(!hidden);
  const addItem = item => setCartItems(addItemToCart(cartItems, item));
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = item => setCartItems(deleteItem(cartItems, item));

  useEffect(() => {
    setCartItemCount(getCartTotal(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        cartItems,
        toggleCartHidden,
        addItem,
        cartItemCount,
        removeItem,
        clearItemFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
