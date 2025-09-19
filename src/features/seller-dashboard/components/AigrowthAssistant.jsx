import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Enhanced SVG Icons ---
const CloseIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const OptimizationIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zM12 15.4l-3.76 2-1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 3.71 4.38.38-3.32 2.88-1 4.28L12 15.4z" /></svg>;
const PricingIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15z" /></svg>;
const MarketingIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>;
const ArrowRightIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const BulbIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17h8v-2.3c1.8-1.2 3-3.3 3-5.7 0-3.9-3.1-7-7-7z" /></svg>;

// --- Tab Content Components ---
// Default recommendations outside of state
const defaultRecommendations = [
    { 
        title: "Improve Product Photos", 
        impact: "High Impact", 
        description: "Your ceramic vase photos could benefit from better lighting. Consider natural light photography.", 
        suggestion: "Add lifestyle photos showing the vase in use",
        expanded: false
    },
    { 
        title: "Enhance Product Descriptions", 
        impact: "Medium Impact", 
        description: "Add more details about materials, dimensions, and care instructions.", 
        suggestion: "Include story about craftsmanship",
        expanded: false
    },
    { 
        title: "Optimize Keywords", 
        impact: "High Impact", 
        description: "Add trending keywords to improve discoverability.", 
        suggestion: "Update SEO keywords",
        expanded: false
    }
];

const OptimizationTab = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyzeOptimization = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setRecommendations(defaultRecommendations);
        }, 2000);
    };

    const toggleExpanded = (index) => {
        setRecommendations(prev => 
            prev.map((rec, i) => i === index ? { ...rec, expanded: !rec.expanded } : rec)
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Optimization</h2>
                <p className="text-gray-600 text-sm mb-6">AI-powered suggestions to improve your product listings</p>
                <button
                    onClick={handleAnalyzeOptimization}
                    className="px-4 py-2 mb-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </button>
            </div>

            <div className="space-y-4">
                {recommendations.map((rec, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        rec.impact === "High Impact" 
                                            ? "bg-red-50 text-red-700 border border-red-200" 
                                            : "bg-amber-50 text-amber-700 border border-amber-200"
                                    }`}>
                                        {rec.impact}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                                
                                <button 
                                    onClick={() => toggleExpanded(index)}
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                                >
                                    <span>{rec.suggestion}</span>
                                    <ArrowRightIcon />
                                </button>
                            </div>
                            
                            <button 
                                className="ml-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                onClick={() => console.log('Apply recommendation:', rec.title)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PricingTab = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const pricingData = {
        currentPrice: 2500,
        suggestedPrice: 2950,
        confidence: 87,
        competitorAvg: 2850,
        priceHistory: [2400, 2450, 2500],
        marketTrend: 'increasing'
    };

    const handleAnalyzePricing = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setAnalysis(pricingData);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Pricing</h2>
                <p className="text-gray-600 text-sm mb-6">Optimize your pricing strategy with market insights</p>
                <button
                    onClick={handleAnalyzePricing}
                    className="px-4 py-2 mb-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </button>
            </div>

            {analysis && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">Market Price Analysis</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Your product is priced below the market average. Consider increasing price to maximize revenue.
                            </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium">
                            {analysis.confidence}% Confidence
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Current Price</p>
                            <p className="text-2xl font-bold text-gray-900">₹{analysis.currentPrice.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-1">Suggested Price</p>
                            <p className="text-2xl font-bold text-green-600">₹{analysis.suggestedPrice.toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Market Average</span>
                            <span className="font-medium">₹{analysis.competitorAvg.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-gray-600">Potential Revenue Increase</span>
                            <span className="font-medium text-green-600">+₹{(analysis.suggestedPrice - analysis.currentPrice).toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <button 
                        className="w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        onClick={() => console.log('Update pricing strategy')}
                    >
                        Update Pricing Strategy
                    </button>
                </div>
            )}
        </div>
    );
};

const defaultCampaigns = [
    {
        title: "Instagram Content Strategy",
        description: "Post behind-the-scenes content of your pottery process to increase engagement.",
        impact: "+45% Engagement",
        type: "Social Media",
        timeframe: "Start immediately"
    },
    {
        title: "Customer Review Campaign", 
        description: "Reach out to recent customers for reviews. You have a 92% satisfaction rate.",
        impact: "Boost credibility",
        type: "Reviews",
        timeframe: "2-3 days"
    },
    {
        title: "Seasonal Collection Launch",
        description: "Create a Valentine's Day collection featuring your ceramics and romantic themes.",
        impact: "New revenue stream",
        type: "Product Launch", 
        timeframe: "Launch in 2 weeks"
    }
];

const MarketingTab = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const handleAnalyzeMarketing = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setCampaigns(defaultCampaigns);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Marketing</h2>
                <p className="text-gray-600 text-sm mb-6">Targeted strategies to boost your visibility and sales</p>
                <button
                    onClick={handleAnalyzeMarketing}
                    className="px-4 py-2 mb-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </button>
            </div>

            {campaigns.length > 0 && (
                <div className="space-y-4">
                    {campaigns.map((campaign, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                                        <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-medium">
                                            {campaign.type}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                                    
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <BulbIcon />
                                            <span className="text-green-600 font-medium">{campaign.impact}</span>
                                        </div>
                                        <div className="text-gray-500">
                                            {campaign.timeframe}
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    className="ml-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                    onClick={() => console.log('Start campaign:', campaign.title)}
                                >
                                    Apply
                                </button>
                            </div>
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
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l-.707-.707M12 21v-1m0-16a9 9 0 11-9 9 9 9 0 019-9z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Growth Assistant</h1>
              <p className="text-gray-600">Personalized recommendations to boost your sales</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <CloseIcon />
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="px-8 py-4 bg-white border-b border-gray-200">
          <nav className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {tabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.id 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-blue-600' : ''}>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="px-8 py-8 bg-gray-50 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'optimization' && <OptimizationTab />}
          {activeTab === 'pricing' && <PricingTab />}
          {activeTab === 'marketing' && <MarketingTab />}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-white border-t border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <BulbIcon />
            <span>AI recommendations update daily based on market trends</span>
          </div>
          <button 
            onClick={handleDoneClick} 
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiGrowthAssistantModal;
