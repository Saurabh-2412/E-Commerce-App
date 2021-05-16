import { useState, useReducer, useEffect } from "react";
import { useCart } from "../../Contexter/CartContext";
import { ShowItem } from "./ShowItem";

export function CartHeader() {
  const { ItemsInCart } = useCart();
  console.log({ ItemsInCart });
  return (
    <span style={{ float: "right", display: "block" }}>
      {ItemsInCart.length}
    </span>
  );
}

export function Cart() {
  const { ItemsInCart, SetItemsInCart } = useCart();
  useEffect(() => {
    // setCurrentList(JSON.parse(localStorage.getItem(wishList)));
    const currentItem = localStorage.getItem(ItemsInCart);
    console.log("getting from localstorage", currentItem);
  });
  return (
    <>
      <h1>Cart</h1>
      <ul className="CartList">
        {ItemsInCart.map((item) => (
          <li key={item.id}>
            <ShowItem item={item} SetItemsInCart={SetItemsInCart} />
          </li>
        ))}
      </ul>
    </>
  );
}
