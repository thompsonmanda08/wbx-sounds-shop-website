import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <Link href="/">
            <Image src={logo} alt="logo" width={60} height={60} />
          </Link>
        </div>
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>

        {/* THIS WILL SHOW THE CART ONLY IF showCart === true */}
        {showCart && <Cart />}
      </div>
    </nav>
  );
};

export default Navbar;
