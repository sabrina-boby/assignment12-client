import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTint
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#eed0d0f5] mt-[17px] text-gray-700 pt-16 pb-6 px-6 md:px-20 border-t border-red-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

        {/* Logo & Message */}
        <div>
          <div className="flex items-center gap-2 mb-4 font-bold text-2xl">
            <FaTint className="text-[#E53935] text-3xl" />
            <span className="font-bold text-[#E53935]">
              Blood<span className="text-[#39ab56]">Connect</span>
            </span>
          </div>
          <p className="text-sm">
            We believe every drop counts. BloodConnect connects generous donors with those in urgent need. Together, we save lives.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#E53935] mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-[#E53935] transition">Home</a></li>
            <li><a href="#how" className="hover:text-[#E53935] transition">How It Works</a></li>
            <li><a href="#contactUs" className="hover:text-[#E53935] transition">ContactUs</a></li>
            <li><a href="#faq" className="hover:text-[#E53935] transition">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#E53935] mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center underline text-blue-500 gap-2">
              <FaEnvelope className="text-[#E53935]" />
              khbidyut31@gmail.com
            </li>
            <li className="flex items-center underline text-blue-500 gap-2">
              <FaPhoneAlt className="text-[#E53935] " />
              +880-1796343549
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#E53935]" />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-lg font-semibold text-[#E53935] mb-3">Stay Connected with Lead Developer</h3>
          <p className="text-sm mb-3">Follow us on social platforms for updates and stories.</p>
          <div className="flex space-x-3">
            <a target='_blank' href="https://www.facebook.com/Kausarhossainbidyut" className="bg-[#fdecea] text-[#E53935] p-2 rounded-full hover:bg-[#fbd1cd] transition">
              <FaFacebookF />
            </a>
            <a target='_blank' href="https://x.com/khbidyut31" className="bg-[#fdecea] text-[#E53935] p-2 rounded-full hover:bg-[#fbd1cd] transition">
              <FaTwitter />
            </a>
            <a target='_blank' href="https://www.instagram.com/kausarhossainbidyut/" className="bg-[#fdecea] text-[#E53935] p-2 rounded-full hover:bg-[#fbd1cd] transition">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-[13px] text-gray-500">
        © {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
