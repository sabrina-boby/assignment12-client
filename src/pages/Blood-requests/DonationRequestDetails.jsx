import React, { useContext, useEffect, useState } from "react";
import {
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaEnvelope,
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaCommentDots,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const DonationRequestDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://project-server1.vercel.app/api/donation-requests/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error("Failed to load donation request", err);
      }
    };
    fetchData();
  }, [id]);

  const handleConfirmDonation = async () => {
    try {
      await axios.patch(`https://project-server1.vercel.app/api/donation-requests/${id}`, {
        status: "inprogress",
        donorName: user.displayName || user.name || "Anonymous",
        donorEmail: user.email,
      });

      Swal.fire({
        icon: "success",
        title: "Donation confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });

      setShowModal(false);
      setRequest({ ...request, donationStatus: "inprogress" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to confirm donation",
        text: err.message || "Please try again later",
      });
    }
  };

  if (!request) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white shadow-md rounded-3xl mt-10 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <h1 className="text-3xl font-bold text-red-600 mb-6 flex items-center gap-2 sm:text-4xl md:text-5xl">
        <FaTint /> Blood Donation Request Details
      </h1>

      <div
        className="grid gap-4 text-gray-700 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
      >
        <DetailRow icon={<FaUser />} label="Requester" value={request.requesterName} />
        <DetailRow icon={<FaEnvelope />} label="Email" value={request.requesterEmail} />
        <DetailRow icon={<FaUser />} label="Recipient Name" value={request.recipientName || request.name} />
        <DetailRow
          icon={<FaMapMarkerAlt />}
          label="Location"
          value={`${request.district}, ${request.upazila}`}
        />
        <DetailRow icon={<FaHospital />} label="Hospital" value={request.hospital || request.hospitalName} />
        <DetailRow icon={<FaMapMarkerAlt />} label="Address" value={request.address || request.fullAddress} />
        <DetailRow icon="🩸" label="Blood Group" value={request.bloodGroup} />
        <DetailRow icon={<FaCalendarAlt />} label="Date" value={request.date || request.donationDate} />
        <DetailRow icon={<FaClock />} label="Time" value={request.time || request.donationTime} />
        <div className="flex items-start gap-2 col-span-full">
          <FaCommentDots className="text-red-500 mt-1" />
          <div>
            <span className="font-medium">Message:</span> <br />
            {request.message || request.requestMessage}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-8 bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition w-full sm:w-auto"
      >
        Donate Now
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <FaTint /> Confirm Donation
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Donor Name</label>
                <input
                  type="text"
                  value={user.displayName || user.name || ""}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Donor Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <button
                onClick={handleConfirmDonation}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition"
              >
                <FaCheck /> Confirm Donation
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-center text-sm text-gray-500 hover:underline mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-red-500">{icon}</span>
    <span className="font-medium">{label}:</span> {value}
  </div>
);

export default DonationRequestDetails;
