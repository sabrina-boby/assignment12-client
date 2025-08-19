import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUser, FaRegCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const Reed_More = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://project-server1.vercel.app/reed_more/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading blog:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading Blog...</div>;
  }

  if (!blog) {
    return <div className="text-center py-10 text-red-500">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffafa] to-[#ffe6e6] py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white shadow-md hover:brightness-110 transition duration-300 text-sm sm:text-base"
        >
          <span className="text-lg">←</span> <span>Back to Blog</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-5 sm:p-8 md:p-10 space-y-6 border border-red-100">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-700 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm sm:text-base">
            <span className="flex items-center gap-1">
              <FaUser className="text-red-500" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1">
              <FaRegCalendarAlt className="text-red-500" />
              {blog.date}
            </span>
          </div>

          <img
            src={blog.image}
            alt="Blog"
            className="w-full h-auto rounded-xl shadow-md border border-gray-200"
          />

          <div className="text-gray-800 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reed_More;
