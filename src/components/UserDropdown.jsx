// src/components/UserDropdown.jsx
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const UserDropdown = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Track if welcome toast has already been shown
  const [welcomeShown, setWelcomeShown] = useState(false);

  useEffect(() => {
    if (user?.name && !welcomeShown) {
      toast.success(`Welcome, ${user.name}! You are signed in.`);
      setWelcomeShown(true);
    }
  }, [user, welcomeShown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={user?.avatar || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
          alt="user avatar"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 z-50 bg-gray-50 divide-y divide-gray-200 rounded-lg shadow-lg dark:bg-gray-900 dark:divide-gray-700">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900 dark:text-white">{user?.name || "Guest User"}</p>
            <p className="text-sm font-medium text-gray-500 truncate dark:text-white">
              {user?.email || "guest@example.com"}
            </p>
          </div>
          <ul className="py-1">
            <li>
              <a href="/seller-dashboard" className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
                Settings
              </a>
            </li>
            <li>
              <a href="/earnings" className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white">
                Earnings
              </a>
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-red-700 text-red-700 dark:text-red-500 font-medium"
                onClick={() => {
                  if (onSignOut) onSignOut();
                  toast.info("You have been signed out successfully!");
                  setIsOpen(false); // closes the dropdown
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;