import React, { useState } from 'react';
import { useAuth } from '../components/AuthenticateContext'; 

const AuthPage = ({ userType }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userTypeDisplay = userType ? userType.charAt(0).toUpperCase() + userType.slice(1) : 'User';

  
  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      console.log('Logging in with:', { email, password });
      // Simulate a successful login and get a token
      const fakeToken = 'fake-auth-token';
      login(fakeToken);
    } else {
      console.log('Signing up with:', { name, email, password });
      // Simulate a successful signup
      const fakeToken = 'fake-auth-token';
      login(fakeToken);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white p-10 md:p-12 rounded-xl shadow-md">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLoginMode ? `Sign in as a ${userTypeDisplay}` : `Create your ${userTypeDisplay} account`}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* We only render the "Full Name" input if we are in Sign Up mode */}
          {!isLoginMode && (
            <div>
              <label htmlFor="name" className="sr-only">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              {isLoginMode ? 'Sign in' : 'Create Account'}
            </button>
          </div>
        </form>

        {/* This is the button that switches between Sign In and Sign Up */}
        <div className="text-center mt-6">
            <button onClick={switchModeHandler} className="font-medium text-sm text-blue-600 hover:text-blue-500">
                {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
