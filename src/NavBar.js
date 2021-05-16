import { NavLink }  from "react-router-dom";
import React,{useState} from "react";

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
                <div class="overlay-content">
                <NavLink to="/" onClick={toggleNav}>Product</NavLink> {" "}
                <NavLink to="cart" onClick={toggleNav}>Cart</NavLink> {" "}
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
        </nav>
    </div>
  );
}

export default NavBar;