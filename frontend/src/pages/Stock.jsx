import React, { useState } from "react";
import { FaBoxes, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth"; // Ensure this is correctly imported
import StockForm from "./StockForm";
import "./Stock.css";

// Initial stock data
const initialStock = [
  { id: 1, name: "Laptop", category: "Electronics", quantity: 15, status: "In Stock" },
  { id: 2, name: "Pencil Box", category: "Stationary", quantity: 5, status: "Low Stock" },
  { id: 3, name: "Sneakers", category: "Shoes", quantity: 0, status: "Out of Stock" },
  { id: 4, name: "Office Chair", category: "Furniture", quantity: 8, status: "In Stock" },
  { id: 5, name: "Monitor", category: "Electronics", quantity: 2, status: "Low Stock" },
  { id: 6, name: "Notebook", category: "Stationary", quantity: 20, status: "In Stock" },
];

const Stock = () => {
  const [stockItems, setStockItems] = useState(initialStock);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    status: "In Stock",
  });

  // Use the useAuth hook to get the user info
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";  // Now the user should have a 'role' field
  
  console.log("Logged-in user:", user);
  console.log("Is user admin?:", isAdmin);

  // Filter items based on search and category
  const filteredItems = stockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    });
  };

  // Open form for adding new item
  const handleAddClick = () => {
    setCurrentItem(null);
    setFormData({
      name: "",
      category: "",
      quantity: "",
      status: "In Stock",
    });
    setIsFormOpen(true);
  };

  // Open form for editing existing item
  const handleEditClick = (item) => {
    setCurrentItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      status: item.status,
    });
    setIsFormOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name || !formData.category || formData.quantity === "") {
      alert("Please fill all required fields");
      return;
    }

    if (currentItem) {
      // Update existing item
      setStockItems((prev) =>
        prev.map((item) =>
          item.id === currentItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...stockItems.map((item) => item.id), 0) + 1,
        ...formData,
      };
      setStockItems((prev) => [...prev, newItem]);
    }

    setIsFormOpen(false);
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setStockItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Get status style based on stock status
  const getStatusStyle = (status) => {
    switch (status) {
      case "In Stock":
        return { color: "#16a34a" };
      case "Low Stock":
        return { color: "#f59e0b" };
      case "Out of Stock":
        return { color: "#dc2626" };
      default:
        return {};
    }
  };

  return (
    <div className="stock-container">
      <h2 className="stock-heading">
        <FaBoxes /> Inventory Stock
      </h2>

      {/* Filters */}
      <div className="stock-filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationary">Stationary</option>
          <option value="Shoes">Shoes</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      {/* Add Stock Button (only visible for admins) */}
      {isAdmin && (
        <button className="add-stock-btn" onClick={handleAddClick}>
          <FaPlusCircle /> Add Stock
        </button>
      )}

      {/* Stock Form Modal */}
      {isAdmin && isFormOpen && (
        <StockForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCancel={() => setIsFormOpen(false)}
          isEditing={!!currentItem}
        />
      )}

      {/* Stock Table */}
      <div className="overflow-x-auto">
        <table className="stock-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Category</th>
              <th>Quantity</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td style={getStatusStyle(item.status)}>{item.status}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                {isAdmin && (
                  <td className="actions-cell">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEditClick(item)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="no-items">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;
