import React from 'react';

import CategoryCard from '../components/Categories'; 
import textiles from '../../assets/images/textiles.jpeg';
import pottery from '../../assets/images/pottery.jpeg';
import woodwork from '../../assets/images/woodwork.jpeg';
import art from '../../assets/images/art.jpeg';
import metalwork from '../../assets/images/metalwork.jpeg';
import jewelry from '../../assets/images/jewelry.jpeg';

const categoriesData = [
  { title: 'Textiles & Weaving', description: 'From vibrant silks to intricate shawls.', imageUrl: textiles },
  { title: 'Pottery & Ceramics', description: 'Hand-shaped clay, fired to perfection.', imageUrl: pottery },
  { title: 'Woodwork & Carving', description: 'Timeless furniture and decor.', imageUrl: woodwork },
  { title: 'Paintings & Art', description: 'Stories told through color and canvas.', imageUrl: art },
  { title: 'Metalwork', description: 'Intricate designs in brass and copper.', imageUrl: metalwork },
  { title: 'Jewelry', description: 'Handcrafted adornments of silver and stone.', imageUrl: jewelry },
];

const CategoriesPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-800">Explore by Category</h1>
          <p className="mt-2 text-gray-600">Discover the diverse world of Indian craftsmanship.</p>
        </div>
        
        {/* A responsive grid that shows 1, 2, or 3 columns depending on screen size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

