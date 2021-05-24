import React from "react";
import {  useEffect } from "react";
import { useCartList } from "../../Contexter/CartContext";

export function CartHeader() {
  const { cartList } = useCartList();
  return (
    <span style={{ float: "right", display: "block" }}>{cartList.length}</span>
  );
}

export function CartList() {

  const { cartList, dispatchCart } = useCartList();

  function TotalPrice(item) {
    return item.price * item.quantity;
  }

  return (
    <div>
      <h1>Cart</h1>
      <ul className="CartList">
        {cartList.map((product) => {
          return (
            <li key={product.id}>
              <div key={product.id} className="card horizontal">
                <img src={product.image} alt={product.image} />
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <div className="card-text">
                      <p>Price : {product.price}</p>
                      <p>IdealFor : {product.idealFor}</p>
                      <p>Color : {product.color}</p>
                      <p>Quantity :{product.quantity}
                        <button onClick={() => dispatchCart({ type: "Increment", payload: product })}>+</button>
                        <button onClick={() => dispatchCart({ type: "Decrement", payload: product })}>-</button>
                      </p>
                      <button onClick={() => dispatchCart({ type: "Remove", payload: product })}>Remove</button>
                      <br />
                      <br />
                      <hr></hr>
                      <div>
                        Total Price :{TotalPrice(product) ? <span> {TotalPrice(product)}</span> : 0}
                      </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
