import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import comingSoonAnimation from '../../../assets/animations/Settings.json';
const PageHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
    </div>
);
const Messages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
    <PageHeader title="Messages" subtitle="Stay connected with your sellers and conversations." />
      <Player
        autoplay
        loop
        src={comingSoonAnimation}
        className="mb-6"
        style={{ height: 200, width: 200 }}
      />
   <h2 className="text-2xl font-semibold text-gray-700">Coming Soon!</h2>
    <p className="text-gray-500 mt-2">We're working hard to bring you a comprehensive Messages page. Stay tuned!</p>
    </div>
  );
};

export default Messages;