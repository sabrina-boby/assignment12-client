import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://project-server1.vercel.app/api/donation-requests?email=${user.email}`)
        .then((res) => {
          const requestsArray = res.data.requests;
          if (Array.isArray(requestsArray)) {
            setRequests(requestsArray.reverse().slice(0, 3));
          } else {
            console.error("Expected array but got:", res.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching donation requests:", err);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    axios.delete(`https://project-server1.vercel.app/api/donation-requests/${id}`).then(() => {
      setRequests((prev) => prev.filter((r) => r._id !== id));
      document.getElementById("delete_modal").close();
    });
  };

  const handleStatusUpdate = (id, status) => {
    axios
      .patch(`https://project-server1.vercel.app/api/donation-requests/${id}`, {
        donationStatus: status,
      })
      .then(() => {
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, donationStatus: status } : r))
        );
        document.getElementById("action_modal").close();
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        🏠 Welcome, {user?.displayName}
      </h2>

      {requests.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            🩸 Your Recent Donation Requests
          </h3>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full min-w-[700px]">
              <thead>
                <tr className="text-sm md:text-base">
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="text-sm">
                    <td>{req.recipientName}</td>
                    <td>{req.fullAddress}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.donorName ? req.donorName : "No donor"}
                    </td>
                    {/* <td>
                      <div className="flex flex-wrap gap-1">
                        {req.donationStatus === "inprogress" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(req._id, "done")}
                              className="btn btn-xs btn-success"
                            >
                              Done
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(req._id, "canceled")}
                              className="btn btn-xs btn-error"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {!["done", "canceled"].includes(req.donationStatus) && (
                          <>
                            <button
                              className="btn btn-xs btn-info"
                              onClick={() => navigate(`/donation-request/${req._id}`)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-xs btn-error"
                              onClick={() => {
                                setSelectedRequest(req);
                                document.getElementById("delete_modal").showModal();
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}

                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => navigate(`/donation-requests/${req._id}`)}
                        >
                          View
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <button
              onClick={() => navigate("/dashboard/myDonationRequests")}
              className="btn btn-primary btn-sm"
            >
              View My All Requests
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-2">
            Do you really want to delete donation request of{" "}
            <span className="font-semibold">{selectedRequest?.recipientName}</span>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-outline">Cancel</button>
              <button
                onClick={() => handleDelete(selectedRequest._id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
