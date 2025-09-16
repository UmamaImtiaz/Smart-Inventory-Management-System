// AuthPathContext.js or AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser"); // ✅ Match with "authUser"
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData)); // ✅ Save with "authUser"
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser"); // ✅ Remove "authUser"
    localStorage.removeItem("token");     // ✅ Optional: Also remove token if you want
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
