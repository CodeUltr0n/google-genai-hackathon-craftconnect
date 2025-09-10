import React, { useState,useEffect, useMemo } from 'react';

// A reusable component for the section header
const PageHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
    </div>
);

// --- The Main Messages Component ---
const Messages = () => {
    // Mock data for conversations.
    const conversations = useMemo(() => [
        { id: 1, artisanName: 'Ravi Kumar', lastMessage: 'Yes, it is available in blue as well!', timestamp: '10:42 AM', unread: 0, avatar: 'RK' },
        { id: 2, artisanName: 'Meena Sharma', lastMessage: 'Thank you for your order!', timestamp: 'Yesterday', unread: 1, avatar: 'MS' },
        { id: 3, artisanName: 'Anil Mahto', lastMessage: 'I can create a custom size for you.', timestamp: '3 days ago', unread: 0, avatar: 'AM' },
    ], []);
    
    // Mock chat history for the selected conversation
    const initialChatHistory = useMemo(() => [
        { from: 'artisan', text: 'Thank you for your interest in the Bandhani Silk Dupatta!' },
        { from: 'user', text: 'It\'s beautiful! I was wondering if it is available in other colors?' },
        { from: 'artisan', text: 'Yes, it is available in blue as well!' },
    ], []);

    // --- RESPONSIVE STATE ---
    // We now store the entire conversation object. `null` means no conversation is selected (for mobile view).
    const [activeConversation, setActiveConversation] = useState(null);
    const [chatHistory, setChatHistory] = useState(initialChatHistory);
    const [messageInput, setMessageInput] = useState('');

    // This effect sets the first conversation as active ONLY on larger screens when the component loads.
    // On mobile, the user will see the conversation list first.
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && !activeConversation) {
                setActiveConversation(conversations[0]);
            }
        };
        handleResize(); // Run on initial load
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [conversations, activeConversation]);

    // Reset chat history when active conversation changes
    useEffect(() => {
        // Reset chat history to initial mock when activeConversation changes
        setChatHistory(initialChatHistory);
        setMessageInput('');
    }, [activeConversation, initialChatHistory]);

    const handleSendMessage = () => {
        if (messageInput.trim() === '') return;
        setChatHistory(prev => [...prev, { from: 'user', text: messageInput.trim() }]);
        setMessageInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div>
            <PageHeader title="Messages" subtitle="Your conversations with our talented artisans." />
            
            <div className="bg-white rounded-lg shadow-sm flex h-[70vh] overflow-hidden">
                {/* --- Left Column: Conversation List (Now Responsive) --- */}
                {/* This column is hidden on small screens (`hidden`) if a conversation is active, but always shown on medium screens and up (`md:flex`). */}
                <div className={`w-full md:w-1/3 border-r border-gray-200 flex-col ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(convo => (
                            <div 
                                key={convo.id} 
                                onClick={() => setActiveConversation(convo)}
                                className={`p-4 flex items-center cursor-pointer transition-colors ${activeConversation?.id === convo.id ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className={`h-12 w-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white ${activeConversation?.id === convo.id ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                                    {convo.avatar}
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-900 truncate">{convo.artisanName}</p>
                                        <p className="text-xs text-gray-500 flex-shrink-0 ml-2">{convo.timestamp}</p>
                                    </div>
                                    <p className={`text-sm truncate ${convo.unread > 0 ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
                                        {convo.lastMessage}
                                    </p>
                                </div>
                                {convo.unread > 0 && <div className="ml-2 w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Right Column: Chat Window (Now Responsive) --- */}
                {/* This column is hidden on small screens unless a conversation is active. */}
                <div className={`w-full md:w-2/3 flex-col ${activeConversation ? 'flex' : 'hidden md:flex'}`}>
                    {activeConversation ? (
                        <>
                            {/* Chat Header with Back Button for Mobile */}
                            <div className="p-4 border-b border-gray-200 flex items-center">
                                <button 
                                    onClick={() => setActiveConversation(null)}
                                    className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                </button>
                                <h3 className="text-lg font-semibold text-gray-800">{activeConversation.artisanName}</h3>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                {chatHistory.map((message, index) => (
                                    <div key={index} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`px-4 py-2 rounded-2xl max-w-md ${message.from === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-200">
                                <div className="relative">
                                    <textarea 
                                        placeholder="Type your message..." 
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pr-12 resize-none h-24" 
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        rows={3}
                                    />
                                    <button 
                                        onClick={handleSendMessage} 
                                        className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-indigo-600 hover:text-indigo-800"
                                        aria-label="Send message"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 items-center justify-center hidden md:flex">
                            <p className="text-gray-500">Select a conversation to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
