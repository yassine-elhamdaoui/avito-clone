import React, { useState } from "react";
import "./signUp.scss";
import { login, registerUser } from "../../services/userService";
import { useNavigate ,Link } from "react-router-dom";
import Loader3 from "../../components/Loader3/Loader3";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState({
    code: null,
    message: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    const form = new FormData();

    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("imageFile", formData.image);
    console.log(form);

    try {
      const response = await registerUser(form);
      
      if (response) {
        console.log("User registered successfully:");
        const res = await login(formData.email, formData.password);
        if (res.token) {
          localStorage.setItem("token", res.token);
          setError(null);
          navigate("/");
        } else {
          setError(res);
        }
      } else {
        console.error("Registration failed:");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container-log">
      <div className="sign-up">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="enter password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="btn_lab">
            <button type="submit">Sign Up</button>
            <label>
              Have an account? <Link to="/login">Login here</Link>
            </label>
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
        </form>
      </div>
    </div>
  );
};

export default SignUp;
