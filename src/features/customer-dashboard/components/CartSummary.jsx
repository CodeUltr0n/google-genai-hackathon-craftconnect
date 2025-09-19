import React from 'react';
import { ShoppingCart, Tag, Truck, Receipt, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';

const CartSummary = () => {
  const navigate = useNavigate();
  const { 
    subtotal, 
    shippingCost, 
    taxAmount, 
    totalAmount, 
    totalItems,
    itemCount,
    items 
  } = useCart();

  const handleCheckout = () => {
    // Convert cart items to checkout format
    const checkoutData = {
      items,
      orderSummary: {
        subtotal,
        shipping: shippingCost,
        tax: taxAmount,
        total: totalAmount,
        discount: 0
      }
    };
    
    navigate('/checkout', { state: checkoutData });
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
      </div>

      {/* Items Count */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Items in cart</span>
        </div>
        <span className="font-semibold text-gray-900">{totalItems}</span>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({itemCount} item{itemCount > 1 ? 's' : ''})</span>
          <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Shipping</span>
            {shippingCost === 0 && (
              <span className="text-xs text-green-600 font-medium ml-1">(FREE)</span>
            )}
          </div>
          <span className="font-medium text-gray-900">
            {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toLocaleString('en-IN')}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Tax (GST 18%)</span>
          </div>
          <span className="font-medium text-gray-900">₹{taxAmount.toLocaleString('en-IN')}</span>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 500 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">
                Add ₹{(500 - subtotal).toLocaleString('en-IN')} more for FREE shipping
              </span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-amber-700 mt-1">
              {Math.round((subtotal / 500) * 100)}% towards free shipping
            </p>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-600">
              ₹{totalAmount.toLocaleString('en-IN')}
            </span>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Security Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>Secure Checkout</span>
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-green-800">What you get:</p>
            <ul className="text-xs text-green-700 mt-1 space-y-1">
              <li>✓ Authentic handcrafted products</li>
              <li>✓ Direct support to artisans</li>
              <li>✓ Secure payment & fast delivery</li>
              <li>✓ Easy returns & exchanges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;