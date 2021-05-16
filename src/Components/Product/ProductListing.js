import { data } from "../../Data/data";
import { useState, useReducer, useEffect } from "react";
import { useCart } from "../../Contexter/CartContext";
import { useWishList } from "../../Contexter/WishListContext";
//import { useBttnCart } from "../Cart/CartContext";

export function ProductListing() {
  // var [cartList, setCartList] = useState([]);
  const { ItemsInCart, SetItemsInCart } = useCart([]);
  const { ItemsInWishList, SetItemsInWishList } = useWishList([]);
  const [accordian,setAccordian] = useState("none");

  function onClickHandler(item) {
    //SetBttnText("Go to cart");
    if (ItemsInCart.some((e) => e.id === item.id)) {
      SetItemsInCart((itincart) =>
        itincart.map((it) => {
          if (it.id === item.id) {
            return { ...it, quantity: it.quantity + 1 };
          }
          return it;
        })
      );
    } else {
      SetItemsInCart((cartItems) => [...cartItems, { ...item, quantity: 1 }]);
    }
  }

  useEffect(() => {
    // setCurrentList(JSON.parse(localStorage.getItem(wishList)));
    const savingItem = localStorage.setItem(
      "ItemsInCart",
      JSON.stringify(ItemsInCart)
    );
    console.log("data saved..." + savingItem);
  });

  function onWishListClickHandler(item) {
    console.log("WishList", item);
    const newItem = ItemsInWishList.find((e) => e.id === item.id);
    if (newItem) {
      SetItemsInWishList((itincart) =>
        itincart.map((it) => {
          if (it.id === item.id) {
            return { ...it };
          }
          return it;
        })
      );
    } else {
      SetItemsInWishList((WishListItems) => [...WishListItems, { ...item }]);
    }
  }
  useEffect(() => {
    // setCurrentList(JSON.parse(localStorage.getItem(wishList)));
    const savingItem = localStorage.setItem(
      "ItemsInWishList",
      JSON.stringify(ItemsInWishList)
    );
    console.log("data saved..." + savingItem);
  });

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

  const sortedData = getSortedData(data, sortBy);
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
        <button class="accordion" onClick={accordianViewer}>
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
            {filteredData.map(function (item) {
              return (
                <li key={item.id}>
                  <img src={item.image} alt={item.image} />
                  <br />
                  Name : {item.name}<br />
                  Price : {item.price}
                  <br />
                  Avalibility :{item.inStock && <span> In Stock </span>}
                  {!item.inStock && <span> Out of Stock </span>}
                  <br />
                  {item.fastDelivery ? (
                    <div> Fast Delivery </div>
                  ) : (
                    <div> 4 days minimum </div>
                  )}
                  <br/>
                  <button onClick={() => onClickHandler(item)}>Add to cart</button>
                  <br />
                  <br />
                  <button onClick={() => onWishListClickHandler(item)}>
                    Add to WishList
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
