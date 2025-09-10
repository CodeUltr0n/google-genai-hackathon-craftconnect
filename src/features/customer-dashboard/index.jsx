import React, { useState, useRef ,useEffect} from 'react';
import Sidebar from '../../components/sidebar';
import { Routes, Route } from 'react-router-dom';
import OrderHistory from './components/OrderHistory';
import FavoritesPage from './components/FavoritesPage';
import { Player } from '@lottiefiles/react-lottie-player';
import catLoader from '../../assets/animations/cat Mark loading.json'; 
import Messages from './components/MessagePage';
import Settings from './components/SettingsPage';


// --- SVG Icons for the Tabs (No changes) ---
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const OrderHistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const FavoritesIconTab = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
const AccountSettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// This component now contains the "Welcome, Olivia" header.
const ProfilePage = ({ user }) => {
    return (
        <div>
            {/* This header will now ONLY appear on the main profile route */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Welcome, {user.firstName}</h1>
                <p className="text-gray-500 mt-2 text-lg">Manage your profile, orders, and preferences.</p>
            </div>
            <ProfileInformation user={user} />
        </div>
    );
};

const CustomerDashboard = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- STEP 2: Fetch the data ---
    // The `useEffect` hook runs once when the component first loads.
    // This is the standard place to make database calls.
    useEffect(() => {
        // This is where you would call your backend API.
        // For example: fetch('/api/user/olivia-kapoor')
        // We'll simulate this with a delay to show the loading state.
        
        setTimeout(() => {
            const fetchedUserData = {
                name: 'Olivia Kapoor',
                initials: 'OK',
                type: 'customer',
                firstName: 'Olivia',
                lastName: 'Kapoor',
                email: 'olivia.k@example.com',
                bio: 'I have a deep appreciation for handcrafted textiles and traditional Indian art forms.',
            };
             setCurrentUser(fetchedUserData);
      setIsLoading(false);
    }, 2000);
  }, []);
// --- STEP 4: Handle the loading state ---
    // If the data hasn't loaded yet, we show a simple loading message.
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Player
          autoplay
          loop
          src={catLoader}
          style={{ height: 200, width: 200 }}
        />
        <p
          className="text-orange-500 text-2xl tracking-wider italic mt-4"
          style={{ fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif" }}
        >
          Loading Dashboard...
        </p>
      </div>
    );
  }
    const tabs = [
        { id: '/', name: 'Profile', icon: <ProfileIcon /> },
        { id: '/orders', name: 'Order History', icon: <OrderHistoryIcon /> },
        { id: '/favorites', name: 'My Favorites', icon: <FavoritesIconTab /> },
        { id: '/messages', name: 'Messages', icon: <OrderHistoryIcon /> },
        { id: '/account', name: 'Account Settings', icon: <AccountSettingsIcon /> },
    ];

    return (
        <div className="flex bg-gray-50 font-sans min-h-screen">
            {/* Now we can pass the entire 'currentUser' object to the Sidebar */}
            <Sidebar user={currentUser} tabs={tabs} />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    {/* The welcome message is also dynamic */}
                    {/* <h1 className="text-3xl font-bold text-gray-800">Welcome, {currentUser.firstName}</h1>
                    <p className="text-gray-500 mt-1 mb-6">Manage your profile, orders, and preferences.</p> */}

                  <Routes>
                        <Route path="/" element={<ProfilePage user={currentUser} />} />
                        <Route path="/orders" element={<OrderHistory />} />
                        <Route path="/favorites" element={<FavoritesPage  />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<ProfilePage user={currentUser} />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

// --- Profile Information Component (No changes needed here now) ---
const ProfileInformation = ({ user }) => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = () => {
        console.log("Saving data:", { formData, profileImage });
        alert("Changes saved! (Check the console for data)");
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h2>
            <div className="flex items-center space-x-5 mb-8">
                <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {imagePreview ? (<img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />) : (<span className="text-gray-500 text-2xl font-bold">{user.initials}</span>)}
                </div>
                <div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <button onClick={() => fileInputRef.current.click()} className="font-medium text-indigo-600 hover:text-indigo-800">Change Photo</button>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF. 1MB max.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Bio</label>
                    <textarea name="bio" rows="3" value={formData.bio} onChange={handleInputChange} placeholder="Tell us about your interest in Indian crafts..." className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
            </div>
            <div className="mt-8 pt-5 border-t border-gray-200 text-right">
                <button onClick={handleSaveChanges} className="bg-indigo-600 text-white font-medium py-2.5 px-6 rounded-lg shadow hover:bg-indigo-700 transition-colors">Save Changes</button>
            </div>
        </div>
    );
};

export default CustomerDashboard;
