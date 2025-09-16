import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // adjust if your hook path is different

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // Not an admin
    return <Navigate to="/unauthorized" />;
  }

  return children; // Render the protected admin component
};

export default AdminRoute;
