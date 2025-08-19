import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import districtsData from "../assets/districts.json";
import upazilasData from "../assets/upazilas.json";
import { AuthContext } from "../providers/AuthProvider";

export default function CreateDonationRequest() {
  const { user, isBlocked } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  useEffect(() => {
    setDistricts(districtsData);
  }, []);

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDistrictId(selectedId);

    const filtered = upazilasData.filter(
      (u) => String(u.district_id) === selectedId
    );
    setUpazilas(filtered);
  };

  const onSubmit = async (data) => {
    if (isBlocked) {
      Swal.fire("Blocked!", "You are blocked from creating requests.", "error");
      return;
    }

    // Find district name
    const districtObj = districts.find(
      (element) => String(element.id) === selectedDistrictId
    );
    const districtName = districtObj ? districtObj.name : "";

    const requestData = {
      ...data,
      requesterName: user?.name,
      requesterEmail: user?.email,
      recipientDistrict: districtName, // send district name instead of ID
      donationStatus: "pending",
    };

    try {
      const res = await axios.post(
        "https://project-server1.vercel.app/api/donation-requests",
        requestData
      );
      Swal.fire("Success!", "Donation request created!", "success");
      reset();
      setUpazilas([]);
      setSelectedDistrictId("");
      navigate("/dashboard/MyDonationRequests");
    } catch (error) {
      Swal.fire("Error!", "Failed to create donation request.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        Create Donation Request
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Requester Info */}
        {console.log("user:", user)} 
        <input
          readOnly
          value={user?.displayName || ""}
          className="input input-bordered w-full"
          placeholder="Requester Name"
        />
        <input
          readOnly
          value={user?.email || ""}
          className="input input-bordered w-full"
          placeholder="Requester Email"
        />

        {/* Recipient Name */}
        <input
          {...register("recipientName", { required: true })}
          className="input input-bordered w-full"
          placeholder="Recipient Name"
        />

        {/* District */}
        <select
          {...register("recipientDistrict", { required: true })}
          className="select select-bordered w-full"
          onChange={handleDistrictChange}
          value={selectedDistrictId}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          {...register("recipientUpazila", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Hospital */}
        <input
          {...register("hospitalName", { required: true })}
          className="input input-bordered w-full"
          placeholder="Hospital Name"
        />

        {/* Address */}
        <input
          {...register("fullAddress", { required: true })}
          className="input input-bordered w-full"
          placeholder="Full Address"
        />

        {/* Blood Group */}
        <select
          {...register("bloodGroup", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg, i) => (
            <option key={i} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* Date & Time */}
        <input
          type="date"
          {...register("donationDate", { required: true })}
          className="input input-bordered w-full"
        />
        <input
          type="time"
          {...register("donationTime", { required: true })}
          className="input input-bordered w-full"
        />

        {/* Message */}
        <textarea
          {...register("requestMessage", { required: true })}
          className="textarea textarea-bordered w-full"
          placeholder="Why do you need blood?"
        />

        {/* Submit */}
        <button className="btn btn-error w-full text-white">Request</button>
      </form>
    </div>
  );
}
