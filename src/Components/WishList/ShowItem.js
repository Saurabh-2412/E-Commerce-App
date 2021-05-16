import { useCart } from "../../Contexter/CartContext";
import { useEffect } from "react";

export function ShowItem({ item, SetItemsInWishList }) {
  const { ItemsInCart, SetItemsInCart } = useCart([]);

  function RemoveItem(item) {
    SetItemsInWishList((itincart) => itincart.filter((element) => element.id !== item.id)
    );
  }

  function MoveToCart(item) {
    if (ItemsInCart.some((e) => e.id === item.id)) {
      SetItemsInWishList((itincart) => itincart.filter((element) => element.id !== item.id)
      );
      SetItemsInCart((itincart) => itincart.map((it) => {
        if (it.id === item.id) {
          return { ...it, quantity: it.quantity + 1 };
        }
        return it;
      })
      );
    } else {
      SetItemsInWishList((itincart) => itincart.filter((element) => element.id !== item.id)
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
      <div key={item.id} className="card horizontal">
        <img src={item.image} alt={item.image} />
        <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <div className="card-text">
                <p>Price : {item.price}</p>
                <p>IdealFor : {item.idealFor}</p>
                <p>Color : {item.color}</p>
                <button onClick={() => RemoveItem(item)}>Remove</button>
                <button onClick={() => MoveToCart(item)}>Move to cart</button>
            </div>
        </div>
      </div>
  );
}
