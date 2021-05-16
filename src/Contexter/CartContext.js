import { createContext, useContext, useState } from "react";

//Cart
export const CartContext = createContext();
export function CartProvider({ children }) {
  const [ItemsInCart, SetItemsInCart] = useState([]);

  return (
    <CartContext.Provider value={{ ItemsInCart, SetItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
