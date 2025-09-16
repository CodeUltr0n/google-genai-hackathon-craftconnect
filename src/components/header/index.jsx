import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthenticateContext'; 
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
                {/* Show cart SVG button only for customers */}
                {user?.role === 'customer' && (
                  <button 
                    onClick={() => navigate('/cart')} 
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-6 h-6 text-black " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                    </svg>
                  </button>
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