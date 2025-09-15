import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "../CSS/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn"); 
    navigate("/");
  };  

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Left: App Title */}
      <div className="navbar-left">
        <h2 className="navbar-title">Task Manager</h2>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Right: Links & Actions */}
      <div className={`navbar-right ${isMenuOpen ? "active" : ""}`}>
        
        <FaUserCircle 
          className="navbar-icon" 
          title="Profile" 
          onClick={() => navigate("/profile")} // Optional: Add profile navigation
        />
        <button 
          className="logout-btn" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
