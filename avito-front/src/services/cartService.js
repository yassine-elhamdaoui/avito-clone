const addProductToCart = async (productId , id, token) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/carts/${id}/add_product`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          productId: productId,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      console.log(data);
      return data;
    } else {
      throw new Error("error adding the product to cart");
    }
  } catch (error) {
    throw error;
  }
};

const removeProductFromCart = async (productId , id, token) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/carts/${id}/remove_product`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          productId: productId,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("error posting the product failed");
    }
  } catch (error) {
    throw error;
  }
};
const getCartProducts = async (id, token) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/carts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "get",
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("error getting cart products");
    }
  } catch (error) {
    throw error;
  }
};

export { addProductToCart, getCartProducts, removeProductFromCart };
