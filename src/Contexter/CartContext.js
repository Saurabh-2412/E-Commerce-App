import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../Reducer/CartReducer";
//import { wishListReducer } from "../Reducer/WishListReducer";

export const CartContext = createContext();

const initialState = {
  cartList: []
};

export function CartProvider({ children }) {
  const [state, dispatchCart] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ ...state, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartList() {
  return useContext(CartContext);
}
