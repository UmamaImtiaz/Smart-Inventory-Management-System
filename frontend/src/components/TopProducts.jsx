import React from "react";
import "../pages/Dashboard.css";

const TopProducts = ({ topProducts }) => {
  return (
    <div className="table-container">
      <h3>🏆 Top Products</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units Sold</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((product, idx) => (
            <tr key={idx}>
              <td>{product.name}</td>
              <td>{product.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProducts;
