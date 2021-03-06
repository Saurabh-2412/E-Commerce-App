import React from "react";
import axios from "axios";
import { useState, useReducer, useEffect } from "react";
import { useCartList } from "../../Contexter/CartContext";
import { useWishList } from "../../Contexter/WishListContext";

export const ProductListing = () => {
  const [ ItemsInProduct, SetItemsInProduct ] = useState([]);

  const { cartList, dispatchCart } = useCartList();
  const { wishList, dispatchWishList } = useWishList();
  const [accordian,setAccordian] = useState("none");
  const  { token } = JSON.parse(localStorage?.getItem("login")) || {}

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
      const { data } = await axios.get(
        "https://ecommercedata.saurabhsharma11.repl.co/v1/productData"
      );
      SetItemsInProduct(data);
    })();
  },[]);

  async function CartHandler(product) {
    if(!cartList.some((item) => item.id === product.id)){
      try {
        const {data} = await axios.post(
          "https://ecommercedata.saurabhsharma11.repl.co/v1/cartData",
          { product }
        );
        dispatchCart({ type: "Added", payload: data.cart});
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatchCart({ type: "AlreadyExist" });
    }
  }

  async function WishListHandler(product) {
    //console.log("wishlist handler",product);
    if(!wishList.some((item) => item.id === product.id)){
      try {
        const {data} = await axios.post(
          "https://ecommercedata.saurabhsharma11.repl.co/v1/wishlistData",
          { product }
        );
        //console.log("data posted in wish server",data.wish);
        if(wishList.some((item) => (item.id === product.id))){
          dispatchWishList({ type: "Remove", payload: data.wish});
        } else {
          dispatchWishList({ type: "Added", payload: data.wish});
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatchWishList({ type: "AlreadyExist" });
    }
    //dispatchProduct({type:"Added to wish", payload: product});
  }

  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy },
    dispatch
  ] = useReducer(
    function reducer(state, action) {
      switch (action.type) {
        case "TOGGLE_INVENTORY":
          return (state = {
            ...state,
            showInventoryAll: !state.showInventoryAll
          });

        case "TOGGLE_DELIVERY":
          return (state = {
            ...state,
            showFastDeliveryOnly: !state.showFastDeliveryOnly
          });
        case "SORT":
          return {
            ...state,
            sortBy: action.payload
          };
        default:
          return state;
      }
    },
    {
      showInventoryAll: true,
      showFastDeliveryOnly: false,
      sortBy: null
    }
  );

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const sortedData = getSortedData(ItemsInProduct, sortBy);//ItemsInProduct
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll
  });

  function accordianViewer(){
    if(accordian === "block"){
      setAccordian("none")
    } else {
      setAccordian("block")
    }
  }

  return (
    <div>
        <div>
          <button className="accordion" onClick={accordianViewer}>
          {/* <p style={{backgroundColor:"none", color:"#41464b",float:"left"}}><i className="material-icons" style={{color:"orange"}}>&#xe8e5;</i></p> */}
            <ion-icon name="filter" style={{fontSize:"2rem",marginRight:"8px"}}></ion-icon>
          </button>
          <fieldset className="panel" style={{display:accordian}}>
            <legend>Sort By</legend>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                }
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
              ></input>{" "}
              Price - High to Low
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                }
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
              ></input>{" "}
              Price - Low to High
            </label>
          </fieldset>
          <fieldset style={{ marginTop: "1rem",display:accordian}} className="panel">
            <legend> Filters </legend>
            <label>
              <input
                type="checkbox"
                checked={showInventoryAll}
                onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
              />
              Include Out of Stock
            </label>
  
            <label>
              <input
                type="checkbox"
                checked={showFastDeliveryOnly}
                onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
              />
              Fast Delivery Only
            </label>
          </fieldset>
          
          <ul className="ProductList">
            {filteredData.map(function (product) {
              return (
                <li key={product.id}>
                  {product.inStock ? (
                    <>
                      <button className="active icon-bttn" onClick={() => CartHandler(product)}>
                        <ion-icon name="cart"></ion-icon>
                      </button>
                      <button className="active icon-bttn" style={{margin:"1rem 14rem"}} onClick={() => WishListHandler(product)}>
                        <ion-icon name="heart"></ion-icon>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="icon-bttn" onClick={() => CartHandler(product)} disabled></button>
                      <button className="icon-bttn" onClick={() => WishListHandler(product)} disabled></button>
                    </>
                  )}
                      <img src={product.image} alt={product.image} />
                      <br />
                      <p style={{margin:"0 0 0 10px",fontSize:"large",fontWeight:"bolder",float:"left"}}>Product : {product.name}</p><br />
                      <p style={{margin:"0 0 0 10px",fontSize:"medium",float:"left"}}>Price : {product.price}</p><br />
                      <p style={{margin:"0 0 0 -80px",fontSize:"medium",float:"left"}}>Offer : {product.offer}</p><br />
                      <p style={{margin:"0 0 0 10px",fontSize:"medium",float:"left"}}></p><button style={{float:"right",margin:"6px 20px 0px 30px"}} onClick={() => CartHandler(product)}>Add to<ion-icon name="cart" style={{fontSize:"1rem"}}></ion-icon></button>
                      <p style={{margin:"0 0 0 10px",fontSize:"medium",float:"left",fontStyle:"italic"}}>Material : {product.material}</p>
                      <br />
                      <p style={{margin:"0 0 0 10px",fontSize:"medium",float:"left",fontStyle:"italic"}}>#idealfor : {product.idealFor}</p>
                      <button style={{float:"right",margin:"6px 20px 0px 30px"}} onClick={() => WishListHandler(product)}>Add to<ion-icon name="heart" style={{fontSize:"1rem"}}></ion-icon></button><br />
                      <p style={{margin:"0 0 0 10px",fontSize:"medium",float:"left",fontStyle:"italic"}}>
                        Avalibility :{product.inStock && <span> In Stock </span>}
                        {!product.inStock && <span> Out of Stock </span>}
                      </p><br />
                      <p style={{margin:"0 0 0 10px",fontSize:"medium",float:"left"}}>{product.fastDelivery ? (
                        <span></span>
                      ) : (
                        <span></span>
                      )}</p>
                </li>
              );
            })}
          </ul>
        </div>
    </div>
  );
}
