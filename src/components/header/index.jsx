import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthenticateContext'; 
import { useCart } from '../../features/customer-dashboard/components/useCart';
import UserDropdown from "../UserDropdown";

const publicLinks = [
  { text: "Marketplace", path: "/" },
  { text: "Shop", path: "/shop" },
  { text: "Categories", path: "/categories" },
  { text: "About", path: "/about" },
];

const privateLinks = [
  { text: "Customer", path: "/customer" },
  { text: "Seller", path: "/seller" },
];

const Header = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const { totalItems } = useCart() || { totalItems: 0 };
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  return (
    <header className="shadow-sm bg-white">
      {/* Promotional Strip */}
      <div className="bg-orange-100 text-orange-800 py-2 overflow-hidden">
        <div className='marquee whitespace-nowrap'>
            <span className='mx-4 text-sm font-semibold'>Welcome to the Bazaar! Enjoy a special inaugural offer on your first piece of heritage.</span>
            <span className="mx-4 text-sm font-semibold">Welcome to the Bazaar! Enjoy a special inaugural offer on your first piece of heritage.</span>
            <span className="mx-4 text-sm font-semibold">Welcome to the Bazaar! Enjoy a special inaugural offer on your first piece of heritage.</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-extrabold text-slate-800 whitespace-nowrap tracking-wider">
              <Link to="/">Bharatiya Bazaar</Link>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {publicLinks.map((link) => (
                <NavLink 
                  key={link.text} 
                  to={link.path}
                  className={({ isActive }) => 
                    `transition-colors ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
              {isLoggedIn && privateLinks.map((link) => (
                 <NavLink 
                  key={link.text} 
                  to={link.path}
                  className={({ isActive }) => 
                    `transition-colors ${
                      isActive 
                        ? 'text-blue-600 font-semibold' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* --- THIS IS THE DYNAMIC SECTION --- */}
            {isLoggedIn ? (
              // --- Logged IN State ---
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search for handmade items"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-72 pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Enhanced Cart Button with Count */}
                {user?.role === 'customer' && (
                  <button 
                    onClick={() => navigate('/cart')} 
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
                  >
                    <svg className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6M9 19v2m6-2v2" />
                    </svg>
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
                    )}
                  </button>
                )}
                
                {/* Mini Cart Preview - Shows on hover */}
                {user?.role === 'customer' && totalItems > 0 && (
                  <div className="hidden group-hover:block absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Cart ({totalItems})</h3>
                        <button 
                          onClick={() => navigate('/cart')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View All
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 text-center py-4">
                        {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                      </p>
                      <button
                        onClick={() => navigate('/cart')}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Go to Cart
                      </button>
                    </div>
                  </div>
                )}
                {/* /// TODO: Replace mock user data with real database user when backend is ready */}
                <UserDropdown 
                  user={{
                    name: user?.name || "Julia's Crafts House ",
                    email: user?.email || "julia.k@craftshouse.com",
                    // avatar: user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "Julia's Crafts House")
                    avatar: user?.avatar || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  }}
                  onSignOut={logout}
                />
              </>
            ) : (
              // --- Logged OUT State ---
               <>
                {/* This now points to the customer-specific sign-in route */}
                <Link to="/signin/customer">
                  <button className="bg-white text-slate-800 font-bold px-4 py-2 rounded-full border border-slate-300 hover:bg-slate-100 transition-colors text-sm">
                    Sign in as Customer
                  </button>
                </Link>
                {/* This now points to the seller-specific sign-in route */}
                <Link to="/signin/seller">
                  <button className="bg-gray-800 text-white font-bold px-5 py-2 rounded-full hover:bg-gray-900 transition-colors text-sm">
                    Sign in as Seller
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;