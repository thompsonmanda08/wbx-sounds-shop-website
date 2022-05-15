import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";

import { Product } from "../../components";
import { urlFor, client } from "../../lib/client";
import { useStateContext } from "../../context/StateContext";

//Component
const ProductDetails = ({ product, products }) => {
  const { details, image, name, price } = product;
  const [index, setIndex] = useState(0);
  const { decreaseQty, increaseQty, qty, onAddToCart } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index]).url()}
              alt={name}
              className="product-detail-image"
            />
          </div>

          <div className="small-images-container">
            {image.map((item, i) => (
              <img
                src={urlFor(item).url()}
                alt={name}
                onMouseEnter={() => setIndex(i)}
                key={item._id}
                className={
                  i == index ? "small-image selected-image" : "small-image"
                }
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>

          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">K {price}</p>

          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              onClick={() => onAddToCart(product, qty)}
              className="add-to-cart"
            >
              Add to Cart
            </button>
            <button type="button" onClick="" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You May Also Like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

//Get all static props from server
export const getStaticProps = async ({ params: { slug } }) => {
  // PARAMS FROM THE URL can be destructured
  // We are accessing SLUG dynamically but in the end it has to be a string
  // So after making a template literal...
  // we need to extra '' e.g '${variable}' to convert the VARIABLE to a string
  // We then use indexing to access the the First Element of the returned ARRAY.
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;

  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(productQuery);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);

  const paths = products.map((product) => {
    return {
      params: { slug: product.slug.current },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default ProductDetails;
