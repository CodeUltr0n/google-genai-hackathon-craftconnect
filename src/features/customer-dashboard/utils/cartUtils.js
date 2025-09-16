// src/features/customer-dashboard/utils/cartUtils.js
export const conversionRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0097,
  JPY: 1.65,
  AUD: 0.018,
};

// Add any other shared functions here
export const formatPrice = (price, currency) => {
  const rate = conversionRates[currency] || 1;
  return `${currency} ${ (price * rate).toFixed(2) }`;
};