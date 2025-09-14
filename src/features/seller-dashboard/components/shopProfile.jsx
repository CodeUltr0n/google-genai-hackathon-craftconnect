import React, { useState, useRef, useEffect } from "react";
// --- AI Assistant Modal ---
import AiGrowthAssistantModal from './AigrowthAssistant';
import { Player } from '@lottiefiles/react-lottie-player';
import AiAnimation from '../../../assets/animations/AI data.json'
// --- Reusable Section Header ---
const PageHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
    </div>
);

const ShopProfile = ({ user }) => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [aiInsights, setAiInsights] = useState(null);
    const [isInsightsLoading, setIsInsightsLoading] = useState(true);

    // --- Fetch seller profile ---
    useEffect(() => {
        const fetchSellerProfile = async () => {
            const mockDataFromDB = {
                shopName: "Julia's Crafts House",
                artisanName: user.name,
                email: 'julia.k@craftshouse.com',
                bio: "Specializing in handcrafted Madhubani paintings and traditional textiles from the heart of Bihar. Each piece tells a story of heritage and passion.",
                shopImageUrl: null
            };
            setFormData(mockDataFromDB);
        };
        fetchSellerProfile();
    }, [user]);

    // --- Fetch AI Insights ---
    useEffect(() => {
        setIsInsightsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setTimeout(() => {
                setAiInsights({
                    potentialRevenueIncrease: "+23%",
                    audienceReach: "+45%",
                    priorityActions: 3
                });
                setIsInsightsLoading(false);
            }, 3000);
        }, 0);
    }, []);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const triggerFileSelect = () => fileInputRef.current.click();

    // --- Save changes (including image) ---
    const handleSaveChanges = async () => {
        try {
            const submissionData = new FormData();
            Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
            if (profileImage) submissionData.append('shopImage', profileImage);

            const response = await fetch(`/api/sellers/${user.id}`, {
                method: 'PUT',
                body: submissionData
            });
            await response.json();

            alert("Shop profile updated successfully!");
            // Update formData to reflect new image
            if (profileImage) {
                setFormData(prev => ({ ...prev, shopImageUrl: imagePreview }));
                setProfileImage(null);
                setImagePreview(null);
            }
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Error saving profile. Please try again.");
        }
    };


    // Removed Marketplace Lottie and isLoading block

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* --- AI Growth Assistant Modal --- */}
            {isAiModalOpen && <AiGrowthAssistantModal onClose={() => setIsAiModalOpen(false)} />}

            {/* --- Welcome Header --- */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Welcome, {user.firstName}</h1>
                    <p className="text-gray-500 mt-2 text-lg">Manage your artisan shop and listings</p>
                </div>
                <button
                    onClick={() => setIsAiModalOpen(true)}
                    className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-purple-700 transition-colors flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l-.707-.707M12 21v-1m0-16a9 9 0 11-9 9 9 9 0 019-9z" /></svg>
                    <span>AI Growth Assistant</span>
                </button>
            </div>

            {/* --- AI Insights Summary --- */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">AI Insights</h2>
                    <button onClick={() => setIsAiModalOpen(true)} className="font-semibold text-indigo-600 hover:text-indigo-800 text-sm">View All</button>
                </div>
                {isInsightsLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
            <Player
                autoplay
                loop
                src={AiAnimation}
                style={{ height: '250px', width: '250px' }}
            />
            <p className="text-gray-500 text-lg mt-4">Loading AI insights...</p>
        </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Potential Revenue Increase</p>
                            <p className="text-2xl font-bold text-green-600">{aiInsights.potentialRevenueIncrease}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Audience Reach</p>
                            <p className="text-2xl font-bold text-blue-600">{aiInsights.audienceReach}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Priority Actions</p>
                            <p className="text-2xl font-bold text-gray-800">{aiInsights.priorityActions}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Shop Profile Form --- */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <PageHeader
                    title="Edit Shop Profile"
                    subtitle="Update your shop details and profile image here."
                />

                {/* --- Shop Image Upload --- */}
                <div className="mb-8">
                    <label className="block mb-3 font-semibold text-gray-700">Shop Image</label>
                    <div className="flex items-center space-x-6">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm">
                            {(imagePreview || formData?.shopImageUrl) ? (
                                <img
                                    src={imagePreview || formData?.shopImageUrl}
                                    alt="Shop Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                onClick={triggerFileSelect}
                                className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                Choose Image
                            </button>
                            <p className="mt-2 text-sm text-gray-500">Accepted formats: JPG, PNG. Max size: 5MB.</p>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        </div>
                    </div>
                </div>

                {/* --- Text Fields --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="shopName" className="block mb-2 font-semibold text-gray-700">Shop Name</label>
                        <input
                            id="shopName"
                            name="shopName"
                            type="text"
                            value={formData?.shopName}
                            onChange={handleInputChange}
                            placeholder="Enter your shop name"
                            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition hover:border-indigo-400"
                        />
                        <p className="mt-1 text-sm text-gray-500">Your shop's public name.</p>
                    </div>
                    <div>
                        <label htmlFor="artisanName" className="block mb-2 font-semibold text-gray-700">Artisan Name</label>
                        <input
                            id="artisanName"
                            name="artisanName"
                            type="text"
                            value={formData?.artisanName}
                            onChange={handleInputChange}
                            placeholder="Enter artisan's name"
                            className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition hover:border-indigo-400"
                        />
                        <p className="mt-1 text-sm text-gray-500">Name displayed on your profile.</p>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData?.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition hover:border-indigo-400"
                    />
                    <p className="mt-1 text-sm text-gray-500">We'll never share your email.</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block mb-2 font-semibold text-gray-700">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData?.bio}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Tell us about your shop and craft..."
                        className="w-full border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition hover:border-indigo-400 resize-none"
                    />
                    <p className="mt-1 text-sm text-gray-500">A short description to attract customers.</p>
                </div>

                {/* --- Save Button --- */}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleSaveChanges}
                        className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopProfile;
