import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../CSS/Auth.css";
import loginIllustration from "../assets/login-illustration0.png";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || (!isLogin && !formData.email)) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isLogin) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email.");
        return;
      }
    }

    try {
      if (isLogin) {
        const res = await axiosInstance.post("/user/login", {
          username: formData.username,
          password: formData.password,
        });

        if (res.data.message === "login success") {
          alert("Login successful!");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("isLoggedIn", "true");
          navigate("/home");
        } else {
          setError(res.data.message || "Login failed");
        }
      } else {
        const res = await axiosInstance.post("/user/register", formData);

        if (res.data.message === "user registered successfully") {
          alert("Registration successful! Please login.");
          setIsLogin(true);
          setFormData({ username: "", email: "", password: "" });
        } else {
          setError(res.data.message);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT SIDE IMAGE */}
      <div className="auth-left">
        <img src={loginIllustration} alt="Login Illustration" />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="auth-right">
        <div className="auth-box">
          <h1 className="auth-heading">Welcome Back!</h1>
          <p className="auth-subtext">
            Don’t have an account yet?{" "}
            <span onClick={() => setIsLogin(false)} className="link">
              Sign Up
            </span>
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="auth-input"
              required
            />

            {!isLogin && (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="auth-input"
                required
              />
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="auth-input"
              required
            />

            <div className="auth-options">
              <label>
                <input type="checkbox" /> Keep me logged in
              </label>
              <span className="link">Forgot Password?</span>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="auth-button">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
