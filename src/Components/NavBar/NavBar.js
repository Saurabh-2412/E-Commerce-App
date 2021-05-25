import { NavLink }  from "react-router-dom";
import React,{useState} from "react";
import { CartHeader } from "../Cart/CartList";
import { WishListHeader } from "../WishList/WishList";
import {Modal} from "../Modal"

function NavBar() {

  const [winWidth, setWinWidth] = useState("0%");

  function toggleNav() {
    if (winWidth === "0%") {
    setWinWidth("100%");
    } else {
    setWinWidth("0%");
    }
  }

  return (
    <div>
        <nav>
            <div style={{ width: winWidth }} className="overlay">
              <button className="closebtn" onClick={toggleNav}></button>
              <div className="overlay-content">
                <NavLink to="/" style={{backgroundColor:"none"}} onClick={toggleNav}>Product</NavLink> {" "}
                <NavLink to="cartlist" onClick={toggleNav}>Cart</NavLink> {" "}
                <NavLink to="wishlist" onClick={toggleNav}>Wishlist</NavLink>
              </div>
            </div>
        </nav>

        <nav className="navigation">
          <span
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={toggleNav}
          >
            &#9776;
          </span>
          <NavLink to="home">
            <span>
              <ion-icon name="home" style={{fontSize:"2rem"}}></ion-icon>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem"}}></span>
            </span>
          </NavLink>
          <NavLink to="cartlist">
            <span>
              <ion-icon name="cart" style={{fontSize:"2rem"}}></ion-icon>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem",display:"flex-end"}}><CartHeader /></span>
            </span>
          </NavLink>
          <NavLink to="wishlist">
            <span>
              <ion-icon name="heart" style={{fontSize:"2rem"}}></ion-icon>
              <span style={{color:"orange",fontWeight:"bolder",position: "relative",top: "-0.25rem"}}><WishListHeader /></span>
            </span>
          </NavLink>
        </nav>
    </div>
  );
}

export default NavBar;