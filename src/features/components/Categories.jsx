import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, description, imageUrl }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group h-80">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>

        {/* Use Link to navigate to the category page */}
        <Link
          to={`/category/${encodeURIComponent(title)}`}
          className="mt-4 bg-white text-slate-800 font-bold px-5 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
