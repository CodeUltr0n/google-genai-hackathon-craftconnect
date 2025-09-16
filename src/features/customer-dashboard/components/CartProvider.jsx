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

  const addItem = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const decreaseItem = (productId) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, decreaseItem, removeItem, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
