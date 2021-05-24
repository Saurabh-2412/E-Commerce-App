import { data } from "../../Data/data";
import React from "react";
import axios from "axios";
import { useState, useReducer, useEffect } from "react";

import { useProduct } from "../../Contexter/ProductContext";
import { useCartList } from "../../Contexter/CartContext";
import { useWishList } from "../../Contexter/WishListContext";
//import {FilteredData} from "./FilteredData"

export function ProductListing() {
  const { ItemsInProduct, SetItemsInProduct } = useProduct();
  const { cartList, dispatchCart } = useCartList();
  const { wishList, dispatchWishList } = useWishList();
  const [accordian,setAccordian] = useState("none");
  const [cartColor,setCartColor] = useState("white");
  const [wishListColor, setWishListColor] = useState("white");

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://ecommercedata.saurabhsharma11.repl.co/v1/productData"
      );
      SetItemsInProduct(data);
    })();
  });

  function CartHandler(product) {
    console.log("cart handler",product);
    dispatchCart({ type: "Added", payload: product});
    CartColorHandler(product);
  }

  function WishListHandler(product) {
    console.log(product);
    dispatchWishList({ type: "Added", payload: product});
  }

  function CartColorHandler(product){
    console.log("cart color handler",product);
    if(cartList.find((item) => (item.id === product.id))){
      setCartColor("orange");
    } else {
      setCartColor("white");
    }
  }

  //filtering data
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

  const sortedData = getSortedData(ItemsInProduct, sortBy);//data
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
        <h1>Products Listing</h1>
        <ul className="ProductList">
            {filteredData.map(function (product) {
              return (
                <li key={product.id}>
                  <button className="icon-bttn" style={{}} onClick={() => CartHandler(product)}>
                    <ion-icon name="cart"></ion-icon>
                  </button>
                  <button className="icon-bttn" style={{margin:"1rem 14rem"}} onClick={() => WishListHandler(product)}>
                    <ion-icon name="heart"></ion-icon>
                  </button>
                  <img src={product.image} alt={product.image} />
                  <br />
                  Name : {product.name}<br />
                  Price : {product.price}
                  <br />
                  Avalibility :{product.inStock && <span> In Stock </span>}
                  {!product.inStock && <span> Out of Stock </span>}
                  <br />
                  {product.fastDelivery ? (
                    <div> Fast Delivery </div>
                  ) : (
                    <div> 4 days minimum </div>
                  )}
                  {/** 
                    <br/>
                    <button onClick={() => CartHandler(product)}>Add to cart</button>
                    <br />
                    <br />
                    <button onClick={() => WishListHandler(product)}>
                      Add to WishList
                    </button>
                  */}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
