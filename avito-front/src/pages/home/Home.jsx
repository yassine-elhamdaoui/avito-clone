import React, { useEffect, useState } from 'react'
import { FaLaptop, FaRegBuilding } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { LuSofa } from "react-icons/lu";
import './home.scss'
import ProductCard from '../../components/Product_card/ProductCard';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import Loader2 from '../../components/Loader2/Loader2';

function Home() {
  const navigate = useNavigate();
  const [data,setData] = useState(null)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (localStorage.getItem("token") === null) {
          navigate("/login");
          return;
        }

        const fetchedProducts =  await getProducts(
          localStorage.getItem("token")
        );
        setData(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchProducts();
  }, [navigate]);

const handleCategory = (categoryId, categoryName) => {
  const encodedName = encodeURIComponent(categoryName || ""); // Encode or use an empty string if null
  const nameParam = encodedName ? `&name=${encodedName}` : "";
  navigate(`/products?category=${categoryId}${nameParam}`);
};

  return (
    <div className="home">
      <section className="categories-section">
        <h3 className="title">
          <span></span>Categories
        </h3>
        <h2 className="inner-title">Browse by Category</h2>
        <div className="categories">
          <button
            className="category"
            onClick={() => handleCategory(1, "Electronics")}
          >
            <div className="icon-holder">
              <FaLaptop />
            </div>
            <h5>electronics</h5>
          </button>
          <button
            className="category"
            onClick={() => handleCategory(2, "For Home")}
          >
            <div className="icon-holder">
              <LuSofa />
            </div>
            <h5>for home</h5>
          </button>
          <button
            className="category"
            onClick={() => handleCategory(3, "Apartments")}
          >
            <div className="icon-holder">
              <FaRegBuilding />
            </div>
            <h5>apartments</h5>
          </button>
          <button
            className="category"
            onClick={() => handleCategory(4, "Vehicles")}
          >
            <div className="icon-holder">
              <IoCarSport />
            </div>
            <h5>vehicles</h5>
          </button>
        </div>
      </section>
      <div>
        <section className="today-section">
          <h3 className="title">
            <span></span>Today's
          </h3>
          <div className="cards">
            {data === null ? (
              <div style={{width:"100%" ,height:"100px", display:"flex" , justifyContent:"center"}}>
                <Loader2 />
              </div>
            ) : (
              <>
                {data["hydra:member"].length != 0
                  ? data["hydra:member"].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  : "No products available for this month."}
              </>
            )}
          </div>
          <p className="view-all">
            <button>View All</button>
          </p>
        </section>

        <section className="this-week-section">
          <h3 className="title">
            <span></span>This Month's
          </h3>
          <div className="cards">
            {data === null ? (
              <div style={{width:"100%" ,height:"100px", display:"flex" , justifyContent:"center"}}>
                <Loader2 />
              </div>
            ) : (
              <>
                {data["hydra:member"].length != 0
                  ? data["hydra:member"].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  : "No products available for this month."}
              </>
            )}
          </div>
          <p className="view-all">
            <button>View All</button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home