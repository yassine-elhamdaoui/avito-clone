import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { login } from "../../services/userService";
import Loader3 from "../../components/Loader3/Loader3";

function Login() {
  const [error, setError] = useState({
    code: null,
    message: "",
  });
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); 


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 

    const res = await login(input.email, input.password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      setError(null);
      navigate("/");
    } else {
      setError(res);
    }
    setLoading(false); 
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <div className="container-log">
        <div className="login">
          <h2>Login Page</h2>
          {error ? <div className="error">{error.message}</div> : <></>}
          <form>
            <input
              type="email"
              required
              placeholder="enter email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            <input
              type="password"
              required
              placeholder="enter password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <div className="btn_lab">
              <button onClick={handleSubmit}>Log In</button>
              <label>Forgot Password ?</label>
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
    </div>
  );
}

export default Login;
