import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import Blood_Donation from "../assets/Blood_Donation.json";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import districtsData from "../assets/district.json";
import upazilasDataRaw from "../assets/upazila.json"; // rename to make clear it's raw data

// ✅ ImageBB API Config
const imageBB_API_KEY = import.meta.env.VITE_IMAGEBB_API_KEY;
const imageBB_URL = `https://api.imgbb.com/1/upload?key=${imageBB_API_KEY}`;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const goTo = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrictId(districtId);

    // ✅ Clone before filtering
    const relatedUpazilas = [...upazilasDataRaw].filter(
      (u) => String(u.district_id) === String(districtId)
    );
    setFilteredUpazilas(relatedUpazilas);
  };

  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      Swal.fire("Error", "Password must have an uppercase letter", "error");
      return false;
    }
    if (!hasLowerCase) {
      Swal.fire("Error", "Password must have a lowercase letter", "error");
      return false;
    }
    if (!isLongEnough) {
      Swal.fire("Error", "Password must be at least 6 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name");
    const imageFile = formData.get("image");
    const email = formData.get("email");
    const pass = formData.get("pass");
    const confirmPassword = formData.get("confirmPassword");
    const bloodGroup = formData.get("bloodGroup");
    const district = formData.get("district");
    const upazila = formData.get("upazila");

    if (pass !== confirmPassword) {
      setLoading(false);
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    if (!isValidPassword(pass)) {
      setLoading(false);
      return;
    }

    try {
      // ✅ Upload image
      const imgForm = new FormData();
      imgForm.append("image", imageFile);

      const imgUploadRes = await axios.post(imageBB_URL, imgForm);
      const avatarUrl = imgUploadRes?.data?.data?.display_url || "";

      // ✅ Firebase Registration
      const res = await createUser(email, pass);
      await updateUser({ displayName: name, photoURL: avatarUrl });
      setUser({ ...res.user, displayName: name, photoURL: avatarUrl });

      // ✅ District name from ID
      const districtName = districtsData.find((d) => String(d.id) === String(district))?.name || "";

      // ✅ Save to MongoDB
      const userInfo = {
        name,
        email,
        avatar: avatarUrl,
        bloodGroup,
        district: districtName,
        upazila,
        password: pass,
        role: "donor",
        status: "active",
      };

      const result = await axios.post("https://project-server1.vercel.app/api/users", userInfo);

      if (result.data.insertedId) {
        setLoading(false);
        Swal.fire("Success", "Registered Successfully!", "success").then(() => {
          goTo(location.state ? location.state : "/");
        });
      }

    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        Swal.fire({
          title: "Already Registered",
          text: "This email is already registered. Please go to login.",
          icon: "warning",
          confirmButtonText: "Go to Login",
        }).then((result) => {
          if (result.isConfirmed) {
            goTo("/login");
          }
        });
      } else {
        Swal.fire("Registration Failed", err.message || "Unknown error", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full mx-auto bg-white bg-opacity-90 shadow-xl rounded-xl overflow-hidden p-6 md:p-10">
        <Title>Join with Us</Title>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-8">
          {/* Form */}
          <div className="w-full sm:border-t-2 md:border-none lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white bg-opacity-80 rounded-lg shadow-md">
              <div className="flex items-center border-b-2 border-gray-400 focus-within:border-orange-500 transition">
                <BiUser className="text-xl text-gray-600 mr-2" />
                <input type="text" name="name" placeholder="Full Name" required className="flex-1 py-2 bg-transparent outline-none text-gray-800" />
              </div>

              <div className="flex items-center border-b-2 border-gray-400 focus-within:border-orange-500 transition">
                <BiImageAdd className="text-xl text-gray-600 mr-2" />
                <input type="file" name="image" accept="image/*" required className="flex-1 py-2 bg-transparent outline-none text-gray-800" />
              </div>

              <div className="flex items-center border-b-2 border-gray-400 focus-within:border-orange-500 transition">
                <BiEnvelope className="text-xl text-gray-600 mr-2" />
                <input type="email" name="email" placeholder="Email" required className="flex-1 py-2 bg-transparent outline-none text-gray-800" />
              </div>

              <select name="bloodGroup" required className="select select-bordered w-full" defaultValue="">
                <option disabled value="">Choose Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>

              <select name="district" required onChange={handleDistrictChange} className="select select-bordered w-full" defaultValue="">
                <option disabled value="">Select District</option>
                {districtsData.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              <select name="upazila" required className="select select-bordered w-full" defaultValue="">
                <option disabled value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>

              <div className="flex items-center border-b-2 border-gray-400 focus-within:border-orange-500 transition">
                <BiKey className="text-xl text-gray-600 mr-2" />
                <input type="password" name="pass" placeholder="Password" required className="flex-1 py-2 bg-transparent outline-none text-gray-800" />
              </div>

              <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input input-bordered w-full" required />

              <button type="submit" className={`w-full bg-red-500 disabled:bg-gray-400 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition cursor-pointer duration-300`} disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-lg"></span> : " Register Now"}
              </button>

              <p className="text-center text-sm text-gray-700 pt-4 border-t">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
                  Login here
                </Link>
              </p>
            </form>
          </div>

          {/* Animation */}
          <div className="w-full lg:w-1/2 max-w-md">
            <Lottie animationData={Blood_Donation} loop className="w-[250px] mx-auto md:w-[350px] lg:w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
