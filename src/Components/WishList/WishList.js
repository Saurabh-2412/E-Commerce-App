import { useWishList } from "../../Contexter/WishListContext";
import { useState, useEffect } from "react";
import { ShowItem } from "./ShowItem";

export function WishListHeader() {
  const { ItemsInWishList } = useWishList();
  console.log({ ItemsInWishList });
  return (
    <span style={{ float: "right", display: "block" }}>
      {ItemsInWishList.length}{" "}
    </span>
  );
}

export function WishList() {
  const { ItemsInWishList, SetItemsInWishList } = useWishList();
  useEffect(() => {
    // setCurrentList(JSON.parse(localStorage.getItem(wishList)));
    const currentItem = localStorage.getItem(ItemsInWishList);
    console.log("getting from localstorage", currentItem);
  });
  return (
    <>
      <h1>WishList</h1>
      <ul className="CartList">
        {console.log({ ItemsInWishList })}
        {ItemsInWishList.map((item) => (
          <li key={item.id}>
            <ShowItem item={item} SetItemsInWishList={SetItemsInWishList} />
          </li>
        ))}
      </ul>
    </>
  );
}
