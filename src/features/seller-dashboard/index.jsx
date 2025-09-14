import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import Marketplace from '../../assets/animations/e-commerce platform.json';


// --- Import all the real page components for the seller ---
import ShopProfile from './components/shopProfile';
import MyProducts from './components/Myproducts';
import SellerOrders from './components/SellerOrder';
import AiAssistant from './components/AigrowthAssistant';
import Messages from './components/Messages';
import Analytics from './components/Analytics';



// --- Loading Wrapper Component for ShopProfile ---
const ShopProfileWithLoader = ({ user }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3300);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Lottie animationData={Marketplace} loop={true} style={{ width: 350, height: 350 }} />
            </div>
        );
    }

    return <ShopProfile user={user} />;
};


// --- The Main Seller Dashboard Component ---
const SellerDashboard = () => {
    // Mock user data for the seller
    const currentSeller = {
        name: 'Julia Kumari',
        initials: 'JK',
        type: 'seller',
        firstName: 'Julia',
    };

    return (
        <div className="flex bg-gray-50 font-sans min-h-screen">
            <Sidebar user={currentSeller} />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* The nested router renders the correct component based on the URL */}
                    <Routes>
                        <Route path="/" element={<ShopProfileWithLoader user={currentSeller} />} />
                        {/* <Route path='/seller-dashboard' element={<ShopProfile user={currentSeller}/>}></Route> */}
                        <Route path="/products" element={<MyProducts />} />
                        <Route path="/orders" element={<SellerOrders />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/messages" element={<Messages />} />
                        {/* The router now renders your new, real AiAssistant component */}
                        <Route path="/ai-assistant" element={<AiAssistant />} />
                        <Route path="*" element={<ShopProfileWithLoader user={currentSeller} />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default SellerDashboard;
