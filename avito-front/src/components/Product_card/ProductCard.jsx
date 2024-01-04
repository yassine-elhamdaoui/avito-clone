import React from 'react'
import './productCard.scss'
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function ProductCard({product}) {
  const navigate = useNavigate();
  console.log(product);
  const handleViewClicked = () => {
    navigate(`/products/${product.id}`);
    window.scroll(top)
  }
  return (
    <div className="product-card">
      <div className="product-image">
        <div className="like">
          <FaRegHeart />
        </div>
        <div className="view" onClick={handleViewClicked}>
          <IoEyeOutline />
        </div>
        <img
          src={`http://localhost:8000/uploads/images/products/${product.productImages[0].imageName}`}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="product-infos">
        <div className="top">
          <h2 className="name">{product.name}</h2>
          <p
            style={
              product.status === "available"
                ? { color: "#6ada29" }
                : { color: "red" }
            }
          >
            {product.status}
          </p>

        </div>
        <p style={{color:"gray" , fontSize:"14px"}}>
          {product.description.slice(0, 30)}
          {product.description.length > 30 && "..."}
        </p>

        <p className="price">{`${product.price} MAD`}</p>
      </div>
    </div>
  );
}

export default ProductCard