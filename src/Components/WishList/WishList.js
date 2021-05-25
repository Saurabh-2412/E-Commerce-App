import React from "react";
import { useWishList } from "../../Contexter/WishListContext";
import { useCartList } from "../../Contexter/CartContext";
import { NavLink }  from "react-router-dom";

export function WishListHeader() {
  const { wishList } = useWishList();
  return (
    <span style={{ float: "right", display: "block" }}>{wishList.length}</span>
  );
}

export function WishList() {
  const { wishList, dispatchWishList } = useWishList();
  const { cartList, dispatchCart } = useCartList();

  function MoveTOCartHandler(product) {
    console.log("moved to cart", product);
    dispatchWishList({ type: "MoveToCart", payload: product });
    dispatchCart({ type: "MoveToCart", payload: product });
  }

  return (
    <>
      <ul className="CartList">
        {wishList.length > 0 ? (
          wishList.map((product) => (
            <li key={product.id}>
              <div key={product.id} className="card horizontal">
                <img src={product.image} alt={product.image} />
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <div className="card-text">
                      <p>Price : {product.price}</p>
                      <p>IdealFor : {product.idealFor}</p>
                      <p>Color : {product.color}</p>
                      <button className="btn btn-secondary btn-sm" onClick={() => dispatchWishList({ type: "Remove", payload: product })}>Remove</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => MoveTOCartHandler(product)}>Move to cart</button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>
            <p style={{color:"orange",fontWeight:"bolder",fontSize:"1.8rem",marginTop:"10rem"}}>No items available in WishList</p>
            <NavLink className="NavLink" to="../" style={{textDecoration:"none"}}>
                <span style={{}}>Shop Now</span>
            </NavLink>
          </div>
        )}
      </ul>
    </>
  );
}
