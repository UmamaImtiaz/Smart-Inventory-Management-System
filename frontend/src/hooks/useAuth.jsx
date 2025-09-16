import { useState, useEffect } from 'react';

const useAuth = () => {
  // State to store the user information
  const [user, setUser] = useState(null);

  // Effect to get user data from localStorage or simulate API call
  useEffect(() => {
    // Try to get the user data from localStorage
    let storedUser = JSON.parse(localStorage.getItem('user'));

    // If no user is found in localStorage, mock the user data with role
    if (!storedUser) {
      storedUser = {
        name: 'Umama',               // Example name
        email: 'umamaimtiaz68@gmail.com',
        password: 'Pakistan123',
        role: 'admin',               // Ensure role is set
      };
      localStorage.setItem('user', JSON.stringify(storedUser)); // Save it to localStorage
    }

    // Set the user state
    setUser(storedUser);
  }, []); // Run only once on mount

  // Optionally, you can add login and logout methods if needed
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return { user, login, logout };
};

export default useAuth;
