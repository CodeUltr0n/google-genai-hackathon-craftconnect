import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- SVG Icons ---
const CloseIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const OptimizationIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const PricingIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>;
const MarketingIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.356a1.76 1.76 0 013.417-.592zM11 5.882V5.269a2.35 2.35 0 014.7.001v.613m0 0l2.147 6.356a1.76 1.76 0 01-3.417.592l-2.147-6.356a1.76 1.76 0 013.417-.592z" /></svg>;

// --- Tab Content Components ---
const OptimizationTab = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyzeOptimization = () => {
        setIsLoading(true);
        setTimeout(() => {
            const mockData = [
                { title: "Improve Product Photos", impact: "High Impact", description: "Your vase photos need better lighting.", suggestion: "Add lifestyle photos showing the vase in use." },
                { title: "Enhance Product Descriptions", impact: "Medium Impact", description: "Add details about materials and dimensions.", suggestion: "Include a story about the craftsmanship." },
                { title: "Optimize Keywords", impact: "High Impact", description: "Add trending keywords like 'boho decor' and 'handcrafted ceramics'.", suggestion: "Update product tags and titles" }
            ];
            setRecommendations(mockData);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div>
            <div className="text-center mb-6">
                <button onClick={handleAnalyzeOptimization} disabled={isLoading} className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors">
                    {isLoading ? 'Analyzing Listings...' : 'Analyze Product Listings'}
                </button>
            </div>
            {isLoading ? (
                <div className="text-center text-gray-500">Generating optimization report...</div>
            ) : (
                <div className="space-y-4">
                    {recommendations.map((rec, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-800">{rec.title}</h4>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rec.impact === "High Impact" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{rec.impact}</span>
                            </div>
                            <p className="text-sm text-gray-600">{rec.description}</p>
                            <button className="text-sm text-blue-600 hover:underline mt-1 block">{rec.suggestion} →</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PricingTab = () => {
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyzePricing = () => {
        setIsLoading(true);
        setTimeout(() => {
            const mockData = { currentPrice: 2500, suggestedPrice: 2950, confidence: 87 };
            setAnalysis(mockData);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div>
            <div className="text-center mb-6">
                <button onClick={handleAnalyzePricing} disabled={isLoading} className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors">
                    {isLoading ? 'Analyzing Market...' : 'Analyze Market Pricing'}
                </button>
            </div>
            {isLoading ? (
                <div className="text-center text-gray-500">Generating pricing analysis...</div>
            ) : analysis && (
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-gray-800">Market Analysis</h4>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">{analysis.confidence}% Confidence</span>
                    </div>
                    <p className="text-sm text-gray-600">Your product is priced below the market average.</p>
                    <div className="mt-2 flex items-center justify-between">
                         <div>
                            <span className="text-sm text-gray-500">Current: ₹{analysis.currentPrice.toLocaleString()}</span>
                            <p className="text-xl font-bold text-green-600">Suggested: ₹{analysis.suggestedPrice.toLocaleString()}</p>
                        </div>
                        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Update Price →</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const MarketingTab = () => {
    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateIdeas = () => {
        setIsLoading(true);
        setTimeout(() => {
            const mockData = [
                { platform: "Instagram", idea: "Post behind-the-scenes content of your pottery process.", impact: "+45% Engagement" },
                { platform: "Seasonal", idea: "Create a Valentine's Day collection featuring your ceramics.", impact: "Launch in 2 weeks" },
                { platform: "Customer Reviews", idea: "Reach out to recent customers for reviews. You have a 92% satisfaction rate.", impact: "Start follow-up campaign" }
            ];
            setIdeas(mockData);
            setIsLoading(false);
        }, 1500);
    };

    return (
         <div>
            <div className="text-center mb-6">
                <button onClick={handleGenerateIdeas} disabled={isLoading} className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors">
                    {isLoading ? 'Generating Ideas...' : 'Generate Marketing Ideas'}
                </button>
            </div>
            {isLoading ? (
                <div className="text-center text-gray-500">Brainstorming marketing strategies...</div>
            ) : (
                <div className="space-y-4">
                    {ideas.map((idea, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-gray-800">{idea.platform} Strategy</h4>
                                 <p className="text-sm font-bold text-green-600">{idea.impact}</p>
                            </div>
                            <p className="text-sm text-gray-600">{idea.idea}</p>
                            <button className="text-sm text-blue-600 hover:underline mt-1 block">Start Campaign →</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Modal ---
const AiGrowthAssistantModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('optimization');
  const navigate = useNavigate();

  const handleDoneClick = () => {
    navigate('/seller-dashboard');
    onClose();
  };

  const tabs = [
    { id: 'optimization', name: 'Optimization', icon: <OptimizationIcon /> },
    { id: 'pricing', name: 'Pricing', icon: <PricingIcon /> },
    { id: 'marketing', name: 'Marketing', icon: <MarketingIcon /> },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between pl-6 pr-4 py-4 border-b">
          <div className="flex items-center space-x-3">
             <div className="bg-purple-100 p-2 rounded-lg"><svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l-.707-.707M12 21v-1m0-16a9 9 0 11-9 9 9 9 0 019-9z" /></svg></div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Growth Assistant</h2>
              <p className="text-sm text-gray-500">Personalized recommendations to boost your sales</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"><CloseIcon /></button>
        </div>
        
        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-gray-200">
            <nav className="flex space-x-4">
                {tabs.map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 pb-3 px-1 border-b-2 font-semibold text-sm transition-colors ${ activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' }`}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                    </button>
                ))}
            </nav>
        </div>

        {/* Content */}
        <div className="px-6 py-8 min-h-[250px]">
            {activeTab === 'optimization' && <OptimizationTab />}
            {activeTab === 'pricing' && <PricingTab />}
            {activeTab === 'marketing' && <MarketingTab />}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
          <p className="text-xs text-gray-500">AI recommendations are updated daily.</p>
          <button onClick={handleDoneClick} className="px-5 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg hover:bg-gray-900">Done</button>
        </div>
      </div>
    </div>
  );
};

export default AiGrowthAssistantModal;
