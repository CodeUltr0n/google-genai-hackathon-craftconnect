import React from 'react';

// This component will display an icon, a title, and a description for an AI feature.
const AIShowcaseCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-left">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-800">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AIShowcaseCard;
