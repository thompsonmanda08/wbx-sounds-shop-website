import React, { useState, useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";

import { useStateContext } from "../context/StateContext";
import runFireWorks from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireWorks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt</p>
        <p className="description">
          If you need any help please email <br />
          <a href="mailto:wbx.help@inter-webb.com">wbx.help@inter-webb.com</a>
        </p>

        <Link href="/">
          <button type="button" className="btn">
            Get Back To Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
