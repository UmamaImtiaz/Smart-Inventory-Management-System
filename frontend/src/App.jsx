// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthPathContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import DashboardLayout from "./components/DashboardLayout";
import PaymentMethod from "./components/PaymentMethod"; // ✅ Import here
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-payment" element={<PaymentMethod />} /> {/* ✅ Added here */}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/stock" element={<Stock />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/reports" element={<Reports />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
