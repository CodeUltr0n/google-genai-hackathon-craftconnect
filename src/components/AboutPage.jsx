import React from 'react';
// 1. Import the new showcase card component.
import AIShowcaseCard from '../components/ai-showcase-card';
import OurStoryVideo from '../assets/videos/ArtVideo.mp4';// A reusable component for each team member card.
const TeamMemberCard = ({ name, role, imageUrl, description }) => (
  <div className="text-center bg-white p-6 rounded-lg shadow-lg w-72 flex-shrink-0">
    <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
    <h3 className="text-xl font-bold text-slate-800">{name}</h3>
    <p className="text-indigo-600 font-semibold mb-2">{role}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const AboutPage = () => {
  const teamMembers = [
    { name: 'Ketan Chokkara', role: 'Frontend Developer & UI/UX Designer', imageUrl: './images/Frontend-dev.jpeg', description: 'Responsible for architecting and building the user interface, ensuring a seamless and engaging experience for both artisans and customers.' },
    { name: 'Ruchitankshi Thite', role: 'Backend Developer & Database Architect', imageUrl: './images/Backend-dev.jpeg', description: 'Responsible for building the robust MERN stack backend, managing the MongoDB database, and creating the APIs that power the platform.' },
    { name: 'Sharveesh M', role: 'Flutter Developer & App Support', imageUrl: './images/App-dev.jpeg', description: 'Maintains and enhances the mobile application, ensuring smooth user experience and integrating new features.' },
  ];

  // Data for our new AI showcase section.
  const aiFeatures = [
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1-1m-6 0h.01M16 16v-4m0 4h-4m-6 0h.01M4 16l4.586-4.586a2 2 0 012.828 0L16 16"/></svg>, title: 'Description Enhancement', description: 'Generates compelling, story-driven product descriptions to attract more buyers and improve SEO visibility.' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"/></svg>, title: 'Smart Pricing', description: 'Analyzes market trends and competitor pricing to suggest optimal, data-driven pricing for every craft.' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg>, title: 'Marketing Strategy', description: 'Creates targeted social media campaigns, influencer collaborations, and promotions to boost an artisan\'s reach.' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a2 2 0 012-2h4l2 3h6a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"/></svg>, title: 'Image Correction & Optimization', description: 'Automatically enhances product images, improving clarity, brightness, and overall appeal.' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div
        className="bg-slate-800 text-white text-center py-20"
        style={{
          backgroundImage: 'url(/images/mission-bg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-2">Our Mission</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            To connect India's rich artisanal heritage with the world, empowering local craftspeople through a modern, AI-driven marketplace.
          </p>
        </div>
      </div>

      {/* Our Story Section - with updated text */}
      <div className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* <div>
            <img src="/images/art.jpg" alt="Artisans at work" className="rounded-lg shadow-xl" />
          </div> */}
          <div className="w-full max-w-lg">
            <div className="h-80 rounded-lg overflow-hidden">
              <video src={OurStoryVideo} autoPlay muted loop className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Video credit: Art By Sehgal – used for demo purposes only.
            </p>
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">The Story of Bharatiya Bazaar</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Bharatiya Bazaar was born from a deep appreciation for India's vibrant cultural tapestry. We saw a gap between talented artisans and a global audience eager for authentic, handmade goods.
            </p>
            {/* 2. This paragraph is now updated to explicitly mention Gen AI. */}
            <p className="text-gray-600 leading-relaxed">
              For the Google Gen AI Hackathon, we built more than an e-commerce site; we built a digital bridge. We leverage the power of Google's Generative AI to provide artisans with a personal marketing assistant, helping them thrive in the digital age by telling their unique stories.
            </p>
          </div>
        </div>
      </div>
      
      {/* 3. This is the new "Powered by Generative AI" section. */}
      <div className="bg-indigo-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Powered by Generative AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">Our AI Growth Assistant provides artisans with actionable insights to grow their business.</p>
            <div className="flex space-x-8 overflow-x-auto max-w-5xl mx-auto px-2">
                {aiFeatures.map(feature => (
                    <div key={feature.title} className="flex-shrink-0 w-72 h-full">
                      <AIShowcaseCard {...feature} />
                    </div>
                ))}
            </div>
          </div>
      </div>

{/* App Support Screenshots Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">App Support</h2>
          <p className='text-xl font-bold text-amber-600 mb-2'>Coming Soon </p>
          <div className="flex flex-wrap justify-center gap-6">
            <img src="/images/screenshot2.png" alt="App Screenshot 1" className="w-64 h-auto rounded-lg shadow-lg" />
            <img src="/images/screenshot1.png" alt="App Screenshot 2" className="w-64 h-auto rounded-lg shadow-lg" />
            <img src="/images/screenshot3.png" alt="App Screenshot 3" className="w-64 h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>


      {/* Team Name Display */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Delta Developers</h2>
          <p className="text-sm text-gray-600">Google Gen AI Hackathon Project 2025</p>
           {/* Google Logo */}
    <img 
      src="/images/google-logo.png" 
      alt="Google Logo" 
      className="mx-auto h-20 w-auto" 
    />
    </div>
    </div>

      {/* Meet the Team Section */}
      <div className="bg-white py-0.5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Meet the Team</h2>
          <div className="flex space-x-8 overflow-x-auto max-w-4xl mx-auto px-2">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
