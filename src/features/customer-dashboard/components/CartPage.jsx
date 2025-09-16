// src/pages/CartPage.jsx
import React from "react";
import CartDisplay from "../../../features/customer-dashboard/components/CartDisplay";

const CartPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartDisplay />
    </div>
  );
};

export default CartPage;