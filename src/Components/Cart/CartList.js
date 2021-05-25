import React, { useState } from "react";
import {  useEffect } from "react";
import { NavLink }  from "react-router-dom";
import { useCartList } from "../../Contexter/CartContext";
import { ProductListing } from "../Product/ProductListing";

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
      <ul className="CartList">
        {cartList.length > 0 ? (
          cartList.map((product) => {
            return (
              <li key={product.id}>
                <div key={product.id} className="card horizontal">
                  <img src={product.image} alt={product.image} />
                  <div className="card-body">
                    <h2 className="card-title" style={{borderBottom:"1px solid gray"}}>{product.name}</h2>
                    <div className="card-text">
                        <p>Price : {product.price}</p>
                        <p>IdealFor : {product.idealFor}</p>
                        <p>Color : {product.color}</p>
                        <p>{product.offer}</p>
                        <p>Quantity :{product.quantity}
                          <button className="btn btn-secondary btn-sm" onClick={() => dispatchCart({ type: "Increment", payload: product })}>+</button>
                          <button className="btn btn-secondary btn-sm" onClick={() => dispatchCart({ type: "Decrement", payload: product })}>-</button>
                        </p>
                        <button className="btn btn-secondary btn-sm" onClick={() => dispatchCart({ type: "Remove", payload: product })}>Remove</button>
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
          })
        ) : (
          <div>
            <p style={{color:"orange",fontWeight:"bolder",fontSize:"1.8rem",marginTop:"10rem"}}>No items available in cart</p>
            <NavLink className="NavLink" to="../" style={{textDecoration:"none"}}>
                <span style={{}}>Shop Now</span>
            </NavLink>
          </div>
        )}
      </ul>
    </div>
  );
}
