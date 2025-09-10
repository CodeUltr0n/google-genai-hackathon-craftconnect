import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import settingsAnimation from '../../../assets/animations/Settings.json';

// A reusable component for the section header
const PageHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
    </div>
);

// --- The Main Settings Component ---
const Settings = () => {
    return (
        <div>
            <PageHeader title="Account Settings" subtitle="Manage your account details and preferences." />
            
            <div className="bg-white rounded-lg shadow-sm p-12 text-center flex flex-col items-center">
                <Player
                    autoplay
                    loop
                    src={settingsAnimation}
                    style={{ height: '150px', width: '150px' }}
                    className="mb-4"
                />
                <h2 className="text-2xl font-semibold text-gray-700">Coming Soon!</h2>
                <p className="text-gray-500 mt-2">We're working hard to bring you a comprehensive settings page. Stay tuned!</p>
            </div>
        </div>
    );
};

export default Settings;