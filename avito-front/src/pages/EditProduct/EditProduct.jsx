import React, { useState } from 'react'
import './editProduct.scss'
import { useLocation, useParams } from 'react-router-dom'
import { editProduct } from '../../services/productService';
import { useEffect } from 'react';
import Loader3 from '../../components/Loader3/Loader3';

function EditProduct() {
      const locationn = useLocation();
      const { id } = useParams();
      const description = new URLSearchParams(locationn.search).get(
        "description"
      );
      const price = new URLSearchParams(locationn.search).get("price");
      const status = new URLSearchParams(locationn.search).get("status");
      const location = new URLSearchParams(locationn.search).get("location");
      const name = new URLSearchParams(locationn.search).get("name");
      const phoneNumber = new URLSearchParams(locationn.search).get("phone");

      const [productData, setProductData] = useState({
        name: name,
        price: price,
        description: description,
        location: location,
        phoneNumber: phoneNumber,
        status: status,
      });

      const [loading, setLoading] = useState(false);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
          ...productData,
          [name]: value,
        });
      };


      const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const modifyProduct =  async () => {
          const form = new FormData();
          form.append("name", productData.name);
          form.append("description", productData.description);
          form.append("location", productData.location);
          form.append("phoneNumber", productData.phoneNumber);
          form.append("status", productData.status);
          // Append each file individually
          form.append("price", parseFloat(productData.price));

          try {
            const data = await  editProduct(form, id,localStorage.getItem("token"));
            console.log(data);
          } catch (error) {
            console.error("some went wrong");
          }
          finally{
            setLoading(false);
          }
        };

        modifyProduct();
      };
  return (
    <div className="containerAdd">
      <div className="add-product">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Price (MAD) :
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Location:
            <input
              name="location"
              value={productData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="number"
              name="phoneNumber"
              value={productData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={productData.status}
              onChange={handleChange}
            >
              <option value="available">available</option>
              <option value="sold">sold</option>
            </select>
          </label>
          <button type="submit">Submit</button>
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
        </form>
      </div>
    </div>
  );
}

export default EditProduct