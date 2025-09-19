import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, CreditCard, Download, Share2, ArrowLeft } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderInfo = location.state;
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    if (!orderInfo) {
      navigate('/');
      return;
    }

    // Calculate estimated delivery date
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (orderInfo.paymentMethod === 'cod' ? 5 : 3));
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, [orderInfo, navigate]);

  if (!orderInfo) {
    return null;
  }

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF invoice
    alert('Invoice download feature will be implemented');
  };

  const handleShareOrder = () => {
    // In a real app, this would share order details
    if (navigator.share) {
      navigator.share({
        title: 'My Order from Bharatiya Bazaar',
        text: `I just ordered ${orderInfo.orderData.name} from Bharatiya Bazaar!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-4">
              Thank you for your order. We've received your order and will process it shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-xl font-bold text-gray-900">{orderInfo.orderId}</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </button>
            <button
              onClick={handleShareOrder}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Order
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
            </div>

            {/* Product Info */}
            <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
              {orderInfo.orderData.imageUrl && (
                <img
                  src={orderInfo.orderData.imageUrl}
                  alt={orderInfo.orderData.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{orderInfo.orderData.name}</h3>
                <p className="text-sm text-gray-500 mb-1">by {orderInfo.orderData.artisan}</p>
                <p className="text-sm text-gray-500">Category: {orderInfo.orderData.category}</p>
                <p className="font-medium text-gray-900 mt-1">
                  ₹{orderInfo.orderData.price?.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">₹{orderInfo.orderData.orderSummary.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">₹{orderInfo.orderData.orderSummary.shipping.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (GST 18%)</span>
                <span className="text-gray-900">₹{orderInfo.orderData.orderSummary.tax.toLocaleString('en-IN')}</span>
              </div>
              {orderInfo.orderData.orderSummary.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{orderInfo.orderData.orderSummary.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-blue-600">₹{orderInfo.orderData.orderSummary.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center mb-2">
                <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Payment Method</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                {orderInfo.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                 orderInfo.paymentMethod === 'card' ? 'Credit/Debit Card' :
                 orderInfo.paymentMethod === 'upi' ? 'UPI Payment' :
                 orderInfo.paymentMethod === 'netbanking' ? 'Net Banking' :
                 orderInfo.paymentMethod === 'wallet' ? 'Digital Wallet' : 'Online Payment'}
              </p>
              {orderInfo.paymentId && (
                <p className="text-xs text-gray-500 ml-6 mt-1">
                  Payment ID: {orderInfo.paymentId}
                </p>
              )}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-900">{orderInfo.orderData.shippingAddress.fullName}</p>
                <p>{orderInfo.orderData.shippingAddress.addressLine1}</p>
                {orderInfo.orderData.shippingAddress.addressLine2 && (
                  <p>{orderInfo.orderData.shippingAddress.addressLine2}</p>
                )}
                <p>{orderInfo.orderData.shippingAddress.city}, {orderInfo.orderData.shippingAddress.state}</p>
                <p>{orderInfo.orderData.shippingAddress.pincode}</p>
                {orderInfo.orderData.shippingAddress.landmark && (
                  <p className="text-gray-500">Landmark: {orderInfo.orderData.shippingAddress.landmark}</p>
                )}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="font-medium">Contact</p>
                  <p>{orderInfo.orderData.shippingAddress.phone}</p>
                  <p>{orderInfo.orderData.shippingAddress.email}</p>
                </div>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <Truck className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Delivery Information</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">Estimated Delivery</p>
                    <p className="text-sm text-blue-700">{estimatedDelivery}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-600" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">Order Confirmed</span>
                      <p className="text-gray-500 text-xs">Just now</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <span className="text-gray-600">Order Processing</span>
                      <p className="text-gray-500 text-xs">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <span className="text-gray-600">Shipped</span>
                      <p className="text-gray-500 text-xs">1-2 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <span className="text-gray-600">Out for Delivery</span>
                      <p className="text-gray-500 text-xs">{orderInfo.paymentMethod === 'cod' ? '4-5 business days' : '2-3 business days'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <span className="text-gray-600">Delivered</span>
                      <p className="text-gray-500 text-xs">{estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                {orderInfo.paymentMethod === 'cod' && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800 font-medium">Cash on Delivery</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Please keep ₹{orderInfo.orderData.orderSummary.total.toLocaleString('en-IN')} ready for payment upon delivery.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center flex items-center justify-center"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-center flex items-center justify-center"
            >
              View All Orders
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              Print Order
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-800 mb-3">
            If you have any questions about your order, our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
            <a href="tel:+911234567890" className="text-blue-600 hover:text-blue-700 font-medium">
              📞 Call: +91 12345 67890
            </a>
            <a href="mailto:support@bharatiyabazaar.com" className="text-blue-600 hover:text-blue-700 font-medium">
              📧 Email: support@bharatiyabazaar.com
            </a>
            <Link to="/support" className="text-blue-600 hover:text-blue-700 font-medium">
              💬 Live Chat Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;