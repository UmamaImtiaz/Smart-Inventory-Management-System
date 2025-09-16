import React from "react";

const StockForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  handleCancel,
  isEditing,
}) => {
  return (
    <div className="stock-modal">
      <div className="stock-modal-content">
        <h3>{isEditing ? "Edit Item" : "Add New Item"}</h3>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Item name"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Stationary">Stationary</option>
            <option value="Shoes">Shoes</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            min="0"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>
            {isEditing ? "Update" : "Save"}
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockForm;