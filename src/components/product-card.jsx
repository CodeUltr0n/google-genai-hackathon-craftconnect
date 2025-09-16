import React from 'react';
// 1. Import the Link component.
import { Link } from 'react-router-dom';

// 2. We add the product's 'id' to the props.
const ProductCard = ({ id, name, artisan, price, imageUrl, regionTag, craftTag, region }) => {
  return (
    // 3. We wrap the entire card in a Link component.
    // The 'to' prop creates the dynamic URL, e.g., /product/prod_123
    <Link to={`/shop/${id}`}>
      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group h-full">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-64 object-cover"
          />
          <span className="absolute top-3 left-3 bg-white bg-opacity-80 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
            {regionTag}
          </span>
          <span className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded">
            {craftTag}
          </span>
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-base font-semibold text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-500 mb-2">by {artisan}</p>
          <div className="flex justify-between items-center">
            <p className="text-base font-bold text-gray-900">
              ₹{price.toLocaleString('en-IN')}
            </p>
            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
              {region}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

