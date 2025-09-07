import React from 'react';
import TraditionIcon from './TraditionIcons'; // Assuming the path is correct

const traditionsData = [
  { letter: 'B', name: 'Blue Pottery', region: 'Rajasthan', color: 'bg-indigo-500' },
  { letter: 'K', name: 'Kantha Work', region: 'West Bengal', color: 'bg-emerald-500' },
  { letter: 'W', name: 'Warli Art', region: 'Maharashtra', color: 'bg-red-500' },
  { letter: 'P', name: 'Pashmina', region: 'Kashmir', color: 'bg-purple-500' },
];

const Traditions = () => {
  return (
    // CHANGE 1: Reduced vertical padding from py-16 to py-8
    <section className="bg-amber-50 py-1">
      <div className="container mx-auto px-4 text-center">
        {/* CHANGE 2: Reduced heading size from text-3xl to text-2xl */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Preserving Ancient Traditions
        </h2>
        {/* CHANGE 3: Reduced paragraph text size to text-sm and bottom margin */}
        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-sm">
          Each piece tells a story of generations of artisans who have passed down their skills through families, keeping India's rich cultural heritage alive in the modern world.
        </p>
        
        {/* CHANGE 4: Reduced the gap between icons */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {traditionsData.map((tradition) => (
            <TraditionIcon
              key={tradition.name}
              letter={tradition.letter}
              name={tradition.name}
              region={tradition.region}
              bgColorClass={tradition.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Traditions;
