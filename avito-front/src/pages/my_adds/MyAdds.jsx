import React, { useEffect, useState } from 'react'
import './myAdds.scss'
import ProductCard from '../../components/Product_card/ProductCard';
import Loader from '../../components/Loader/Loader';
import { getProductsByOwner } from '../../services/productService';

function MyAdds() {
  const [filteredProducts, setFilteredProducts] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFilteredProducts(null); // Show loader
        const fetchedProducts = await getProductsByOwner(
          localStorage.getItem("token"),
          localStorage.getItem("userId")
        );
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
        setFilteredProducts([]); // Set to empty array if there's an error
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="my-adds">
      {filteredProducts === null ? (
        <Loader />
      ) : (
        <>
          {filteredProducts && (
            <>
              <h3 className="title">
                <span></span>My Adds
              </h3>
              <div className="cards">
                {filteredProducts["hydra:member"].length !== 0 ? (
                  filteredProducts["hydra:member"].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <img
                    style={{ margin: "auto" }}
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

export default MyAdds