import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import "../CSS/Home.css";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="main-layout">
        {/* Sidebar with boards(this dashboard is used as sidebar) */}
        <Dashboard />

        {/* Board details */}
        <div className="details-panel">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
