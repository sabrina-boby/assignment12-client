import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  // For custom dropdown open/close
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(`https://project-server1.vercel.app/api/users/${user.email}`)
      .then((res) => {
        setProfileData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile");
        setLoading(false);
      });
  }, [user.email]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBloodGroupSelect = (group) => {
    setProfileData((prev) => ({ ...prev, bloodGroup: group }));
    setDropdownOpen(false);
  };

  const handleSave = async () => {
    try {
      const { name, avatar, bloodGroup, district, upazila } = profileData;
      const updatedFields = { name, avatar, bloodGroup, district, upazila };

      await axios.patch(
        `https://project-server1.vercel.app/update-profile/${user.email}`,
        updatedFields
      );
      setIsEditing(false);
      toast.success("Profile updated");

      const res = await axios.get(
        `https://project-server1.vercel.app/api/users/${user.email}`
      );
      setProfileData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-10"><span className="loading loading-spinner loading-xl"></span></p>;

  return (
    <div
      className="max-w-xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 bg-white shadow-lg rounded-xl mt-10"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
          >
            Edit
          </button>
        )}
      </div>

      {/* Avatar Preview */}
      {profileData.avatar && (
        <div className="flex justify-center mb-6">
          <img
            src={profileData.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md object-cover"
          />
        </div>
      )}

      <form
        className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="name"
          value={profileData.name}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Name"
          className="px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     disabled:bg-gray-100 disabled:cursor-not-allowed w-full"
        />

        <input
          type="email"
          name="email"
          value={profileData.email}
          disabled
          className="px-3 py-2 border border-gray-300 rounded-md
                     bg-gray-100 cursor-not-allowed w-full"
        />

        <input
          type="text"
          name="avatar"
          value={profileData.avatar}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     disabled:bg-gray-100 disabled:cursor-not-allowed w-full"
        />

        {/* Custom Blood Group dropdown */}
        <div className="relative w-full" ref={dropdownRef}>
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-full text-left px-3 py-2 border border-gray-300 rounded-md
                        focus:outline-none focus:ring-2 focus:ring-blue-400
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                        flex justify-between items-center`}
          >
            <span>
              {profileData.bloodGroup || "Select Blood Group"}
            </span>
            <svg
              className={`w-5 h-5 ml-2 transition-transform ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <ul
              className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white border border-gray-300 shadow-lg"
              role="listbox"
            >
              {BLOOD_GROUPS.map((group) => (
                <li
                  key={group}
                  className={`cursor-pointer select-none px-4 py-2 flex justify-between items-center hover:bg-blue-100
                    ${profileData.bloodGroup === group ? "font-semibold text-blue-600" : ""}
                  `}
                  onClick={() => handleBloodGroupSelect(group)}
                  role="option"
                  aria-selected={profileData.bloodGroup === group}
                >
                  <span>{group}</span>
                  {profileData.bloodGroup === group && (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          name="district"
          value={profileData.district}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="District"
          className="px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     disabled:bg-gray-100 disabled:cursor-not-allowed w-full"
        />

        <input
          type="text"
          name="upazila"
          value={profileData.upazila}
          disabled={!isEditing}
          onChange={handleChange}
          placeholder="Upazila"
          className="px-3 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     disabled:bg-gray-100 disabled:cursor-not-allowed w-full"
        />
      </form>
    </div>
  );
};

export default ProfilePage;
