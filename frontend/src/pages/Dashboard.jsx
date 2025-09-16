import React from "react";
import StatCard from "../components/StatCard";
import RecentOrders from "../components/RecentOrders";
import TopProducts from "../components/TopProducts";
import "./Dashboard.css";

const Dashboard = () => {
  // Static mock data (instead of API)
  const dashboardData = {
    totalProducts: 120,
    totalOrders: 87,
    totalStock: 450,
    totalRevenue: 18750,
    recentOrders: [
      { id: "ORD001", customer: "Alice", total: "$150", status: "Completed" },
      { id: "ORD002", customer: "Bob", total: "$90", status: "Pending" },
      { id: "ORD003", customer: "John", total: "$200", status: "Completed" },
    ],
    topProducts: [
      { name: "Smart Watch", sold: 45 },
      { name: "Wireless Headphones", sold: 32 },
      { name: "Bluetooth Speaker", sold: 28 },
    ],
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">📊 Dashboard Overview</h1>

      <div className="stats-container">
        <StatCard title="Total Products" value={dashboardData.totalProducts} />
        <StatCard title="Total Orders" value={dashboardData.totalOrders} />
        <StatCard title="Total Stock" value={dashboardData.totalStock} />
        <StatCard title="Total Revenue" value={`$${dashboardData.totalRevenue}`} />
      </div>

      <div className="dashboard-bottom">
        <RecentOrders recentOrders={dashboardData.recentOrders} />
        <TopProducts topProducts={dashboardData.topProducts} />
      </div>
    </div>
  );
};

export default Dashboard;
