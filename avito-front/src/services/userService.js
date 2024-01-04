const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response && response.ok) {
      const data = await response.json();
      const users = await getUsers(data.token);
      users.map((user) => {
        if (user.email === email) {
          localStorage.setItem("email", user.email);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("imageName", user.imageName);
          localStorage.setItem("cart", user.cart);
          localStorage.setItem("name", user.name);
        }
      });
      return data;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const registerUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    throw error;
  }
};

const editUser = async (formData, id, token) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/${id}/edit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("update failed");
    }
  } catch (error) {
    throw error;
  }
};

const getUsers = async (token) => {
  try {
    const users = await fetch("http://localhost:8000/api/users", {
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
    return users;
  } catch (error) {
    throw error;
  }
};


export { login, registerUser, editUser, getUsers };

