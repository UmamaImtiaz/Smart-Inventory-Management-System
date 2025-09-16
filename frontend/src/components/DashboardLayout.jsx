import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <div className="content-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
