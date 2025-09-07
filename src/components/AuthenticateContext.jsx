import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // --- THIS IS THE CHANGE FOR DEVELOPMENT ---
  // We are temporarily setting a fake token to simulate a logged-in user.
  // This makes `isLoggedIn` true by default.
  const [token, setToken] = useState('temp-developer-token'); // Previously: useState(localStorage.getItem('token') || null)
  
  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    navigate('/seller');
  };

  const logout = () => {
    // For development, we'll make logout reload the page to clear the state.
    // Or, more robustly:
    setToken(null);
    localStorage.removeItem('token');
    // When you're ready, remove the hardcoded token above and use this line:
    // navigate('/signin');
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};