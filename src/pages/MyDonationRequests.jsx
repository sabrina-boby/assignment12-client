import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function MyDonationRequests() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // <-- loading state added
  const itemsPerPage = 5;

  const fetchRequests = () => {
    if (!user?.email) return;

    setLoading(true); // <-- start loading
    axios
      .get("https://project-server1.vercel.app/api/donation-requests", {
        params: {
          email: user.email,
          status: statusFilter,
          page: currentPage,
          limit: itemsPerPage,
        },
      })
      .then((res) => {
        setRequests(res.data.requests);
        setTotalPages(res.data.totalPages);
        setLoading(false); // <-- stop loading
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false); // <-- stop loading even if error
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [user, statusFilter, currentPage]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`https://project-server1.vercel.app/api/donation-requests/${id}`, {
        donationStatus: newStatus,
        donorName: user.displayName,
        donorEmail: user.email,
      });
      fetchRequests(); // Refresh after update
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const statusStyles = {
    pending: { color: "text-yellow-600", icon: "⏳" },
    inprogress: { color: "text-blue-600", icon: "🔄" },
    done: { color: "text-green-600", icon: "✔️" },
    canceled: { color: "text-red-600", icon: "❌" },
  };

  // **Loading spinner overlay**
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="p-6 max-w-full overflow-x-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        My Donation Requests
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-6 flex items-center gap-3 justify-center">
        <label htmlFor="statusFilter" className="font-medium text-gray-700">
          Status Filter:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {[
              "Recipient",
              "Location",
              "Blood Group",
              "Date",
              "Time",
              "Status",
              "Donors",
              "Details",
            ].map((header) => (
              <th
                key={header}
                className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700 select-none"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                className="text-center py-6 text-gray-500 italic select-none"
              >
                No donation requests found.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <td className="border-b border-gray-200 px-4 py-3 whitespace-nowrap">
                  {req.recipientName}
                </td>
                <td className="border-b border-gray-200 px-4 py-3 whitespace-nowrap">
                  {req.fullAddress}
                </td>
                <td className="border-b border-gray-200 px-4 py-3 font-semibold text-red-600 whitespace-nowrap">
                  {req.bloodGroup}
                </td>
                <td className="border-b border-gray-200 px-4 py-3 whitespace-nowrap">
                  {req.donationDate}
                </td>

                <td className="border-b border-gray-200 px-4 py-3 whitespace-nowrap">
                  {req.donationTime}
                </td>
                <td className="border-b border-gray-200 px-4 py-3 capitalize font-medium whitespace-nowrap">
                      {req.status}
                    </td>
                <td className="border-b border-gray-200 px-4 py-3 whitespace-nowrap">
                  {req.donorName ? req.donorName : "No donor"}
                </td>
                
                <td className="border-b border-gray-200 px-4 py-3 whitespace-nowrap">
                  <Link
                    to={`/donation-requests/${req._id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={`px-3 py-1 border rounded-md transition focus:outline-none focus:ring-2 ${currentPage === pageNum
                ? "bg-blue-600 text-white ring-blue-400"
                : "bg-white text-gray-700 hover:bg-blue-100 ring-transparent"
              }`}
            onClick={() => setCurrentPage(pageNum)}
            aria-label={`Go to page ${pageNum}`}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}
