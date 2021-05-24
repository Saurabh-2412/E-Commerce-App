import './App.css';
import { ProductListing } from "./Components/Product/ProductListing";
import { CartList } from "./Components/Cart/CartList";
import { WishList } from "./Components/WishList/WishList";
import NavBar from "./Components/NavBar/NavBar";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>

    
  );
}

export default App;
