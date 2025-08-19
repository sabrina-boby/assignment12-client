import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import districtsData from "../../assets/district.json";
import upazilasData from "../../assets/upazila.json";

const CreateDonation = () => {
  const { user, isBlocked } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    setDistricts(districtsData);
  }, []);

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDistrictId(selectedId);
    const filtered = upazilasData.filter(
      (upazila) => String(upazila.district_id) === selectedId
    );
    setFilteredUpazilas(filtered);
  };

  const onSubmit = async (data) => {
    if (isBlocked) {
      Swal.fire("Blocked!", "You are blocked from creating requests.", "error");
      return;
    }

    const selectedDistrict = districts.find(
      (d) => String(d.id) === selectedDistrictId
    )?.name;

    const requestData = {
      name: data.recipientName,
      district: selectedDistrict,
      upazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      recipientName: data.recipientName,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      donationStatus: "pending",
    };

    try {
      await axios.post("https://project-server1.vercel.app/api/donation-requests", requestData);
      Swal.fire("Success!", "Donation request created!", "success");
      reset();
      setSelectedDistrictId("");
      setFilteredUpazilas([]);
      navigate("/donation_Requests");
    } catch (error) {
      Swal.fire("Error!", "Failed to create donation request.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-xl rounded-3xl mt-10">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Create Donation Request
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Requester Info (readonly) */}
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
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Hospital & Address */}
        <input
          {...register("hospitalName", { required: true })}
          className="input input-bordered w-full"
          placeholder="Hospital Name"
        />
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
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
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
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-error w-full text-white font-semibold"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonation;
