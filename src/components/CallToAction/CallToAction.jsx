import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

const CallToAction = () => {
  return (
    <section className="relative bg-gradient-to-tr from-[#fef2f2] to-[#ffe5e5] py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-20 rounded-3xl mx-3 sm:mx-6 md:mx-24 my-8 sm:my-10 md:my-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Decorative blur background */}
      <div className="absolute -top-10 -left-10 w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug sm:leading-tight tracking-tight">
          Ready to Save Lives?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-3 sm:mt-4 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
          Every blood donation can save up to three lives. Join our community of heroes and make a difference today.
        </p>

        <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center flex-wrap gap-3 sm:gap-4 md:gap-5">
          <Link to={"/registration"} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg">
            <FaHeart className="text-white" /> Register as Donor
          </Link>

          <Link to={"donation_Requests"} className="bg-white cursor-pointer text-red-500 border border-red-200 hover:bg-red-100 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-md">
            View Blood Requests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
