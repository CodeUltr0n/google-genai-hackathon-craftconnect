import React from 'react';
import { Routes, Route } from 'react-router-dom';

// We are keeping the AuthProvider and ProtectedRoute imports ready for when you turn them back on.
import { AuthProvider } from './components/AuthenticateContext'; 
// import ProtectedRoute from './components/ProtectedRouteComponent'; 

import { CartProvider } from "./features/customer-dashboard/components/CartProvider";
import { ToastContainer } from "react-toastify";
import CartPage from './features/customer-dashboard/components/CartPage';

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
import AddProductForm from './features/seller-dashboard/components/AddNewProduct';
import ProductDetailPage from './components/ProductDetails';
import CategoryDetails from './features/components/CategoriesDetails';
import About from './components/AboutPage';
import EditCraft from './features/seller-dashboard/components/EditCraft';
import CheckoutPage from './components/checkout/CheckoutPage';
import OrderConfirmation from './components/orders/OrderConfirmation';

// --- Placeholder components for other pages ---
// const About = () => <div className="container mx-auto p-8">About Page</div>;
// // const CustomerDashboard = () => <div className="container mx-auto p-8">Welcome, Customer!</div>;
// const SellerDashboard = () => <div className="container mx-auto p-8">Welcome, Seller!</div>;

// import { useAuth } from './components/AuthenticateContext';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user?.token) return <Navigate to="/signin/customer" />;
//   if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
//   return children;
// };

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
      <CartProvider>
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
                //  </ProtectedRoute>
              } 
            />
            <Route 
              path="/seller" 
              element={
                // <ProtectedRoute>
                  <SellerDashboard />
                //  </ProtectedRoute>
              } 
            />


             {/* 2. ADD THIS NEW PROTECTED ROUTE FOR THE FORM */}
            <Route
              path="/seller-form"
              element={
                // <ProtectedRoute>
                  <AddProductForm />
                /* </ProtectedRoute> */
              }
            />

            <Route path="/edit-craft/:craftId" element={<EditCraft />} />

            {/* This route will match any URL like /product/prod_123, /product/abc, etc. */}
            <Route path="/shop/:productId" element={<ProductDetailPage />} />

             <Route path="/category/:categoryName" element={<CategoryDetails />} />
             <Route path="/cart" element={<CartPage />} />
             <Route path="/checkout" element={<CheckoutPage />} />
             <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={2000} />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
