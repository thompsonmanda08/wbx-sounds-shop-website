import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>WBX-Sounds</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {/*THE CHILDREN ELEMENTS GO HERE*/}
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
