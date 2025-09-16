// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBoxes, FaClipboardList, FaChartLine } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>PINVENT</h2>
      <ul>
        <li>
          <Link to="/dashboard"><FaHome /> Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/products"><FaBoxes /> Products</Link>
        </li>
        <li>
          <Link to="/dashboard/stock"><FaClipboardList /> Stocks</Link>
        </li>
        <li>
          <Link to="/dashboard/orders"><FaClipboardList /> Orders</Link>
        </li>
        <li>
          <Link to="/dashboard/reports"><FaChartLine /> Reports</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
