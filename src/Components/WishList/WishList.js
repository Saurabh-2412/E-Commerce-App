import React from "react";
import { useWishList } from "../../Contexter/WishListContext";
import { useCartList } from "../../Contexter/CartContext";

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
      <h1>WishList</h1>
      <ul className="CartList">
        {console.log({ wishList })}
        {wishList.map((product) => (
          <li key={product.id}>
            <div key={product.id} className="card horizontal">
              <img src={product.image} alt={product.image} />
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <div className="card-text">
                    <p>Price : {product.price}</p>
                    <p>IdealFor : {product.idealFor}</p>
                    <p>Color : {product.color}</p>
                    <button onClick={() => dispatchWishList({ type: "Remove", payload: product })}>Remove</button>
                    <button onClick={() => MoveTOCartHandler(product)}>Move to cart</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
