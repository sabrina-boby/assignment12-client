import { useEffect, useState } from "react";
import { FaDonate, FaHandHoldingHeart, FaUser } from "react-icons/fa";

export default function VolunteerDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    // Dummy fetch requests (replace with your real API endpoints)
    fetch("https://project-server1.vercel.app/api/users")
      .then(res => res.json())
      .then(data => {
        const donorCount = data.filter(user => user.role === "donor").length;
        setTotalUsers(donorCount);
      });

    fetch("https://project-server1.vercel.app/api/funds")
      .then(res => res.json())
      .then(data => {
        const total = data.reduce((sum, fund) => sum + fund.amount, 0);
        setTotalFunds(total);
      });

    fetch("https://project-server1.vercel.app/api/donation-requests")
      .then(res => res.json())
      .then(data => {
        setTotalRequests(data.total);
      });
  }, []);

  return (
    <div className="p-5">
      {/* Welcome section */}
      <h2 className="text-3xl font-bold mb-6">
        Welcome to Volunteer Dashboard
      </h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Donors */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4">
          <FaUser className="text-4xl text-blue-600" />
          <div>
            <h3 className="text-xl font-bold">{totalUsers}</h3>
            <p className="text-gray-500">Total Donors</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4">
          <FaDonate className="text-4xl text-green-600" />
          <div>
            <h3 className="text-xl font-bold">${totalFunds.toFixed(2)}</h3>
            <p className="text-gray-500">Total Funding</p>
          </div>
        </div>

        {/* Total Donation Requests */}
        <div className="bg-white shadow-md p-6 rounded-xl flex items-center gap-4">
          <FaHandHoldingHeart className="text-4xl text-red-600" />
          <div>
            <h3 className="text-xl font-bold">{totalRequests}</h3>
            <p className="text-gray-500">Total Donation Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
}
