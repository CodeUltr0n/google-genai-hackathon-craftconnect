import React from 'react';
import { Routes, Route } from 'react-router-dom';

// We are keeping the AuthProvider and ProtectedRoute imports ready for when you turn them back on.
import { AuthProvider } from './components/AuthenticateContext'; 
// import ProtectedRoute from './components/ProtectedRouteComponent'; 

import Header from './components/header';
import Hero from './components/hero/hero';
// import FeaturedCrafts from './components/featured-crafts';
import Traditions from './bottom/Traditions'; 
import Footer from './components/footer';
import ShopsPage from './components/shops';
import AuthPage from './components/Auth'; 
import CategoriesPage from './features/components/CategoriesPage'; 

import SellerDashboard from './features/seller-dashboard';
import CustomerDashboard from './features/customer-dashboard';

// --- Placeholder components for other pages ---
const About = () => <div className="container mx-auto p-8">About Page</div>;
// // const CustomerDashboard = () => <div className="container mx-auto p-8">Welcome, Customer!</div>;
// const SellerDashboard = () => <div className="container mx-auto p-8">Welcome, Seller!</div>;



const HomePage = () => (
  <>
    <Hero />
    {/* <FeaturedCrafts />  */}
    {/* <Traditions />  */}
  </>
);

function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/customer-dashboard/*" element={<CustomerDashboard/> } />
          <Route path='/seller-dashboard/*' element = {<SellerDashboard/>} /> 
          {/* <Route path="/signin" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} /> */}


          <Route path="/signin/customer" element={<AuthPage userType="customer" />} />
          <Route path="/signin/seller" element={<AuthPage userType="seller" />} />

          
          {/* --- Protected Routes (Temporarily Disabled) --- */}
          {/* To re-enable, just uncomment the <ProtectedRoute> wrapper. */}
          <Route 
            path="/customer" 
            element={
              // <ProtectedRoute>
                <CustomerDashboard />
              // </ProtectedRoute>
            } 
          />
          <Route 
            path="/seller" 
            element={
              // <ProtectedRoute>
                <SellerDashboard />
              // </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      
      <Footer />
    </AuthProvider>
  );
}

export default App;


