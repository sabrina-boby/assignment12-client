import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddBlog() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const imageBB_api = import.meta.env.VITE_IMAGEBB_API_KEY;
  const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageBB_api}`;

  // Get blog ID from URL query param ?id=
  const searchParams = new URLSearchParams(location.search);
  const blogId = searchParams.get("id");

  // If editing: fetch blog data & fill form
  useEffect(() => {
    if (blogId) {
      axios.get(`https://project-server1.vercel.app/api/blogs/${blogId}`).then((res) => {
        const blog = res.data;
        setValue("title", blog.title);
        setValue("author", blog.author);
        setValue("summary", blog.summary);
        setContent(blog.content);
        setValue("existingImage", blog.image); // keep existing image url
      });
    } else {
      reset();
      setContent("");
    }
  }, [blogId, setValue, reset]);

  // On form submit (create or update)
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageUrl = data.existingImage || "";

      // If user uploaded new image
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const imgRes = await axios.post(imageUploadUrl, formData);
        imageUrl = imgRes.data.data.display_url;
      }

      const blogData = {
        title: data.title,
        author: data.author,
        summary: data.summary,
        content: content,
        image: imageUrl,
        status: "draft", // Always draft on create/edit here
        createdAt: new Date(),
      };

      if (blogId) {
        // Update blog
        await axios.put(`https://project-server1.vercel.app/api/blogs/${blogId}`, blogData);
        Swal.fire("Success", "Blog updated successfully!", "success");
      } else {
        // Create new blog
        await axios.post("https://project-server1.vercel.app/api/blogs", blogData);
        Swal.fire("Success", "Blog created successfully!", "success");
      }

      reset();
      setContent("");
      navigate("/dashboard/content-management");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to save blog", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-6 sm:p-10 md:p-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-600 mb-2 flex justify-center items-center gap-2">
          ✍️ {blogId ? "Edit Blog" : "Add New Blog"}
        </h2>
        <p className="text-center text-gray-500 mb-8 text-xs sm:text-sm tracking-wide uppercase">
          Share your knowledge with the community
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-1 gap-2 text-sm sm:text-base">
              Blog Title
            </label>
            <input
              {...register("title", { required: true })}
              placeholder="Ex: The Truth About Blood Donation"
              className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* Author */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-1 gap-2 text-sm sm:text-base">
              Author Name
            </label>
            <input
              {...register("author", { required: true })}
              placeholder="Ex: Dr. Sarah Khan"
              className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-red-300"
            />
          </div>

          {/* Existing Image URL (hidden) */}
          <input type="hidden" {...register("existingImage")} />

          {/* Image Upload */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-1 gap-2 text-sm sm:text-base">
              Upload Image
            </label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-red-300"
            />
            {/* Show existing image preview */}
            {content && (
              <img
                src={content ? content : ""}
                alt="Preview"
                className="mt-2 w-32 h-20 object-cover rounded"
              />
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-1 gap-2 text-sm sm:text-base">
              Blog Summary
            </label>
            <textarea
              {...register("summary", { required: true })}
              placeholder="Write a short summary (2-3 lines)..."
              className="w-full bg-gray-50 px-4 py-3 h-24 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-red-300 resize-none"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-1 gap-2 text-sm sm:text-base">
              Blog Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : blogId ? "Update Blog" : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
