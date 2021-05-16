import { useWishList } from "../Contexter/CartContext";
import { useCart } from "../Contexter/CartContext";
import { useState, useEffect } from "react";

function ShowItem({ item, SetItemsInWishList }) {
  const { ItemsInCart, SetItemsInCart } = useCart([]);

  function RemoveItem(item) {
    SetItemsInWishList((itincart) =>
      itincart.filter((element) => element.id !== item.id)
    );
  }

  function MoveToCart(item) {
    if (ItemsInCart.some((e) => e.id === item.id)) {
      SetItemsInWishList((itincart) =>
        itincart.filter((element) => element.id !== item.id)
      );
      SetItemsInCart((itincart) =>
        itincart.map((it) => {
          if (it.id === item.id) {
            return { ...it, quantity: it.quantity + 1 };
          }
          return it;
        })
      );
    } else {
      SetItemsInWishList((itincart) =>
        itincart.filter((element) => element.id !== item.id)
      );
      SetItemsInCart((cartItems) => [...cartItems, { ...item, quantity: 1 }]);
    }
  }
  useEffect(() => {
    // setCurrentList(JSON.parse(localStorage.getItem(wishList)));
    const currentItem = localStorage.getItem(ItemsInCart);
    console.log("getting from localstorage", currentItem);
  });

  return (
    <div>
      <div key={item.id}>
        <h2>{item.name}</h2>
        <img src={item.image} alt={item.image} />
        <p>Price : {item.price}</p>
        <button onClick={() => RemoveItem(item)}>Remove</button>
        <button onClick={() => MoveToCart(item)}>Move to cart</button>
      </div>
    </div>
  );
}

export function WishListHeader() {
  const { ItemsInWishList } = useWishList();
  console.log({ ItemsInWishList });
  return (
    <span style={{ float: "right", display: "block" }}>
      {ItemsInWishList.length}{" "}
    </span>
  );
}

export function WishList() {
  const { ItemsInWishList, SetItemsInWishList } = useWishList();
  useEffect(() => {
    // setCurrentList(JSON.parse(localStorage.getItem(wishList)));
    const currentItem = localStorage.getItem(ItemsInWishList);
    console.log("getting from localstorage", currentItem);
  });
  return (
    <>
      <h1>WishList</h1>
      <ul className="CartList">
        {console.log({ ItemsInWishList })}
        {ItemsInWishList.map((item) => (
          <li key={item.id}>
            <ShowItem item={item} SetItemsInWishList={SetItemsInWishList} />
          </li>
        ))}
      </ul>
    </>
  );
}
