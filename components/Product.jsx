/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/products/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0]).url()}
            alt="Product"
            className="product-image"
            width={250}
            height={250}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">K {price}</p>
        </div>
      </Link>
    </div>
  );
};

//Get all static props from server
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == ${slug}[0]]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default Product;
