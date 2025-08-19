import axios from "axios";
import { useState, useEffect } from "react";
import { FaTint, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import districtsData from "../../assets/district.json";
import upazilasData from "../../assets/upazila.json";

const DonorSearch = () => {
  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [donors, setDonors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  useEffect(() => {
    if (filters.district) {
      const districtObj = districtsData.find((d) => d.name === filters.district);
      if (districtObj) {
        const ups = upazilasData
          .filter((u) => u.district_id === districtObj.id)
          .map((u) => u.name);
        setFilteredUpazilas(ups);
      } else {
        setFilteredUpazilas([]);
      }
      setFilters((prev) => ({ ...prev, upazila: "" }));
    } else {
      setFilteredUpazilas([]);
      setFilters((prev) => ({ ...prev, upazila: "" }));
    }
  }, [filters.district]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsSearched(false);
    setDonors([]);

    try {
      const res = await axios.get("https://project-server1.vercel.app/api/users/search", {
        params: {
          bloodGroup: filters.bloodGroup,
          district: filters.district,
          upazila: filters.upazila,
        },
      });

      if (res.data.length === 0) {
        setError("No donors found for this search.");
        setDonors([]);
      } else {
        setDonors(res.data);
      }
      setIsSearched(true);
    } catch (err) {
      setError("Failed to fetch donors. Please try again.");
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-red-600 mb-12">
        <BiSearch className="inline mr-2 text-red-500" />
        Find Blood Donors Near You
      </h1>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12 bg-white p-6 rounded-lg shadow-md"
      >
        {/* Blood Group */}
        <div className="flex flex-col">
          <label htmlFor="bloodGroup" className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={filters.bloodGroup}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm sm:text-base"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="flex flex-col">
          <label htmlFor="district" className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            District
          </label>
          <select
            id="district"
            name="district"
            value={filters.district}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm sm:text-base"
          >
            <option value="">Select District</option>
            {districtsData.map((dist) => (
              <option key={dist.id} value={dist.name}>
                {dist.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div className="flex flex-col">
          <label htmlFor="upazila" className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">
            Upazila
          </label>
          <select
            id="upazila"
            name="upazila"
            value={filters.upazila}
            onChange={handleChange}
            required
            disabled={!filters.district}
            className={`border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm sm:text-base ${
              !filters.district ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((upz) => (
              <option key={upz} value={upz}>
                {upz}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition text-sm sm:text-base flex justify-center items-center gap-2"
          >
            <BiSearch className="text-xl" />
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-600 font-medium mb-6 text-sm sm:text-base">
          {error}
        </p>
      )}

      {/* Donors Result Section */}
      {isSearched && donors.length > 0 && (
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
            Donors Found
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-gradient-to-tr from-white via-red-50 to-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={donor.avatar || "/default-avatar.png"}
                  alt={donor.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-red-500 flex-shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {donor.name}
                  </h3>
                  <p className="text-red-600 font-semibold mb-1 text-base sm:text-lg flex items-center justify-center sm:justify-start gap-1">
                    <FaTint className="text-red-500" />
                    Blood Group: {donor.bloodGroup}
                  </p>
                  <p className="text-gray-700 mb-1 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-1">
                    <FaMapMarkerAlt className="text-gray-600" />
                    {donor.upazila}, {donor.district}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-1">
                    <FaEnvelope className="text-gray-500" />
                    {donor.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Result Message */}
      {isSearched && donors.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-10 text-base sm:text-lg md:text-xl">
          No donors found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default DonorSearch;
