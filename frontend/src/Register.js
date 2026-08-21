import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Admin"
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      user.name === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registration Successful");

    navigate("/login");
  };

  return (
    <div className="register-container">

      <div className="register-box">

        <h1>🏥 Hospital Management System</h1>

        <h2>Create New Account</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <select
            name="role"
            onChange={handleChange}
          >
            <option>Admin</option>
            <option>Receptionist</option>
            <option>Doctor</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login Here</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;