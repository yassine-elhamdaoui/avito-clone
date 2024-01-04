
const getProducts = async (token) => {
  try {
    const products = await fetch("http://localhost:8000/api/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return products;
  } catch (error) {
    throw error;
  }
};
const getProductsByCategory = async (token , categoryID) => {
  try {
    const products = await fetch(
      `http://localhost:8000/api/products?category=${categoryID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      console.log("by category : " , products);
    return products;
  } catch (error) {
    throw error;
  }
};
const getProductsByOwner = async (token , ownerID) => {
  try {
    const products = await fetch(
      `http://localhost:8000/api/products?owner=${ownerID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      console.log("by owner  : " , products);
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (token , id) => {
  try {
    const product = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return product;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (formData , token) => {
  try {
    const response  = await fetch("http://localhost:8000/api/products" , {
      headers : {
        Authorization : `Bearer ${token}`
      },
      method : "post",
      body : formData
    }
    );
    console.log(await response.json());
  } catch (error) {
    console.error(error.message)
  }
}


const editProduct = async (formData, id, token) => {
  try {
    const response = await fetch(`http://localhost:8000/api/products/${id}/edit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      
      return await response.json();
    } else {
      throw new Error("update failed");
    }
  } catch (error) {
    throw error;
  }
};

const addLike = async (id, token , isLiked , isDisliked) => {
  try {
    const response = await fetch(`http://localhost:8000/api/products/${id}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body : JSON.stringify({
        isLiked : isLiked,
        isDisliked : isDisliked,
      })
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("liking failed");
    }
  } catch (error) {
    throw error;
  }
};

export {getProductsByOwner, addProduct,getProductById, getProductsByCategory, getProducts, addLike, editProduct };
