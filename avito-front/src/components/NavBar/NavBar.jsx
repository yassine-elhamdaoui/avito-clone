// Navbar.js
import React, { useState } from "react";
import { HiOutlineArrowUpOnSquareStack } from "react-icons/hi2";
import { IoHomeOutline, IoCartOutline } from "react-icons/io5";


import "./navBar.scss";
import { NavLink, useNavigate } from "react-router-dom";
 

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleProfileClicked = () => {
    navigate("/profile/settings");
    toggleMobileMenu(); // Close the mobile menu after clicking a NavLink
  }
  const handleAddProductClicked = () => {
    navigate("/add-product");
    toggleMobileMenu(); // Close the mobile menu after clicking a NavLink
  };
  const handleNavLinkClick = () => {
    toggleMobileMenu(); // Close the mobile menu after clicking a NavLink
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">Your Logo</div>
        <div className="right-hand-side">
          <div className={`menu ${isMobileMenuOpen ? "open" : ""}`}>
            <ul>
              <li onClick={handleNavLinkClick}>
                <span><IoHomeOutline /></span>
                <p>
                  <NavLink to="/">Home</NavLink>
                </p>
              </li>
              <li onClick={handleNavLinkClick}>
                <span><HiOutlineArrowUpOnSquareStack /></span>
                <p><NavLink to="/profile/my-adds">My adds</NavLink></p>
              </li>
              <li onClick={handleNavLinkClick}>
                <span><IoCartOutline /></span>
                <NavLink to="/profile/cart">My cart</NavLink>
                <p></p>
              </li>
            </ul>

            <div className="buttons">
              
              {localStorage.getItem("token") == null ? <button onClick={()=>{navigate("/signUp") ; toggleMobileMenu()}} className="sign-up-button">Sign Up</button> :
               <button className="user" onClick={handleProfileClicked}>
                <img src={`http://localhost:8000/uploads/images/users/${localStorage.getItem("imageName")}`} alt="" />
                <p className="welcome">welcome</p>
                <>
                  {
                    localStorage.getItem("name") != "null" ? <p className="name">{localStorage.getItem("name")}</p> : "" 
                  }
                </>
              </button>}
              <button className="add-product-button" onClick={handleAddProductClicked}>Add Product</button>
            </div>
          </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMobileMenuOpen ? "open" : ""}`}></div>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
