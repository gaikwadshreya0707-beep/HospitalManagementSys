import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary Login
    if (email !== "" && password !== "") {
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Please enter Email and Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>🏥 Hospital Management System</h1>

        <h2>Login to Continue</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        <p>
          Don't have an account?
          <Link to="/register"> Register Here</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;