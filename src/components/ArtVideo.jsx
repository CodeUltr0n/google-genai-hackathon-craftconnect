import React, { useState, useEffect } from "react";
import OurStoryVideo from "../assets/videos/ArtVideo.mp4"; // your video

const ArtVideo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768; // Tailwind md breakpoint
    setIsMobile(mobile);
  }, []);

  return (
    <div
      className="rounded-lg shadow-xl overflow-hidden cursor-pointer w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ aspectRatio: '9/16' }}
    >
      {(isHovered || isMobile) && (
        <video
          src={OurStoryVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-300 transform scale-105"
        />
      )}
    </div>
  );
};

export default ArtVideo;