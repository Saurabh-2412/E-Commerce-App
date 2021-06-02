import React, { useState } from "react";
import {  useEffect } from "react";
import axios from "axios"
import { NavLink }  from "react-router-dom";
import { useCartList } from "../../../Contexter/CartContext";
import { ProductListing } from "../../Product/ProductListing";
import { useAuth } from "../../../Contexter/AuthContext"
import { useNavigate } from "react-router-dom";

export function CartHeader() {
  const { cartList } = useCartList();
  return (
    <span style={{ float: "right", display: "block" }}>{cartList.length}</span>
  );
}

export function CartList() {
  const { cartList, dispatchCart } = useCartList();
  const  { token,id } = JSON.parse(localStorage?.getItem("login")) || {};
  const navigate = useNavigate();

  //fetching cart list data
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  useEffect(() => {
    (async function () {
      try{
        const { data } = await axios.get(
          `https://ecommercedata.saurabhsharma11.repl.co/v1/cartData/${id}`
        );
        console.log("this is cart list items",data.cartProduct);
        dispatchCart({ type: "Loading", payload: data.cartProduct })
      }
      catch(err){
        if(err.status){
          return navigate('/login');
        }
      }
    })();
  },[token]);

  function TotalPrice(item) {
    return item.price * item.quantity;
  }

  //removing cart data from server
  async function RemoveHandler(product){
    const productId = product._id;
    //console.log("this is productID",productId)
    try {
      const { data } = 
        await axios.delete("https://ecommercedata.saurabhsharma11.repl.co/v1/cartData",
        {data:{"productId":productId}}
      );
        //console.log("deleteing item", data)
        dispatchCart({ type: "Remove", payload: data.cartProduct })
      } catch (err) {
        console.log(err);
      }
  }

  async function IncreaseAndDecrease(product,action){
    const productId = product._id;

    if(action === "Increment"){
      const quantity = product.quantity + 1;
      try{
        const { data } = await axios.post("https://ecommercedata.saurabhsharma11.repl.co/v1/cartData/cartUpdate",
        { "productId": productId, "quantity":quantity})
        //console.log("resp from server quantity", data)
        dispatchCart({ type: "Increment", payload: data.cart });
      }
      catch(err){
        console.log(err);
      }
      //console.log("Increased");
    } else {
      const quantity = product.quantity - 1;
      try{
        const { data } = await axios.post("https://ecommercedata.saurabhsharma11.repl.co/v1/cartData/cartUpdate",
        { "productId": productId, "quantity":quantity})
        console.log("resp from server quantity", data)
        dispatchCart({ type: "Decrement", payload: product })
      }
      catch(err){
        console.log(err);
      }
      console.log("decreased");
    }
  }

  return (
    <div>
      <ul className="CartList">
      <h1 style={{color:"orange",border:"2px solid gray",borderRadius:"5px"}}>Your cart collection</h1>
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
                        <p>Quantity :{product.quantity}<br/>
                          <button className="btn btn-secondary btn-sm" name="+" onClick={() => IncreaseAndDecrease(product,"Increment")}>+</button>
                          <button className="btn btn-secondary btn-sm" onClick={() => IncreaseAndDecrease(product,"Decrement")}>-</button>
                        </p>
                        <button className="btn btn-secondary btn-sm" onClick={() => RemoveHandler(product)}>Remove</button>
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
            <p style={{color:"orange",fontWeight:"bolder",fontSize:"1.8rem",marginTop:"10rem"}}>No items available in WishList</p>
            <NavLink className="NavLink" to="../" style={{textDecoration:"none"}}>
                <span style={{}}>Shop Now</span>
            </NavLink>
          </div>
        )}
      </ul>
    </div>
  );
}
