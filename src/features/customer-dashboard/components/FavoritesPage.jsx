import React from 'react';
// Assuming the path to your ProductCard is correct.
import ProductCard from '../../components/productCard'; 

// A reusable component for the section header
const PageHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
    </div>
);

// The main Favorites component
const Favorites = () => {
    // --- CORRECTED: The image URLs now use absolute paths from the public folder ---
    const favoriteItems = [
      { name: 'Bandhani Silk Dupatta', artisan: 'Meena Sharma', price: 3200, imageUrl: '/images/Bandhani Silk Dupatta.jpeg', regionTag: 'Rajasthan', craftTag: 'Bandhani' },
      { name: 'Warli Art Canvas', artisan: 'Suresh Kumar', price: 4500, imageUrl: '/images/Warli Art Canvas.jpeg', regionTag: 'Maharashtra', craftTag: 'Warli Art' },
      { name: 'Kanjeevaram Silk', artisan: 'Lakshmi Murthy', price: 22000, imageUrl: '/images/Kanjeevaram Silk.jpeg', regionTag: 'Tamil Nadu', craftTag: 'Kanjeevaram' },
      { name: 'Dokra Art Piece', artisan: 'Anil Mahto', price: 3500, imageUrl: '/images/Dokra Art Piece.jpeg', regionTag: 'West Bengal', craftTag: 'Dokra' },
    ];

    return (
        <div>
            <PageHeader title="My Favorites" subtitle="Your personal collection of saved and cherished crafts." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteItems.map(item => (
                    <ProductCard
                        key={item.name}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;

