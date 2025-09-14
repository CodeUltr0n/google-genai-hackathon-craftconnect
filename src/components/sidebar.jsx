import React from 'react';
import { NavLink } from "react-router-dom";

// --- Icon Components ---
// In a real app, these would be in their own files, but for simplicity, we'll define them here.
const DashboardIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const OrdersIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const FavoritesIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const MessagesIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const SettingsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ProductsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const AnalyticsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18" /></svg>;
const AiIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l-.707-.707M12 21v-1m0-16a9 9 0 11-9 9 9 9 0 019-9z" /></svg>;
const SwitchIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const LogoutIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

// <Sidebar /> should only be mounted once in the layout to prevent duplicates
const Sidebar = ({ user }) => {
  if (!user) return null;
// --- Link Data ---
const sellerLinks = [
  { name: 'Dashboard', href: '/seller-dashboard', icon: <DashboardIcon /> },
  { name: 'Orders', href: '/seller-dashboard/orders', icon: <OrdersIcon /> },
  { name: 'Products', href: '/seller-dashboard/products', icon: <ProductsIcon /> },
  { name: 'Messages', href: '/seller-dashboard/messages', icon: <MessagesIcon />, badge: user.unreadMessagesCount },
  { name: 'Analytics', href: '/seller-dashboard/analytics', icon: <AnalyticsIcon /> },
];

const customerLinks = [
  { name: 'Profile', href: '/customer-dashboard', icon: <DashboardIcon /> },
  { name: 'Orders', href: '/customer-dashboard/orders', icon: <OrdersIcon /> },
  { name: 'Favorites', href: '/customer-dashboard/favorites', icon: <FavoritesIcon />, badge: user.favoritesCount },
  { name: 'Messages', href: '/customer-dashboard/messages', icon: <MessagesIcon /> },
  { name: 'Settings', href: '/customer-dashboard/settings', icon: <SettingsIcon /> },
];



  const links = user.type === 'customer' ? customerLinks : sellerLinks;

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* --- User Info Header --- */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                {getInitials(user.name)}
            </div>
            <div className="ml-3">
                <p className="font-semibold text-gray-800 text-sm">Welcome, {user.name.split(' ')[0]}!</p>
                <p className="text-xs text-gray-500 capitalize">{user.type} Account</p>
            </div>
        </div>
      </div>
      
     {/* Main Navigation with updated hover styles */}
<nav className="flex-1 px-4 py-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            end={link.href === '/customer-dashboard' || link.href === '/seller-dashboard'}
            className={({ isActive }) => `
              flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
              ${
                isActive
                  ? 'bg-gray-800 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }
            `}
          >
            {link.icon}
            <span className="ml-3 flex-1">{link.name}</span>
            {link.badge && link.badge > 0 && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700"
              >
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions with updated hover styles */}
      <div className="px-4 py-4 border-t border-gray-200">
        <a href={user.type === 'customer' ? '/signin/seller' : '/signin/customer'} className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <SwitchIcon />
            <span className="ml-3">{user.type === 'customer' ? 'Switch to Seller' : 'Switch to Customer'}</span>
        </a>
        <button type="button" className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <LogoutIcon />
            <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
