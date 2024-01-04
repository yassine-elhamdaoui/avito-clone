import React, { useEffect, useState } from "react";
import "./productDetails.scss";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, getProductsByCategory } from "../../services/productService";
import ProductCard from "../../components/Product_card/ProductCard";
import Loader from "../../components/Loader/Loader";
import Loader2 from "../../components/Loader2/Loader2";
import { addProductToCart } from "../../services/cartService";
import Loader3 from "../../components/Loader3/Loader3";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [chosenImage, setChosenImage] = useState("");
  const [recommended , setRecommended] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(
          localStorage.getItem("token"),
          id
        );
        setProduct(fetchedProduct);

        // Set the first image as the chosenImage when the product is fetched
        if (
          fetchedProduct.productImages &&
          fetchedProduct.productImages.length > 0
        ) {
          setChosenImage(
            `http://localhost:8000/uploads/images/products/${fetchedProduct.productImages[0].imageName}`
          );

          const products = await getProductsByCategory(localStorage.getItem("token") , fetchedProduct.category.id)

          setRecommended(products["hydra:member"]);
          
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      finally{

      }
    };

    fetchProduct();
  }, [id]);

  const handleImageClick = (imageName) => {
    setChosenImage(
      `http://localhost:8000/uploads/images/products/${imageName}`
    );
  };
const handleEditClicked = (id, description, price, status, location, name , phoneNumber) => {
  navigate(
    `/edit-product/${id}?description=${description}&price=${price}&status=${status}&location=${location}&name=${name}&phone=${phoneNumber}`
  );
  window.scroll(top)
};

  const handleAddClicked = (productId , cartID , token) => {
    const addToCart = async() => {
        try {
          setLoading(true);
          const data = await addProductToCart(productId , cartID , token);
          console.log(data);
        } catch (error) {
          
        }
        finally{
        setLoading(false);

        }
    }
    addToCart();
  };



  return (
    <div className="product-details">
      <h3 className="title">
        <span></span>Details
      </h3>
      {product.length === 0 ? (
        <Loader />
      ) : (
        <>
          <section className="details">
            <div className="images-preview">
              <div className="choices">
                {product.productImages &&
                  product.productImages.map((image) => (
                    <div
                      className="image-container"
                      key={image.id}
                      onClick={() => handleImageClick(image.imageName)}
                    >
                      <img
                        src={`http://localhost:8000/uploads/images/products/${image.imageName}`}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  ))}
              </div>
              <div className="chosen-image">
                <img src={chosenImage} alt="" />
              </div>
            </div>
            <div className="product-infos">
              <div className="owner">
                <img
                  src={`http://localhost:8000/uploads/images/users/${product.owner.imageName}`}
                  alt=""
                />
              </div>
              <div className="top">
                <h2>{product.name}</h2>
                <h3>{product.price}MAD</h3>
              </div>
              <p
                style={
                  product.status === "available"
                    ? { color: "#6ada29" }
                    : { color: "red" }
                }
              >
                {product.status}
              </p>
              <p style={{ color: "gray" }}>
                Category : {product.category.name}
              </p>
              <h3>{product.description}</h3>
              <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <FaPhoneAlt /> {product.phoneNumber}
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <FaLocationDot /> {product.location}
              </p>
              <hr style={{ margin: "5px 0px" }} />
              {localStorage.getItem("userId") == product.owner.id ? (
                <p style={{ textAlign: "center" }}>
                  <button
                    onClick={() =>
                      handleEditClicked(
                        product.id,
                        product.description,
                        product.price,
                        product.status,
                        product.location,
                        product.name,
                        product.phoneNumber
                      )
                    }
                  >
                    Edit Product
                  </button>
                </p>
              ) : (
                <p style={{ textAlign: "center" }}>
                  <button
                    onClick={() =>
                      handleAddClicked(
                        product.id,
                        localStorage.getItem("cart").split("/")[3],
                        localStorage.getItem("token")
                      )
                    }
                  >
                    Add To Cart
                  </button>
                </p>
              )}
            </div>
          </section>
          <section className="recommendations">
            <h3 className="title">
              <span></span>Recommendations
            </h3>
            <div className="cards">
              {recommended.length === 0 ? (
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Loader2 />
                </p>
              ) : (
                recommended.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
            {loading && (
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  zIndex: "100",
                }}
              >
                <Loader3 />
              </div>
            )}{" "}
          </section>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
