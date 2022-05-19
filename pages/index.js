import { client } from "../lib/client";
import { Cart, HeroBanner, Product, FooterBanner } from "../components";

const HomePage = ({ products, bannerData }) => {
  return (
    <div>
      {/* banner data returns an array*/}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map(
          //The ? is to make sure that there is data present then execute the map function.
          (product) => (
            <Product key={product._id} product={product} />
          )
        )}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[1]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const productsQuery = "*[_type == 'product']";
  const products = await client.fetch(productsQuery);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return { props: { products, bannerData } };
};

export default HomePage;
