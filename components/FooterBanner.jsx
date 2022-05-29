/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    product,
    image,
    discount,
    largeText1,
    largeText2,
    midText,
    smallText,
    desc,
    saleTime,
    buttonText,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>

        <img
          src={urlFor(image).url()}
          alt={product}
          className="footer-banner-image"
        />

        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/products/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
