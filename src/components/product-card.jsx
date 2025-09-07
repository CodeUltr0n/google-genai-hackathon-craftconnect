import React from 'react';

// This is our reusable product card. 
const ProductCard = ({ name, artisan, price, imageUrl, tag }) => {
  return (
    // We add the 'group' class to the parent div. This allows us to create hover effects
    // on child elements when the parent is hovered over.
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative">
        {/* The image will scale up slightly when the card is hovered. */}
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* The tag is positioned absolutely in the top-left corner. */}
        <span className="absolute top-3 left-3 bg-black bg-opacity-50 text-white text-xs font-semibold px-2 py-1 rounded">
          {tag}
        </span>
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">by {artisan}</p>
        <p className="text-lg font-bold text-gray-900">
          {/* We format the price to include the Rupee symbol and commas. */}
          ₹{price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

