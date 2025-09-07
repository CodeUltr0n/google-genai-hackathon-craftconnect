import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthenticateContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // If the user is not logged in, redirect them to the sign-in page.
    return <Navigate to="/signin" />;
  }

  // If the user is logged in, render the component they were trying to access.
  return children;
};

export default ProtectedRoute;