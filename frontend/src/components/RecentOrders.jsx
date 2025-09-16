import React from "react";
import "../pages/Dashboard.css";

const RecentOrders = ({ recentOrders }) => {
  return (
    <div className="table-container">
      <h3>📦 Recent Orders</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
