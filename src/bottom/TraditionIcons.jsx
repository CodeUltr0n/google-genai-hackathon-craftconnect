import React from "react";

const TraditionIcon = ({ letter, name, region, bgColorClass }) => {
  return (
    // The main container for a single icon and its text.
    <div className="flex flex-col items-center text-center gap-3">
      {/* The colored circle. Note the dynamic className! */}
      {/* We use a template literal `${...}` to insert the color class passed via props. */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md ${bgColorClass}`}>
        <span>{letter}</span>
      </div>
      {/* The text labels below the circle. */}
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{region}</p>
      </div>
    </div>
  );
};

export default TraditionIcon;