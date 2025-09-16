import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerUser } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.name || !userData.email || !userData.password) {
      toast.error("All fields are required!", { position: "top-right" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:6087/api/users/register", userData);
      toast.success("Registration successful! Redirecting to login...", { position: "top-right" });

      // Save the registered user in localStorage
      const newUser = {
        email: userData.email,
        password: userData.password,
      };

      // Retrieve existing users from localStorage or set to empty array if none exist
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Add the new user to the list of users
      existingUsers.push(newUser);

      // Save the updated users list back to localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Redirect to login page after a delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Registration failed";
      toast.error(errMsg, { position: "top-right" });
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="register-box">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">Sign up and take control of your inventory effortlessly.</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" name="name" placeholder="Full Name" value={userData.name} onChange={handleChange} />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" name="email" placeholder="Email Address" value={userData.email} onChange={handleChange} />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
            {showPassword ? (
              <AiFillEyeInvisible className="eye-icon" onClick={() => setShowPassword(false)} />
            ) : (
              <AiFillEye className="eye-icon" onClick={() => setShowPassword(true)} />
            )}
          </div>

          <button type="submit" className="register-button">Sign Up</button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login" className="register-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
