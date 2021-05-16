import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { ProductListing } from "./Product/ProductListing";
import { Cart } from "./Cart/CartList";
import { CartHeader } from "./Cart/CartList";
import { WishList } from "./WishList/WishList";
import { WishListHeader } from "./WishList/WishList";
import NavBar from "../src/NavBar";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>E-Commerce</h1>
      <NavBar />
      <span
        style={{ float: "right", border: "2px solid gray", padding: "5px" }}
      >
        Cart :<CartHeader />
      </span>
      <span
        style={{ float: "right", border: "2px solid gray", padding: "5px" }}
      >
        WishList :<WishListHeader />
      </span>
      <br />
      <br />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
      <br />
    </div>

    
  );
}

export default App;
