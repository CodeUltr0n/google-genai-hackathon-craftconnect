import React, { useState, useEffect, useRef } from 'react';

// Mock products data
const products = [
  {
    id: 1,
    name: 'Mysore Silk Saree',
    category: 'Saree',
    region: 'Mysore',
    regionTag: 'Karnataka',
    artisan: 'Lakshmi Devi',
    craftTag: 'Silk weaving',
    price: 12000,
    stock: 5,
    description: 'A beautiful Mysore silk saree with traditional zari work.'
  },
  {
    id: 2,
    name: 'Kutch Embroidery Shawl',
    category: 'Shawl',
    region: 'Kutch',
    regionTag: 'Gujarat',
    artisan: 'Ramesh Patel',
    craftTag: 'Embroidery',
    price: 8000,
    stock: 0,
    description: 'Hand-embroidered shawl from the Kutch region.'
  },
  {
    id: 3,
    name: 'Channapatna Wooden Toy',
    category: 'Toy',
    region: 'Channapatna',
    regionTag: 'Karnataka',
    artisan: 'Suresh Kumar',
    craftTag: 'Wood turning',
    price: 500,
    stock: 15,
    description: 'Colorful traditional wooden toy made with natural dyes.'
  },
  {
    id: 4,
    name: 'Blue Pottery Vase',
    description: 'A beautiful, hand-painted ceramic vase from Jaipur, known for its vibrant blue dye derived from cobalt oxide. A perfect centerpiece for any room.',
    price: 2500,
    stock: 15,
    imageUrl: '/images/Blue pottery.jpeg',
    region: 'North India',
    artisan: 'Ravi Kumar',
    category: 'Pottery',
    regionTag: 'Rajasthan'
  },
  {
    id: 5,
    name: 'Bandhani Silk Dupatta',
    description: 'An elegant silk dupatta featuring the traditional tie-dye Bandhani art from Rajasthan. Made with pure silk and natural dyes.',
    price: 3200,
    stock: 8,
    imageUrl: '/images/Bandhani Silk Dupatta.jpeg',
    region: 'North India',
    artisan: 'Meena Sharma',
    category: 'Textiles',
    regionTag: 'Rajasthan'
  },
  {
    id: 6,
    name: 'Chikankari Kurta',
    description: 'A timeless cotton kurta with delicate, hand-embroidered Chikankari work from Lucknow. Perfect for casual and formal occasions.',
    price: 2800,
    stock: 22,
    imageUrl: '/images/Chikankari Kurta.jpeg',
    region: 'North India',
    artisan: 'Fatima Khan',
    category: 'Apparel',
    regionTag: 'Uttar Pradesh'
  },
  {
    id: 7,
    name: 'Kutch Mirror Work Bag',
    description: 'A vibrant, handcrafted bag featuring the iconic Kutch embroidery and mirror work from Gujarat. A unique accessory that tells a story.',
    price: 1800,
    stock: 0,
    imageUrl: '/images/Kutch Mirror Work Bag.jpeg',
    region: 'West India',
    artisan: 'Kiran Patel',
    category: 'Accessories',
    regionTag: 'Gujarat'
  },
  {
    id: 8,
    name: 'Warli Art Canvas',
    description: 'Traditional Warli art depicting rural life and nature using simple geometric patterns on canvas.',
    price: 4500,
    stock: 10,
    imageUrl: '/images/Warli Art Canvas.jpeg',
    region: 'West India',
    artisan: 'Suresh Kumar',
    category: 'Art',
    regionTag: 'Maharashtra',
    craftTag: 'Warli Art'
  },
  {
    id: 9,
    name: 'Kantha Work Saree',
    description: 'A graceful saree adorned with intricate Kantha embroidery, showcasing folk motifs and storytelling stitches.',
    price: 6800,
    stock: 12,
    imageUrl: '/images/Kantha Work Saree.jpeg',
    region: 'East India',
    artisan: 'Priya Das',
    category: 'Apparel',
    regionTag: 'West Bengal',
    craftTag: 'Kantha'
  },
  {
    id: 10,
    name: 'Dokra Art Piece',
    description: 'Handcrafted Dokra metal art piece created using ancient lost-wax casting technique, reflecting tribal heritage.',
    price: 3500,
    stock: 5,
    imageUrl: '/images/Dokra Art Piece.jpeg',
    region: 'East India',
    artisan: 'Anil Mahto',
    category: 'Art',
    regionTag: 'West Bengal',
    craftTag: 'Dokra'
  },
  {
    id: 11,
    name: 'Kanjeevaram Silk',
    description: 'Luxurious Kanjeevaram silk saree woven with rich zari patterns, celebrated for its durability and sheen.',
    price: 22000,
    stock: 7,
    imageUrl: '/images/Kanjeevaram Silk.jpeg',
    region: 'South India',
    artisan: 'Lakshmi Murthy',
    category: 'Apparel',
    regionTag: 'Tamil Nadu',
    craftTag: 'Kanjeevaram'
  }
];

// This component is now fully self-contained for the demo.
const ChatModal = ({ contextData, initialMessage, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: initialMessage }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // This is our new function to simulate a response from the Google AI.
  const getSimulatedAIResponse = (question, contextData) => {
  const lowerQ = question.toLowerCase();

  // Find mentioned products
  const mentionedProducts = products.filter(p =>
    lowerQ.includes(p.name.toLowerCase())
  );

  // Multi-product comparison with recommendation
  if (mentionedProducts.length >= 2) {
    // Build comparison details
    const comparisons = mentionedProducts.map(p => {
      return `• "${p.name}" is a ${p.category.toLowerCase()} from ${p.regionTag}, crafted by ${p.artisan}${p.craftTag ? `, showcasing the ${p.craftTag} craft` : ''}. Priced at ₹${p.price}, ${p.stock > 0 ? `with ${p.stock} in stock.` : 'currently out of stock.'}`;
    }).join('\n');

    // Check if user asked for "better" or "recommend"
    if (lowerQ.includes('better') || lowerQ.includes('recommend') || lowerQ.includes('which should i buy')) {
      // Simple recommendation logic: prefer available products, then lower price
      const availableProducts = mentionedProducts.filter(p => p.stock > 0);
      let recommendation;
      if (availableProducts.length > 0) {
        // Choose the one with lowest price among available
        const best = availableProducts.reduce((a, b) => (a.price <= b.price ? a : b));
        recommendation = `Based on availability and price, I would recommend "${best.name}". It is in stock and offers great value for its craftsmanship.`;
      } else {
        recommendation = `All the mentioned products are currently out of stock. You might want to check back later!`;
      }
      return `Here's a comparison of the products:\n${comparisons}\n\n${recommendation}`;
    }

    return `Here's a comparison of the products you mentioned:\n${comparisons}`;
  }

  // Default single product handling
  const product = mentionedProducts[0] || products.find(p => p.id === contextData.productId);
  if (!product) return "Sorry, I couldn't find details for this product.";

  // Price or stock
  if (lowerQ.includes('price') || lowerQ.includes('cost') || lowerQ.includes('value')) {
    return `The price of "${product.name}" is ₹${product.price}. ${product.stock > 0 ? `We currently have ${product.stock} in stock.` : 'Unfortunately, it is out of stock at the moment.'}`;
  }

  // Artisan or origin
  if (lowerQ.includes('artisan') || lowerQ.includes('who made') || lowerQ.includes('craftsman') || lowerQ.includes('region') || lowerQ.includes('origin')) {
    return `"${product.name}" is handcrafted by ${product.artisan} from ${product.region} (${product.regionTag}). It showcases the best of local craftsmanship.`;
  }

  // Description or craft details
  if (lowerQ.includes('describe') || lowerQ.includes('details') || lowerQ.includes('material') || lowerQ.includes('technique')) {
    return `${product.description} This ${product.category.toLowerCase()} exemplifies the traditional ${product.craftTag ? product.craftTag : 'craft'} techniques of ${product.regionTag}.`;
  }

  // Category / craft type / general info
if (product && (lowerQ.includes('type') || lowerQ.includes('category') || lowerQ.includes('craft') || lowerQ.includes('about'))) {
  return `This is a "${product.category}" item${product.craftTag ? `, specifically showcasing the "${product.craftTag}" craft from ${product.regionTag}` : ''}. ${product.description}`;
}

  // Default fallback
  return `This is "${product.name}", a wonderful example of traditional Indian craftsmanship. It comes from ${product.regionTag} and was created by the skilled artisan ${product.artisan}. Could you tell me what you'd like to know about it?`;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: trimmedInput }]);
    setUserInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getSimulatedAIResponse(trimmedInput, contextData);
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    // The main container for the chat modal with smooth animation
    <div className="fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-[70vh] z-40 chat-modal">
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-sm">AI Assistant</h3>
        </div>
        <button 
          onClick={onClose} 
          aria-label="Close chat" 
          className="text-gray-300 hover:text-white transition-colors duration-200 w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-700"
        >
          ×
        </button>
      </header>
      
      {/* The message display area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${msg.sender === 'user' 
              ? 'bg-blue-600 text-white rounded-br-sm' 
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* The user input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask about this craft..."
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={!userInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatModal;
