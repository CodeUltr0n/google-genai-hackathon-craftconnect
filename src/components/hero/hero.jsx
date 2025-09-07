import React from 'react';

// It's good practice to define the images in an array to keep the JSX clean.
const heroImages = [
  "/images/craft1.jpeg", // local image from public/images folder
  "/images/craft2.jpeg",
  "/images/craft3.jpeg",
  "/images/craft4.jpeg"
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-orange-100 py-19">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">

          {/* Column 1: The Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <span className="text-orange-500 font-semibold tracking-wide">
             📍 Made in India
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mt-2 mb-4 leading-tight">
              Discover India's <br /> Authentic Crafts
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Explore traditional handmade treasures from every corner of India, crafted by skilled artisans preserving centuries-old traditions.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                Shop by Region
              </button>
              <button className="bg-transparent text-slate-800 font-bold px-6 py-3 rounded-lg border-2 border-slate-800 hover:bg-slate-800 hover:text-white transition-colors">
                   Featured Crafts
              </button>
            </div>
          </div>

          {/* Column 2: The Scrolling Image Gallery */}
          <div className="md:w-1/2 w-full">
            {/* This is the container or 'screen' that hides the overflow */}
            <div className="w-full overflow-hidden image-scroll-container">
              {/* This is the 'filmstrip' that we animate. It uses your .scroll-left class. */}
              <div className="flex scroll-left">
                {/* We map over the images TWICE to create a seamless loop */}
                {[...heroImages, ...heroImages].map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Craft image ${index + 1}`}
                    // 'flex-none' prevents images from shrinking. 'w-1/2' makes two images visible at a time.
                    className="flex-none w-1/2 h-64 object-cover rounded-lg shadow-lg mx-4"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Ensure it's a default export.
export default Hero;




