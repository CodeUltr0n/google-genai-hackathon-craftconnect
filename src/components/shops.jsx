import React, { useState } from 'react'; 
import Trandition from '../bottom/Traditions'
import ProductCard from '../features/components/productCard';


const regions = [
  { name: 'All Regions', states: '' },
  { name: 'North India', states: '5 states' },
  { name: 'West India', states: '3 states' },
  { name: 'East India', states: '4 states' },
  { name: 'South India', states: '5 states' },
  { name: 'Northeast India', states: '7 states' },
  { name: 'Himalayan Region', states: '4 states' },
];

// Mock data.
const products = [
  { name: 'Blue Pottery Vase', artisan: 'Ravi Kumar', price: 2500, imageUrl: './images/Blue pottery.jpeg', regionTag: 'Rajasthan', craftTag: 'Blue Pottery', region: 'North India' },
  { name: 'Bandhani Silk Dupatta', artisan: 'Meena Sharma', price: 3200, imageUrl: './images/Bandhani Silk Dupatta.jpeg', regionTag: 'Rajasthan', craftTag: 'Bandhani', region: 'North India' },
  { name: 'Chikankari Kurta', artisan: 'Fatima Khan', price: 2800, imageUrl: './images/Chikankari Kurta.jpeg', regionTag: 'Uttar Pradesh', craftTag: 'Chikankari', region: 'North India' },
  { name: 'Kutch Mirror Work Bag', artisan: 'Kiran Patel', price: 1800, imageUrl: './images/Kutch Mirror Work Bag.jpeg', regionTag: 'Gujarat', craftTag: 'Mirror Work', region: 'West India' },
  { name: 'Warli Art Canvas', artisan: 'Suresh Kumar', price: 4500, imageUrl: './images/Warli Art Canvas.jpeg', regionTag: 'Maharashtra', craftTag: 'Warli Art', region: 'West India' },
  { name: 'Kantha Work Saree', artisan: 'Priya Das', price: 6800, imageUrl: './images/Kantha Work Saree.jpeg', regionTag: 'West Bengal', craftTag: 'Kantha', region: 'East India' },
  { name: 'Dokra Art Piece', artisan: 'Anil Mahto', price: 3500, imageUrl: './images/Dokra Art Piece.jpeg', regionTag: 'West Bengal', craftTag: 'Dokra', region: 'East India' },
  { name: 'Kanjeevaram Silk', artisan: 'Lakshmi Murthy', price: 22000, imageUrl: './images/Kanjeevaram Silk.jpeg', regionTag: 'Tamil Nadu', craftTag: 'Kanjeevaram', region: 'South India' },
];

const ShopsPage = () => {
  // initialize it to 'All Regions'.
  const [activeRegion, setActiveRegion] = useState('All Regions');

  // This is our filtering logic.
  // It creates a new array based on the 'activeRegion' state.
  const filteredProducts = activeRegion === 'All Regions'
    ? products // If 'All Regions' is selected, show all products.
    : products.filter(p => p.region === activeRegion); // Otherwise, only show products that match the selected region.

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-2">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Crafts</h2>
        
        {/* The Regional Filter Section */}
        <div className="flex flex-col items-start mb-10" >
          <h3 className="font-semibold text-lg mb-3 ">Shop by Region</h3>
          <div className="flex flex-wrap gap-3">
            {/* 4. We map over our regions data to create the buttons. */}
            {regions.map(region => (
              <button
                key={region.name}
                // 5. When a button is clicked, we update the state.
                onClick={() => setActiveRegion(region.name)}
                // 6. The button's style changes dynamically based on the activeRegion state.
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  activeRegion === region.name
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <span className="font-semibold">{region.name}</span>
                {region.states && <span className="text-xs ml-2 text-gray-400">{region.states}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* The Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 7. We map over the 'filteredProducts' array now, not the original 'products' array. */}
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
            />
          ))}
        </div>
      </div>
      {/* <Trandition/> */}
    </div>
  );
};

export default ShopsPage;

