import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../features/components/productCard';
import Tradition from '../bottom/Traditions'; // fixed typo

const regions = [
  { name: 'All Regions', states: '' },
  { name: 'North India', states: '5 states' },
  { name: 'West India', states: '3 states' },
  { name: 'East India', states: '4 states' },
  { name: 'South India', states: '5 states' },
  { name: 'Northeast India', states: '7 states' },
  { name: 'Himalayan Region', states: '4 states' },
];

// Mock products with unique IDs and public image paths
const products = [
  { id: 1, name: 'Blue Pottery Vase', artisan: 'Ravi Kumar', price: 2500, imageUrl: '/images/Blue pottery.jpeg', regionTag: 'Rajasthan', craftTag: 'Blue Pottery', region: 'North India' },
  { id: 2, name: 'Bandhani Silk Dupatta', artisan: 'Meena Sharma', price: 3200, imageUrl: '/images/Bandhani Silk Dupatta.jpeg', regionTag: 'Rajasthan', craftTag: 'Bandhani', region: 'North India' },
  { id: 3, name: 'Chikankari Kurta', artisan: 'Fatima Khan', price: 2800, imageUrl: '/images/Chikankari Kurta.jpeg', regionTag: 'Uttar Pradesh', craftTag: 'Chikankari', region: 'North India' },
  { id: 4, name: 'Kutch Mirror Work Bag', artisan: 'Kiran Patel', price: 1800, imageUrl: '/images/Kutch Mirror Work Bag.jpeg', regionTag: 'Gujarat', craftTag: 'Mirror Work', region: 'West India' },
  { id: 5, name: 'Warli Art Canvas', artisan: 'Suresh Kumar', price: 4500, imageUrl: '/images/Warli Art Canvas.jpeg', regionTag: 'Maharashtra', craftTag: 'Warli Art', region: 'West India' },
  { id: 6, name: 'Kantha Work Saree', artisan: 'Priya Das', price: 6800, imageUrl: '/images/Kantha Work Saree.jpeg', regionTag: 'West Bengal', craftTag: 'Kantha', region: 'East India' },
  { id: 7, name: 'Dokra Art Piece', artisan: 'Anil Mahto', price: 3500, imageUrl: '/images/Dokra Art Piece.jpeg', regionTag: 'West Bengal', craftTag: 'Dokra', region: 'East India' },
  { id: 8, name: 'Kanjeevaram Silk', artisan: 'Lakshmi Murthy', price: 22000, imageUrl: '/images/Kanjeevaram Silk.jpeg', regionTag: 'Tamil Nadu', craftTag: 'Kanjeevaram', region: 'South India' },
];

const ShopsPage = () => {
  const [activeRegion, setActiveRegion] = useState('All Regions');

  const filteredProducts =
    activeRegion === 'All Regions'
      ? products
      : products.filter((p) => p.region === activeRegion);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-2">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Crafts</h2>

        {/* Regional Filter */}
        <div className="flex flex-col items-start mb-10">
          <h3 className="font-semibold text-lg mb-3">Shop by Region</h3>
          <div className="flex flex-wrap gap-3">
            {regions.map((region) => (
              <button
                key={region.name}
                onClick={() => setActiveRegion(region.name)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  activeRegion === region.name
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <span className="font-semibold">{region.name}</span>
                {region.states && (
                  <span className="text-xs ml-2 text-gray-400">
                    {region.states}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link to={`/shop/${product.id}`} key={product.id}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>

      {/* Optional Section */}
      {/* <Tradition /> */}
    </div>
  );
};

export default ShopsPage;

