import { useState, useReducer, useEffect } from "react";
import { useCart } from "../Contexter/CartContext";

function ShowItem({ item, SetItemsInCart }) {
  function AddAndDec(opp) {
    if (opp === "Increment") {
      SetItemsInCart((itincart) =>
        itincart.map((it) => {
          if (it.id === item.id) {
            return {
              ...it,
              quantity: it.quantity + 1
            };
          }
          return it;
        })
      );
    } else if (opp === "Decrement") {
      SetItemsInCart((itincart) =>
        itincart.map((it) => {
          if (it.id === item.id && it.quantity !== 0) {
            return {
              ...it,
              quantity: it.quantity - 1
            };
          } else {
            return { ...it };
          }
          // return it;
        })
      );
    } else if (opp === "Remove") {
      SetItemsInCart((itincart) =>
        itincart.filter((element) => element.id !== item.id)
      );
    }
  }

  function TotalPrice(item) {
    return item.price * item.quantity;
  }

  return (
    <div>
      <div key={item.id}>
        <h2>{item.name}</h2>
        <img src={item.image} alt={item.image} />
        <p>Price : {item.price}</p>
        Quantity : &nbsp;
        <span>{item.quantity}</span>&nbsp; &nbsp;
        <button onClick={() => AddAndDec("Increment")}>+</button>
        <button onClick={() => AddAndDec("Decrement")}>-</button>
        <br />
        <button onClick={() => AddAndDec("Remove")}>Remove</button>
        <br />
        <br />
        <div>
          Total Price :{TotalPrice(item) ? <span> {TotalPrice(item)}</span> : 0}
        </div>
      </div>
    </div>
  );
}

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
