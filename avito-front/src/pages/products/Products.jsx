import React, { useEffect, useState } from "react";
import "./products.scss";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../../services/productService";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/Product_card/ProductCard";

function Product() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const name = queryParams.get("name");

  console.log(name);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFilteredProducts(null); // Show loader
        const fetchedProducts = await getProductsByCategory(
          localStorage.getItem("token"),
          category
        );
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
        setFilteredProducts([]); // Set to empty array if there's an error
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="products">
      {filteredProducts === null ? (
        <Loader />
      ) : (
        <>
          {filteredProducts && (
            <>
              <h3 className="title">
                <span></span>{`${name}`}
              </h3>
              <div className="cards">
                {filteredProducts["hydra:member"].length !== 0 ? (
                  filteredProducts["hydra:member"].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <img
                    style={{margin :"auto"}}
                    src="/src/assets/no_products_for_category2-removebg-preview.png"
                    alt=""
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Product;
