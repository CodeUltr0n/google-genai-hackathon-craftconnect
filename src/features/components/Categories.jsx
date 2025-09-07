import React from 'react';

// This component accepts props for the category's title, description, and image URL.
const CategoryCard = ({ title, description, imageUrl }) => {
  return (
    // The main container. We use 'group' for hover effects.
    // 'relative' is crucial for positioning the overlay.
    <div className="relative rounded-lg overflow-hidden shadow-lg group h-80">
      {/* The background image. It will fill the entire card. */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* The semi-transparent overlay. It sits on top of the image. */}
     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      
      {/* The text content, centered using Flexbox and positioned with 'absolute'. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
        <button className="mt-4 bg-white text-slate-800 font-bold px-5 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
