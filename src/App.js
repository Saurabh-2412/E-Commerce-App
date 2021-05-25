import './App.css';
import { ProductListing } from "./Components/Product/ProductListing";
import { CartList } from "./Components/Cart/CartList";
import { WishList } from "./Components/WishList/WishList";
import NavBar from "./Components/NavBar/NavBar";
import {Routes, Route} from "react-router-dom";
import { Modal } from "./Components/Modal";
import { CartModal } from "./Components/Modal"
import { useProduct } from './Contexter/ProductContext';
import { useCartList } from './Contexter/CartContext';

function App() {
  const { displayModal, modalContent } = useProduct();
  const { displayCartModal, cartModalContent } = useCartList();
  
  return (
    <div className="App">
      <NavBar />
      {displayModal && <Modal modalContent={modalContent} />}
      {displayCartModal && <CartModal cartModalContent={cartModalContent} />}
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/home" element={<ProductListing />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}

export default App;
