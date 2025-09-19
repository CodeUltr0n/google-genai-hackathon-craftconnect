import React from 'react';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from './useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

const CartPage = () => {
  const { items, itemCount, totalItems, clearCart } = useCart();

  if (itemCount === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Link
              to="/shop"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <ShoppingCart className="w-4 h-4 inline mr-1" />
              {totalItems} item{totalItems > 1 ? 's' : ''} in cart
            </div>
            
            {itemCount > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            
            {/* Cart Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-sm text-gray-600">
                  Need help? <Link to="/support" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</Link>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // Add save for later functionality
                      console.log('Save cart for later');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Save for Later
                  </button>
                  
                  <Link
                    to="/shop"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    Add More Items
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>

        {/* Recently Viewed or Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-center py-8">
              Recommendations will appear here based on your cart items and browsing history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
