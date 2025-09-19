import React from 'react';
import { ShoppingCart, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  const suggestions = [
    {
      title: "Handcrafted Pottery",
      description: "Beautiful ceramic pieces from skilled artisans",
      link: "/category/pottery",
      icon: "🏺"
    },
    {
      title: "Traditional Textiles",
      description: "Authentic fabrics with cultural heritage",
      link: "/category/textiles",
      icon: "🧵"
    },
    {
      title: "Artisan Jewelry",
      description: "Unique handmade jewelry collections",
      link: "/category/jewelry",
      icon: "💍"
    },
    {
      title: "Home Decor",
      description: "Traditional decorative items for your home",
      link: "/category/home-decor",
      icon: "🏠"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Empty Cart Illustration */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-blue-400" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-sm">😔</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any beautiful handcrafted items to your cart yet.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Discover Crafts
            </Link>
            
            <Link
              to="/categories"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Explore Our Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestions.map((suggestion, index) => (
              <Link
                key={index}
                to={suggestion.link}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 text-center">{suggestion.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {suggestion.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
            Why Shop With Us?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Authentic Crafts</h4>
              <p className="text-sm text-gray-600">
                Every product is handmade by skilled artisans using traditional techniques
              </p>
            </div>
            
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Support Artisans</h4>
              <p className="text-sm text-gray-600">
                Your purchase directly supports traditional craftspeople and their communities
              </p>
            </div>
            
            <div className="p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Unique Pieces</h4>
              <p className="text-sm text-gray-600">
                Find one-of-a-kind items that reflect India's rich cultural heritage
              </p>
            </div>
          </div>
        </div>

        {/* Back to Shopping */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;