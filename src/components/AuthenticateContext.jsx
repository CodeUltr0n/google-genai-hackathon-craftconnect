import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // We are temporarily setting a fake token to simulate a logged-in user.
  // This makes `isLoggedIn` true by default.
  const [token, setToken] = useState('temp-developer-token'); // Previously: useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState({ token: 'temp-developer-token', role: localStorage.getItem('role') || 'customer' });
  
  const navigate = useNavigate();

  const login = (newToken) => {
    setToken(newToken);
    setUser({ token: newToken, role: 'customer' });
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', 'customer');
    navigate('/seller');
  };

  const logout = () => {
    // For development, we'll make logout reload the page to clear the state.
    setToken(null);
    setUser({ token: null, role: null });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const isLoggedIn = !!token;

  const switchRole = (newRole) => {
    if (!user.token) return; // Only switch if logged in
    setUser({ ...user, role: newRole });
    localStorage.setItem('role', newRole);
    navigate(newRole === 'seller' ? '/seller-dashboard' : '/customer-dashboard');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};