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
      <NavBar />
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
