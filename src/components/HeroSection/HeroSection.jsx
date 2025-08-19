import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center ">
      <div className="w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row bg-white">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-snug">
            Save Lives Through <span className="text-red-600">Blood Donation</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl">
            Connect with blood donors in your area and help save lives.
            Join our community of heroes making a difference one donation at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={"/registration"}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition duration-300"
            >
              ❤️ Become a Donor
            </Link>
            <Link
              to={"/donor_Search"}
              className="border-2 border-red-600 text-red-600 hover:bg-red-100 font-semibold py-3 px-6 rounded-lg text-center transition duration-300"
            >
              Find Blood Donors
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-[412px]">
          <img
            src="https://images.unsplash.com/photo-1643207771058-8fb65a2330c9"
            alt="Blood donation"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
