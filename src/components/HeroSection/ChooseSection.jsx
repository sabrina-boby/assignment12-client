import React from 'react';
import { FaHeart, FaMapMarkerAlt, FaShieldAlt, FaBell, FaAward, FaUsers } from 'react-icons/fa';

const ChooseSection = () => {
    return (
        <div className="py-20 bg-gray-50 px-6 md:px-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Why Choose BloodConnect?</h2>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
                Our platform makes blood donation simple, safe, and impactful. Join thousands
                of donors already making a difference.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Easy Registration */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-red-50">
                    <FaHeart className="text-pink-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Registration</h3>
                    <p className="text-gray-500">Quick and simple donor registration process with medical verification.</p>
                </div>

                {/* Location-Based Matching */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-50">
                    <FaMapMarkerAlt className="text-blue-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Location-Based Matching</h3>
                    <p className="text-gray-500">Find nearby donors and blood banks for urgent requirements.</p>
                </div>

                {/* Verified Donors */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-green-50">
                    <FaShieldAlt className="text-green-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Donors</h3>
                    <p className="text-gray-500">All donors are medically verified for safe blood donation.</p>
                </div>

                {/* Real-time Requests */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-50">
                    <FaBell className="text-purple-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Requests</h3>
                    <p className="text-gray-500">Instant notifications for urgent blood donation requests.</p>
                </div>

                {/* Recognition System */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-yellow-50">
                    <FaAward className="text-yellow-500 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Recognition System</h3>
                    <p className="text-gray-500">Earn badges and recognition for your life-saving contributions.</p>
                </div>

                {/* Community Support */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-pink-50">
                    <FaUsers className="text-pink-400 text-3xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Support</h3>
                    <p className="text-gray-500">Join a community of heroes dedicated to saving lives.</p>
                </div>

            </div>
        </div>
    );
};

export default ChooseSection;
