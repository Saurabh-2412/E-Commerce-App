import { createContext, useContext, useState } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [ItemsInProduct, SetItemsInProduct] = useState([]);

  return (
    <ProductContext.Provider value={{ ItemsInProduct, SetItemsInProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}