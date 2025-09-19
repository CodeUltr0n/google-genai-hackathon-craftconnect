import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Check stock limit
        const newQuantity = existingItem.quantity + quantity;
        if (product.stock && newQuantity > product.stock) {
          toast.error(`Only ${product.stock} items available in stock`);
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      // Check stock for new item
      if (product.stock && quantity > product.stock) {
        toast.error(`Only ${product.stock} items available in stock`);
        return prevItems;
      }
      return [...prevItems, { ...product, quantity }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === productId) {
          // Check stock limit
          if (item.stock && newQuantity > item.stock) {
            toast.error(`Only ${item.stock} items available in stock`);
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const decreaseItem = (productId) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter((item) => item.quantity > 0);
      
      // Show message if item was removed
      const removedItem = prevItems.find(item => item.id === productId && item.quantity === 1);
      if (removedItem) {
        toast.info(`${removedItem.name} removed from cart`);
      }
      
      return updatedItems;
    });
  };

  const removeItem = (productId) => {
    const itemToRemove = items.find(item => item.id === productId);
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    if (itemToRemove) {
      toast.info(`${itemToRemove.name} removed from cart`);
    }
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };

  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + (price * item.quantity);
  }, 0);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
  const taxRate = 0.18; // 18% GST
  const taxAmount = Math.round(subtotal * taxRate);
  const totalAmount = subtotal + shippingCost + taxAmount;

  const cartSummary = {
    subtotal,
    shippingCost,
    taxAmount,
    totalAmount,
    totalItems,
    itemCount: items.length
  };

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addItem, 
        updateQuantity,
        decreaseItem, 
        removeItem, 
        clearCart,
        getItemQuantity,
        totalItems,
        ...cartSummary
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
