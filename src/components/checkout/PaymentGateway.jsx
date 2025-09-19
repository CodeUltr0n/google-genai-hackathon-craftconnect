import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

const PaymentGateway = ({ paymentMethod, orderData, onBack }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, failed
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    if (paymentMethod !== 'cod') {
      loadRazorpayScript();
    }
  }, [paymentMethod]);

  const generateOrderId = () => {
    return 'ORDER_' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    
    try {
      // In production, this would be an API call to your backend
      const orderResponse = {
        id: 'order_' + Math.random().toString(36).substr(2, 9),
        amount: orderData.orderSummary.total * 100, // Razorpay expects amount in paisa
        currency: 'INR',
      };

      const options = {
        key: 'rzp_test_1234567890', // Replace with your Razorpay key ID
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Bharatiya Bazaar',
        description: `Payment for ${orderData.name}`,
        image: '/logo.png', // Your logo
        order_id: orderResponse.id,
        handler: function (response) {
          // Payment successful
          console.log('Payment successful:', response);
          setPaymentStatus('success');
          setTimeout(() => {
            navigate('/order-confirmation', {
              state: {
                orderId: generateOrderId(),
                paymentId: response.razorpay_payment_id,
                orderData,
                paymentMethod
              }
            });
          }, 2000);
        },
        prefill: {
          name: orderData.shippingAddress.fullName,
          email: orderData.shippingAddress.email,
          contact: orderData.shippingAddress.phone
        },
        notes: {
          address: `${orderData.shippingAddress.addressLine1}, ${orderData.shippingAddress.city}`
        },
        theme: {
          color: '#2563EB'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          console.log('Payment failed:', response.error);
          setPaymentStatus('failed');
          setIsProcessing(false);
        });
        rzp1.open();
      } else {
        throw new Error('Razorpay SDK not loaded');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('failed');
      setIsProcessing(false);
    }
  };

  const handleCODOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        navigate('/order-confirmation', {
          state: {
            orderId: generateOrderId(),
            paymentId: 'COD_' + Date.now(),
            orderData,
            paymentMethod: 'cod'
          }
        });
      }, 2000);
    }, 1500);
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
    } else if (field === 'expiryDate') {
      // Format expiry date as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.substr(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }
    
    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
  };

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 
    'Punjab National Bank', 'Kotak Mahindra Bank', 'IndusInd Bank', 'Yes Bank'
  ];

  if (paymentStatus === 'success') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">
          {paymentMethod === 'cod' 
            ? 'Your order has been placed successfully. You can pay cash on delivery.'
            : 'Your payment has been processed successfully.'
          }
        </p>
        <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span className="text-sm text-gray-500">Redirecting to order confirmation...</span>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please try again or choose a different payment method.
        </p>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={onBack}
            className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Choose Different Method
          </button>
          <button
            onClick={() => {
              setPaymentStatus('pending');
              if (paymentMethod === 'cod') {
                handleCODOrder();
              } else {
                handleRazorpayPayment();
              }
            }}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Shield className="w-6 h-6 text-green-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Complete Payment</h2>
      </div>

      {/* Cash on Delivery */}
      {paymentMethod === 'cod' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Cash on Delivery Selected</h3>
                <p className="text-sm text-amber-700 mt-1">
                  You'll pay ₹{orderData.orderSummary.total.toLocaleString('en-IN')} when your order is delivered.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Please keep exact change ready</li>
              <li>COD orders may take 1-2 additional days for delivery</li>
              <li>COD charges may apply for orders below ₹500</li>
              <li>You can cancel your order before it's shipped</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <button
              onClick={handleCODOrder}
              disabled={isProcessing}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Placing Order...
                </>
              ) : (
                'Confirm COD Order'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Card Payment */}
      {paymentMethod === 'card' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={cardDetails.expiryDate}
                  onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={cardDetails.cardholderName}
                onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Back
            </button>
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessing}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ₹${orderData.orderSummary.total.toLocaleString('en-IN')}`
              )}
            </button>
          </div>
        </div>
      )}

      {/* UPI Payment */}
      {paymentMethod === 'upi' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enter UPI ID</label>
            <input
              type="text"
              placeholder="yourname@paytm"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your UPI ID (e.g., 9876543210@paytm, yourname@gpay)
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
              <button
                key={app}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-center"
                onClick={() => setUpiId(upiId || '9876543210@' + app.toLowerCase().replace(' ', ''))}
              >
                <div className="text-sm font-medium text-gray-700">{app}</div>
              </button>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Back
            </button>
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessing || !upiId}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ₹${orderData.orderSummary.total.toLocaleString('en-IN')}`
              )}
            </button>
          </div>
        </div>
      )}

      {/* Net Banking */}
      {paymentMethod === 'netbanking' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Bank</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Choose your bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              You'll be redirected to your bank's secure website to complete the payment.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Back
            </button>
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessing || !selectedBank}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ₹${orderData.orderSummary.total.toLocaleString('en-IN')}`
              )}
            </button>
          </div>
        </div>
      )}

      {/* Wallet Payment */}
      {paymentMethod === 'wallet' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {['Paytm Wallet', 'Amazon Pay', 'Mobikwik', 'Freecharge'].map((wallet) => (
              <button
                key={wallet}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                <div className="font-medium text-gray-700">{wallet}</div>
              </button>
            ))}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Back
            </button>
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessing}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 font-medium flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Pay ₹${orderData.orderSummary.total.toLocaleString('en-IN')}`
              )}
            </button>
          </div>
        </div>
      )}

      {/* Security Information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <Shield className="w-4 h-4 mr-2 text-green-500" />
          <span>Your payment information is secured with 256-bit SSL encryption</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;