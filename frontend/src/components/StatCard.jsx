import React from "react";
import "../pages/Dashboard.css";

const StatCard = ({ title, value }) => {
  const classMap = {
    "Total Products": "stat-products",
    "Total Orders": "stat-orders",
    "Total Stock": "stat-stock",
    "Total Revenue": "stat-revenue",
  };

  return (
    <div className={`stat-card ${classMap[title] || ""}`}>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default StatCard;
