import React, { useState } from 'react';
import { Minus, Plus, Trash2, Heart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove();
      return;
    }
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    // Add a small delay for smooth animation
    setTimeout(() => {
      removeItem(item.id);
    }, 200);
  };

  const itemTotal = (item.price || 0) * item.quantity;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-md ${
      isRemoving ? 'opacity-50 scale-95' : ''
    }`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <img
              src={item.imageUrl || '/images/placeholder.jpg'}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-100"
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Link 
                to={`/shop/${item.id}`}
                className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-70 transition-all"
              >
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            {/* Product Info */}
            <div className="flex-1 min-w-0 mb-3 sm:mb-0">
              <Link 
                to={`/shop/${item.id}`}
                className="block group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                  {item.name}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-600 mb-1">
                by <span className="font-medium">{item.artisan}</span>
              </p>
              
              <div className="flex flex-wrap gap-2 text-xs">
                {item.category && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {item.category}
                  </span>
                )}
                {item.regionTag && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {item.regionTag}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              {item.stock !== undefined && (
                <div className="mt-2">
                  {item.stock > 0 ? (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.stock < 5 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {item.stock < 5 ? `Only ${item.stock} left` : 'In Stock'}
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col sm:items-end gap-3">
              {/* Price */}
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ₹{itemTotal.toLocaleString('en-IN')}
                </div>
                {item.quantity > 1 && (
                  <div className="text-sm text-gray-500">
                    ₹{item.price?.toLocaleString('en-IN')} each
                  </div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                  <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    max={item.stock || 999}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value) || 1;
                      handleQuantityChange(newQuantity);
                    }}
                    className="w-16 text-center py-2 bg-transparent border-none focus:outline-none text-sm font-medium"
                  />
                  
                  <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.stock && item.quantity >= item.stock}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      // Add to wishlist functionality would go here
                      console.log('Add to wishlist:', item.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    aria-label="Add to wishlist"
                    title="Save for later"
                  >
                    <Heart size={16} />
                  </button>
                  
                  <button
                    onClick={handleRemove}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    aria-label="Remove item"
                    title="Remove from cart"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-specific layout adjustments */}
      <div className="sm:hidden mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            Total: ₹{itemTotal.toLocaleString('en-IN')}
          </div>
          <button
            onClick={handleRemove}
            className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-sm"
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;