import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthPathContext"; // Custom Auth Context
import "./login.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:6087/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setError("Invalid email or password! Please try again.");
        return;
      }

      const data = await response.json();

      // Store user info and real token in localStorage
      localStorage.setItem("authUser", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      // Update auth context with logged in user
      login(data);

      // Navigate to dashboard after successful login
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome</h2>
        <p className="login-subtitle">Sign in to continue managing your inventory.</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/register" className="login-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
