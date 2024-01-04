

import React, { useEffect, useState } from 'react';
import './myCart.scss';
import { Link, useNavigate } from "react-router-dom";
import { getCartProducts, removeProductFromCart } from '../../services/cartService';
import Loader from '../../components/Loader/Loader';
import Loader3 from '../../components/Loader3/Loader3';

const Cart = () => {
  const [loading, setLoading] = useState(false); 

  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartProducts = async() => {
      try {
        const data = await getCartProducts(localStorage.getItem("cart").split("/")[3] , localStorage.getItem("token"));
        setCartItems(data)
      
        
      } catch (error) {
        
      }
    }

    fetchCartProducts();
   } , [])
  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await removeProductFromCart(
        itemId,
        localStorage.getItem("cart").split("/")[3],
        localStorage.getItem("token")
      );
      console.log(response);
      let updatedCartItems = {
        products: cartItems.products.filter((el) => el.id != itemId),
      };
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error(error.message)
    }
    finally{
      setLoading(false);

    }
  };
  const handleProductClicked = (id) => {
    navigate(`/products/${id}`)
  }
  useEffect(() => {
    if (cartItems && cartItems.products) {
      const newTotal = cartItems.products.reduce(
        (acc, item) => acc + calculateSubtotal(item),
        0
      );
      setTotal(newTotal);
    }
  }, [cartItems]);
  const calculateSubtotal = (item) => {
    return item.price
  };

  

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems === null ? (
        <Loader />
      ) : (
        <>
          {cartItems.products && cartItems.products.length != 0 ? (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Removed</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.products.map((item) => (
                  <tr className="cartdetail" key={item.id}>
                    <td>
                      <img
                        onClick={() => handleProductClicked(item.id)}
                        style={{ height: "60px", cursor: "pointer" }}
                        src={`http://localhost:8000/uploads/images/products/${item.productImages[0].imageName}`}
                        alt={item.name}
                      />
                      <div>
                        <h5>{item.name}</h5>
                      </div>
                    </td>
                    <td>{item.price} MAD</td>
                    <td>{item.category.name}</td>
                    <td>
                      <button onClick={() => removeFromCart(item.id)}>
                        remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total:</td>
                  <td>{total}MAD</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <img
              src="/src/assets/no_products_for_category2-removebg-preview.png"
              alt=""
            />
          )}
        </>
      )}
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
    </div>
  );
};
export default Cart;
