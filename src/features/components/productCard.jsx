import React from 'react';

// This is our reusable product card, designed to accept all the props needed for the new design.
const ProductCard = ({ name, artisan, price, imageUrl, regionTag, craftTag, region }) => {
  return (
    // We use 'group' to enable hover effects on child elements if needed later.
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
      {/* The image container must be 'relative' to position the tags on top of it. */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-64 object-cover" // A fixed height for consistency in the grid.
        />
        {/* The region tag on the top-left, positioned absolutely. */}
        <span className="absolute top-3 left-3 bg-white bg-opacity-80 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
          {regionTag}
        </span>
        {/* The craft type tag on the top-right, positioned absolutely. */}
        <span className="absolute top-3 right-3 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded">
          {craftTag}
        </span>
      </div>
      {/* The text content area below the image. */}
      <div className="p-4 bg-white">
        <h3 className="text-base font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">by {artisan}</p>
        {/* We use Flexbox here to align the price and the bottom region tag. */}
        <div className="flex justify-between items-center">
          <p className="text-base font-bold text-gray-900">
            ₹{price.toLocaleString('en-IN')}
          </p>
          {/* The small, colored region tag at the bottom right. */}
          <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
            {region}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
