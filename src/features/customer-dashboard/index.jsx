import React, { useState, useRef ,useEffect} from 'react';
import Sidebar from '../../components/sidebar';
import { Routes, Route } from 'react-router-dom';
import OrderHistory from './components/OrderHistory';
import FavoritesPage from './components/FavoritesPage';
import { Player } from '@lottiefiles/react-lottie-player';
import Marketplace from '../../assets/animations/marketplace.json'; 
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
    }, 3000);
  }, []);
// --- STEP 4: Handle the loading state ---
    // If the data hasn't loaded yet, we show a simple loading message.
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="flex flex-col items-center space-y-6">
          <Player
            autoplay
            loop
            src={Marketplace}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 animate-fade-in"
          />
          <p
            className="text-orange-500 text-2xl sm:text-3xl font-bold tracking-wider italic animate-pulse"
            style={{ fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif" }}
          >
            Loading Dashboard...
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            Please wait while we prepare your personalized experience.
          </p>
        </div>
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

    const handleSaveChanges = async () => {
        try {
            const data = new FormData();
            data.append('firstName', formData.firstName);
            data.append('lastName', formData.lastName);
            data.append('email', formData.email);
            data.append('bio', formData.bio);
            if (profileImage) {
                data.append('profileImage', profileImage);
            }

            const response = await fetch('/api/customer/update-profile', {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();

            if (result.profileImageUrl) {
                setImagePreview(result.profileImageUrl);
            }

            alert('Profile updated successfully!');
        } catch (error) {
            alert('Error updating profile: ' + error.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Profile Information</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 mb-10">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                        <span className="text-gray-400 text-4xl font-extrabold flex items-center justify-center h-full w-full">{user.initials}</span>
                    )}
                </div>
                <div className="flex flex-col items-center md:items-start">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
                    >
                        Change Photo
                    </button>
                    <p className="text-xs text-gray-500 mt-2 max-w-xs text-center md:text-left">Allowed formats: JPG, PNG, GIF. Max size: 1MB.</p>
                </div>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                    <label htmlFor="firstName" className="mb-2 font-medium text-gray-700">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <small className="text-gray-400 mt-1">Your given name</small>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName" className="mb-2 font-medium text-gray-700">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <small className="text-gray-400 mt-1">Your family name</small>
                </div>
                <div className="md:col-span-2 flex flex-col">
                    <label htmlFor="email" className="mb-2 font-medium text-gray-700">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                    <small className="text-gray-400 mt-1">We'll never share your email.</small>
                </div>
                <div className="md:col-span-2 flex flex-col">
                    <label htmlFor="bio" className="mb-2 font-medium text-gray-700">Your Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows="4"
                        placeholder="Tell us about your interest in Indian crafts..."
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    ></textarea>
                    <small className="text-gray-400 mt-1">A brief introduction about yourself.</small>
                </div>
            </form>
            <div className="mt-10 text-right">
                <button
                    onClick={handleSaveChanges}
                    className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default CustomerDashboard;
