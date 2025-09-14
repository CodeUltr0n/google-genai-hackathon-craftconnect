import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
// Temporary: Use the same settingsAnimation as Messages component
import settingsAnimation from "../../../assets/animations/Settings.json";
const PageHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
    </div>
);
const Analytics = () => {
  return (
   <div className="flex flex-col items-center justify-center h-full p-6">
      <PageHeader title="Analytics" subtitle="View your sales and performance metrics." />
      <Player
        autoplay
        loop
        src={settingsAnimation}
        style={{ height: '300px', width: '300px' }}
      />
   <h2 className="text-2xl font-semibold text-gray-700">Coming Soon!</h2>
    <p className="text-gray-500 mt-2">We're working hard to bring you a comprehensive Analytics page. Stay tuned!</p>
    </div>
  );
};

export default Analytics;