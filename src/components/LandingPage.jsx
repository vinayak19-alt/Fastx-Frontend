import React from 'react';
import BusImage from '../assets/bus_image_background.jpg'; // Import image from your assets

const LandingPage = () => {
  return (

  <div className="relative w-screen h-[400px]">
  <img 
    src={BusImage} 
    alt="Bus background" 
    className="w-full h-full object-cover"
  />
  <div className="relative min-h-screen flex items-center justify-center bg-white text-white">
      {/* Background Bus Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={BusImage} 
          alt="Bus background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-900 opacity-70"></div>
        {/* Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold mb-4">FastX</h1>
          <h2 className="text-3xl font-semibold mb-2">Welcome to FastX!</h2>
          <p className="text-lg mb-4">Your journey begins with a single click</p>
          <p className="text-lg mb-6">Want to book tickets? Sign in or create an account below.</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300">
              Sign In
            </button>
            <button className="bg-white text-purple-900 border-2 border-purple-900 font-bold py-3 px-8 rounded-full hover:bg-purple-800 hover:text-white transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LandingPage;
