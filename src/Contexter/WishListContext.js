import { createContext, useContext, useReducer } from "react";
import { wishListReducer } from "../Reducer/WishListReducer";

export const WishListContext = createContext();

const initialState = {
  wishList: []
};

export function WishListProvider({ children }) {
  const [state, dispatchWishList] = useReducer(wishListReducer, initialState);

  return (
    <WishListContext.Provider value={{ ...state, dispatchWishList }}>
      {children}
    </WishListContext.Provider>
  );
}

export function useWishList() {
  return useContext(WishListContext);
}
