// src/services/api.jsx
import axiosInstance from "./axiosInstance";  // Make sure axiosInstance is configured with base URL and headers

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    return response.data;  // Returning the response data, which can be the token or user info
  } catch (error) {
    throw error;  // Propagate the error if something goes wrong
  }
};

// Register API
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;  // Returning the response data after successful registration
  } catch (error) {
    throw error;  // Propagate the error
  }
};

// Fetch Products API
export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/items");
    return response.data;  // Returning the list of products
  } catch (error) {
    throw error;  // Propagate the error
  }
};

// Add Product API
export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post("/items", productData);
    return response.data;  // Returning the added product data
  } catch (error) {
    throw error;  // Propagate the error
  }
};

// Update Product API
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/items/${productId}`, updatedData);
    return response.data;  // Returning the updated product data
  } catch (error) {
    throw error;  // Propagate the error
  }
};

// Delete Product API
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/items/${productId}`);
    return response.data;  // Returning a success message or status
  } catch (error) {
    throw error;  // Propagate the error
  }
};
