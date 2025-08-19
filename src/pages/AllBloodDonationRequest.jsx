import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "inprogress" },
  { label: "Done", value: "done" },
  { label: "Canceled", value: "canceled" },
];

export default function AllBloodDonationRequests() {
  const { user, token } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // <-- loading state
  const itemsPerPage = 5;

  const fetchRequests = async () => {
    try {
      setLoading(true); // <-- request start
      const res = await axios.get(
        "https://project-server1.vercel.app/api/donation-requests",
        {
          params: {
            status: statusFilter,
            page: currentPage,
            limit: itemsPerPage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(res.data.requests);
      setTotalPages(res.data.totalPages);
      setLoading(false); // <-- request end
    } catch (error) {
      console.error("Error fetching donation requests:", error);
      setLoading(false); // <-- request end on error
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, currentPage]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleActionUpdate = async (id, newStatus) => {
    try {
      setLoading(true); // <-- action start
      await axios.patch(
        `https://project-server1.vercel.app/api/donation-requests/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRequests();
      setLoading(false); // <-- action end
    } catch (error) {
      console.error("Failed to update status:", error);
      setLoading(false); // <-- action end on error
    }
  };

  return (
    <div className="p-6 max-w-full overflow-x-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        All Blood Donation Requests (Admin View)
      </h2>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-3 justify-center">
        <label htmlFor="statusFilter" className="font-medium text-gray-700">
          Status Filter:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          {statusOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center py-10 text-lg font-semibold">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <>
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
                  "Actions",
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
                      {req.name}
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
                    <td className="border-b border-gray-200 px-4 py-3 max-w-xs text-sm text-gray-700 overflow-y-auto max-h-24">
                      {req.donorName}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-3 text-center whitespace-nowrap">
                      <div className="dropdown dropdown-end dropdown-top">
                        <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1">
                          ⋮
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <select
                              defaultValue=""
                              className="select select-warning w-full"
                              onChange={(e) => handleActionUpdate(req._id, e.target.value)}
                            >
                              <option disabled value="">
                                Change Status
                              </option>
                              <option value="pending">Pending</option>
                              <option value="inprogress">In Progress</option>
                              <option value="done">Done</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          </li>
                        </ul>
                      </div>
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
                className={`px-3 py-1 border rounded-md transition focus:outline-none focus:ring-2 ${
                  currentPage === pageNum
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
        </>
      )}
    </div>
  );
}
