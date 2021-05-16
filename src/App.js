import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { ProductListing } from "./Components/Product/ProductListing";
import { Cart } from "./Components/Cart/CartList";
import { WishList } from "./Components/WishList/WishList";
import NavBar from "./Components/NavBar/NavBar";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>

    
  );
}

export default App;
