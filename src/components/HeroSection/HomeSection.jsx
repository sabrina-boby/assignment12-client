import React from 'react';
import { FaUsers, FaHeartbeat, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const stats = [
    {
        icon: <FaUsers className="text-red-600 text-4xl" />,
        count: "12,450+",
        label: "Registered Donors"
    },
    {
        icon: <FaHeartbeat className="text-pink-500 text-4xl" />,
        count: "8,320+",
        label: "Lives Saved"
    },
    {
        icon: <FaMapMarkerAlt className="text-purple-600 text-4xl" />,
        count: "491+",
        label: "Upazilas Covered"
    },
    {
        icon: <FaClock className="text-blue-600 text-4xl" />,
        count: "<2hrs",
        label: "Response Time"
    }
];

const HomeSection = () => {
    return (
        <div className="bg-[#ffffff] py-[66px] px-6 md:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-red-50 shadow-md hover:shadow-lg"
                    >
                        <div className="flex justify-center mb-3">
                            {stat.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
                        <p className="text-gray-500">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HomeSection;
