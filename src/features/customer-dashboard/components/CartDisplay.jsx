import React from 'react';
import { useCart } from './useCart'; 
const CartDisplay = () => {
  // Align with CartProvider's context shape and add safe defaults
  const { items = [], addItem, decreaseItem, removeItem } = useCart() || {};
  const cartItems = items;

  const mockItems = [
    { id: 'mock1', name: 'Mock Item 1', quantity: 2 },
    { id: 'mock2', name: 'Mock Item 2', quantity: 1 },
  ];

  const displayItems = [...cartItems, ...mockItems];

  const totalItems = displayItems.reduce((sum, item) => sum + item.quantity, 0);

  if (displayItems.length === 0) {
    return (
      <div className="p-6 bg-white rounded shadow text-center">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      <ul>
        {displayItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div>
              <span className="font-semibold">{item.name}</span>
              <span className="ml-2 text-gray-500">x{item.quantity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => decreaseItem?.(item.id)}
                aria-label="Decrease"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => addItem?.(item)}
                aria-label="Increase"
              >
                +
              </button>
              <button
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeItem?.(item.id)}
                aria-label="Remove"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right font-semibold">
        Total items: <span className="text-blue-600">{totalItems}</span>
      </div>
    </div>
  );
};

export default CartDisplay;
