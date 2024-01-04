import { useState } from "react";
import "./addProduct.scss";
import { addProduct } from "../../services/productService";
import Loader3 from "../../components/Loader3/Loader3";

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    location: "",
    phoneNumber: "",
    category: "1",
  });

  const [loading, setLoading] = useState(false); 



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData({
      ...productData,
      imageFiles: files.slice(0, 10), // Limit to a maximum of 10 images
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); 

    const postProduct = async() => {
      const form = new FormData();
      form.append("name", productData.name);
      form.append("description", productData.description);
      form.append("location", productData.location);
      form.append("category", parseInt(productData.category));
      form.append("phoneNumber", productData.phoneNumber);
      // Append each file individually
      productData.imageFiles.forEach((file, index) => {
        form.append(`imageFiles[${index}]`, file);
      });
      form.append("price", parseFloat(productData.price));

      try {
        const data = await addProduct(form, localStorage.getItem("token"));
      } catch (error) {
        console.error("some went wrong");
      }
      finally{
        setLoading(false)
      }
    }

    postProduct()
    
  };

  return (
    <div className="containerAdd">
      <div className="add-product">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price (MAD) :
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              name="location"
              value={productData.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="number"
              name="phoneNumber"
              value={productData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Images (up to 10):
            <input
              id="images"
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            >
              <option value="1">Electronics</option>
              <option value="3">Apartments</option>
              <option value="4">Vehicles</option>
              <option value="2">For Home</option>
            </select>
          </label>
          <button type="submit">Submit</button>
          {loading && (
            <div
              style={{
                position: "absolute",
                top: "0",
                bottom:"0",
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

export default AddProduct;
