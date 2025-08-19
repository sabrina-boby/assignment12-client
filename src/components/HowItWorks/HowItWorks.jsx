import React from 'react';
import { FaTint, FaUserPlus, FaSearch, FaHandsHelping } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <FaUserPlus className="text-4xl text-[#EF4444]" />,
    title: "Register as Donor",
    desc: "Sign up with your blood group and location to be ready to help those in need."
  },
  {
    icon: <FaSearch className="text-4xl text-[#EF4444]" />,
    title: "Find or Request",
    desc: "Search for donors or make a request that instantly reaches those nearby."
  },
  {
    icon: <FaHandsHelping className="text-4xl text-[#EF4444]" />,
    title: "Connect & Donate",
    desc: "Communicate securely with donors and donate blood where it's most needed."
  },
  {
    icon: <FaTint className="text-4xl text-[#EF4444]" />,
    title: "Save a Life",
    desc: "Every drop matters. Become someone’s hero by saving lives."
  }
];

const HowItWorks = () => {
  return (
    <section id='how' className="bg-[#FEF2F2] py-20 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-[#B91C1C] mb-16">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white border border-red-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:bg-[#FEE2E2] transition duration-300"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-lg font-semibold text-[#B91C1C] mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
