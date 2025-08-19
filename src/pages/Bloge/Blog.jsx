import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaRegCalendarAlt, FaHeartbeat, FaBookOpen, FaSearch, FaTint } from "react-icons/fa";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      axios
        .get(`https://project-server1.vercel.app/api/blogs?search=${encodeURIComponent(searchTerm)}&status=published`)
        .then((res) => {
          setBlogPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching blogs:", err);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="bg-gradient-to-b from-red-50 via-white to-red-100 py-16 px-4 md:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 px-4 sm:px-0">
          <div className="flex text-red-600 justify-center mb-4">
            <FaTint className="text-4xl sm:text-5xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-500 mb-2 flex justify-center items-center gap-2">
            <FaHeartbeat className="text-red-700 animate-pulse" />
            BloodConnect Blog
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            <FaBookOpen className="inline-block mr-2 text-red-400" />
            Stories, insights, and updates from our life-saving community.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12 px-4 sm:px-0">
          <div className="relative w-full max-w-xl">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, author, or keyword..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-lg font-semibold"><span className="loading loading-spinner loading-xl"></span></div>
        )}

        {/* No Results */}
        {!loading && blogPosts.length === 0 && (
          <div className="text-center text-gray-500 text-lg font-medium">No blog posts found.</div>
        )}

        {/* Blog Cards */}
        {!loading && blogPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
            {blogPosts.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden hover:-translate-y-1"
              >
                <img
                  src={blog.image}
                  alt="Blog preview"
                  className="w-full h-48 sm:h-56 md:h-60 object-cover"
                />
                <div className="p-5 space-y-3">
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <FaUser className="mr-1 text-red-500" /> {blog.author || "Unknown"}
                    </span>
                    <span className="flex items-center">
                      <FaRegCalendarAlt className="mr-1 text-red-500" />{" "}
                      {blog.date || new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-md sm:text-lg font-bold text-gray-800 leading-snug flex items-center gap-2">
                    <FaBookOpen className="text-red-400" />
                    {blog.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                    {blog.summary || (blog.content && blog.content.substring(0, 120) + "...")}
                  </p>
                  <Link
                    to={`/reed_more/${blog._id}`}
                    className="inline-block text-sm font-semibold text-red-600 hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
