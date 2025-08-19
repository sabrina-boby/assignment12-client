import axios from "axios";
import { useEffect, useState } from "react";
import { FaHandHoldingUsd, FaTint, FaUser } from "react-icons/fa";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalBloodRequests, setTotalBloodRequests] = useState(0);

  useEffect(() => {
    axios.get("https://project-server1.vercel.app/api/users").then((res) => {
      const donors = res.data.filter((user) => user.role === "donor");
      setTotalUsers(donors.length);
    });

    axios.get("https://project-server1.vercel.app/api/funds").then((res) => {
      const total = res.data.reduce((sum, fund) => sum + Number(fund.amount), 0);
      setTotalFunds(total);
    });

    axios.get("https://project-server1.vercel.app/api/donation-requests").then((res) => {
      setTotalBloodRequests(res.data.total);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Container */}
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white p-10 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Welcome to Admin Dashboard
            </h1>
            <p className="mt-4 text-lg opacity-90 max-w-lg">
              Manage everything from one place with ease and efficiency.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3771/3771222.png"
              alt="Admin Illustration"
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
        </section>

        {/* Statistics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard
            icon={<FaUser size={36} className="text-blue-600" />}
            count={totalUsers}
            label="Total Donors"
            bgColor="bg-blue-500"
          />
          <StatCard
            icon={<FaHandHoldingUsd size={36} className="text-green-600" />}
            count={`৳ ${totalFunds.toLocaleString()}`}
            label="Total Funds"
            bgColor="bg-green-500"
          />
          <StatCard
            icon={<FaTint size={36} className="text-red-600" />}
            count={totalBloodRequests}
            label="Blood Requests"
            bgColor="bg-red-500"
          />
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon, count, label, bgColor }) {
  return (
    <div
      className={`${bgColor} text-white rounded-3xl shadow-xl p-8 flex items-center gap-6 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer select-none`}
      role="region"
      aria-label={`${label} statistic`}
    >
      <div className="p-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-md">
        {icon}
      </div>
      <div className="max-w-[150px]"> {/* অথবা আপনার প্রয়োজনে মান কম-বেশি করতে পারেন */}
        <h3 className="text-4xl font-extrabold tracking-tight break-words">
          {count}
        </h3>
        <p className="text-lg opacity-90">{label}</p>
      </div>
    </div>
  );
}

