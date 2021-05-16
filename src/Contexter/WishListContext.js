import { createContext, useContext, useState } from "react";

//WishList

export const WishListContext = createContext();

export function WishListProvider({ children }) {
  const [ItemsInWishList, SetItemsInWishList] = useState([]);

  return (
    <WishListContext.Provider value={{ ItemsInWishList, SetItemsInWishList }}>
      {children}
    </WishListContext.Provider>
  );
}

export function useWishList() {
  return useContext(WishListContext);
}
