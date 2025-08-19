import React from 'react';
import { FaHeartbeat, FaMobileAlt, FaUserShield, FaGlobeAsia } from 'react-icons/fa';

const FeaturedSection = () => {
    return (
        <section className="bg-[#FFF5F5] py-16 px-4 sm:px-8 md:px-16 lg:px-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#B71C1C] mb-12">
                Why BloodConnect Stands Out
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Feature 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#FFCDD2] hover:border-[#C62828]">
                    <div className="flex justify-center text-[#C62828] text-4xl mb-4">
                        <FaHeartbeat />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Real-Time Requests</h3>
                    <p className="text-sm text-gray-600 text-center">
                        Respond instantly to urgent blood needs in your city or nearby.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#FFCDD2] hover:border-[#C62828]">
                    <div className="flex justify-center text-[#C62828] text-4xl mb-4">
                        <FaMobileAlt />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Mobile-Friendly</h3>
                    <p className="text-sm text-gray-600 text-center">
                        Access BloodConnect easily from any device—anytime, anywhere.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#FFCDD2] hover:border-[#C62828]">
                    <div className="flex justify-center text-[#C62828] text-4xl mb-4">
                        <FaUserShield />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Verified Donors</h3>
                    <p className="text-sm text-gray-600 text-center">
                        All blood donors go through strict verification for safety and trust.
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-[#FFCDD2] hover:border-[#C62828]">
                    <div className="flex justify-center text-[#C62828] text-4xl mb-4">
                        <FaGlobeAsia />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Nationwide Coverage</h3>
                    <p className="text-sm text-gray-600 text-center">
                        BloodConnect operates in major cities and remote areas alike.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
