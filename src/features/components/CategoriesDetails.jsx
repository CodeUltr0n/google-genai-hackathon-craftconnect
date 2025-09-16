import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import comingSoonAnimation from "../../assets/animations/Settings.json"; // Add your Lottie JSON

const CategoryDetails = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white shadow-lg rounded-xl p-10 flex flex-col items-center max-w-md w-full transition-transform duration-300 hover:scale-105">
        {/* Lottie Animation */}
        <div className="w-72 h-72">
          <Player
            autoplay
            loop
            src={comingSoonAnimation}
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        {/* Coming Soon Message */}
        <h1 className="text-5xl font-extrabold text-gray-800 mt-8">Coming Soon...</h1>
        <p className="text-lg text-gray-600 mt-4 text-center leading-relaxed">
          We're working hard to bring you a detailed category page. Stay tuned for the full experience with galleries, videos, and cultural insights!
        </p>
      </div>
    </div>
  );
};

export default CategoryDetails;