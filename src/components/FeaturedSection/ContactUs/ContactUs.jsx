import React from 'react';
import { FaPhoneAlt, FaEnvelopeOpenText } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <section id='contactUs' className="bg-gradient-to-br from-red-50 via-white to-red-100 py-20 px-5 md:px-20">
            <h2 className="text-4xl font-extrabold text-center text-red-700 mb-14">
                Get in Touch
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <form className="bg-white p-10 shadow-xl rounded-2xl space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Message
                        </label>
                        <textarea
                            rows="5"
                            placeholder="Your message..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Details */}
                <div className="p-10 bg-white rounded-2xl shadow-md space-y-8 border border-red-100">
                    {/* Primary Phone */}
                    <div className="flex items-start gap-4">
                        <FaPhoneAlt className="text-red-600 text-xl mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Phone</h4>
                            <p className="text-gray-700">+880-1796343549</p>
                            <p className="text-sm text-gray-500">
                                Available 24/7 for emergencies
                            </p>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="flex items-start gap-4">
                        <FaPhoneAlt className="text-red-600 text-xl mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Emergency Contact</h4>
                            <p className="text-gray-700">+880-1600112233</p>
                            <p className="text-sm text-gray-500">
                                Urgent blood request line (direct)
                            </p>
                        </div>
                    </div>

                    {/* Email 1 */}
                    <div className="flex items-start gap-4">
                        <FaEnvelopeOpenText className="text-red-600 text-xl mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Email</h4>
                            <p className="text-gray-700">khbidyut31@gmail.com</p>
                            <p className="text-sm text-gray-500">
                                We usually reply within 1 hour
                            </p>
                        </div>
                    </div>

                    {/* Email 2 */}
                    <div className="flex items-start gap-4">
                        <FaEnvelopeOpenText className="text-red-600 text-xl mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg">Support Email</h4>
                            <p className="text-gray-700">support@bloodconnect.org</p>
                            <p className="text-sm text-gray-500">
                                For general inquiries & assistance
                            </p>
                        </div>
                    </div>

                    <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-4 rounded-lg">
                        <strong>Emergency?</strong> Don’t hesitate to call us directly.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
