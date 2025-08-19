import React, { useEffect, useState } from "react";
import { FaTint, FaEye, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaTint as BloodDropIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
   const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://project-server1.vercel.app/api/pending-donation-requests")
      .then(res => {
        // response handle করুন
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        // error handle করুন
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Date formatting function
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const dateObj = new Date(isoString);
    return dateObj.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Time formatting function
  const formatTime = (isoString) => {
    if (!isoString) return "N/A";
    const dateObj = new Date(isoString);
    return dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-red-700 mb-12 flex items-center justify-center gap-3 select-none">
        <FaTint className="text-red-600 animate-pulse text-4xl" />
        Blood Donation Requests
      </h1>

      {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-lg font-semibold"><span className="loading loading-spinner loading-xl"></span></div>
        )}
      {/* Requests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No pending donation requests available.
          </p>
        ) : (
          requests.map((req) => (
            <div
              key={req._id}
              className="border border-red-300 rounded-3xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 bg-white p-6 flex flex-col justify-between"
            >
              <div>
                {/* Recipient Name */}
                <h3 className="text-2xl font-semibold text-red-700 mb-4 truncate">
                  {req.name}
                </h3>

                {/* Location */}
                <p className="text-gray-700 flex items-center gap-2 mb-3 font-medium">
                  <FaMapMarkerAlt className="text-red-600" />
                  <span>{req.district}, {req.upazila}</span>
                </p>

                {/* Blood Group */}
                <p className="text-red-600 font-semibold text-lg mb-4 flex items-center gap-2">
                  <BloodDropIcon />
                  Blood Group: <span className="uppercase">{req.bloodGroup}</span>
                </p>

                {/* Date */}
                <p className="text-gray-600 mb-2 flex items-center gap-2">
                  <FaCalendarAlt />
                  Date: <span className="font-medium">{formatDate(req.createdAt)}</span>
                </p>

                {/* Time */}
                <p className="text-gray-600 flex items-center gap-2">
                  <FaClock />
                  Time: <span className="font-medium">{formatTime(req.createdAt)}</span>
                </p>
              </div>

              {/* View Details Button */}
              <Link
                to={`/donation-requests/${req._id}`}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-white font-semibold hover:bg-red-700 shadow-md hover:shadow-lg transition"
                aria-label={`View details for ${req.name}`}
              >
                <FaEye />
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationRequests;
