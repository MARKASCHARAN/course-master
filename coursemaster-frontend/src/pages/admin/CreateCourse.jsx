import { useState } from "react";
import api from "../../utils/api";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "",
    tags: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createCourse = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      // Convert tags + price properly
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        instructor: form.instructor.trim(),
        price: Number(form.price),
        category: form.category.trim(),
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim())
          : [],
      };

      console.log("COURSE PAYLOAD:", payload);

      const res = await api.post("/admin/courses", payload);

      setMsg("✅ Course created successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        instructor: "",
        price: "",
        category: "",
        tags: "",
      });

    } catch (err) {
      console.error("COURSE CREATE ERROR:", err);
      setMsg("❌ Error creating course");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Course
      </h1>

      <form
        onSubmit={createCourse}
        className="bg-white p-6 rounded-xl shadow border"
      >
        {/* Title */}
        <label className="block mb-3">
          <p className="font-semibold mb-1">Course Title</p>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        {/* Description */}
        <label className="block mb-3">
          <p className="font-semibold mb-1">Description</p>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
          />
        </label>

        {/* Instructor */}
        <label className="block mb-3">
          <p className="font-semibold mb-1">Instructor</p>
          <input
            type="text"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        {/* Price */}
        <label className="block mb-3">
          <p className="font-semibold mb-1">Price</p>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        {/* Category */}
        <label className="block mb-3">
          <p className="font-semibold mb-1">Category</p>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        {/* Tags */}
        <label className="block mb-3">
          <p className="font-semibold mb-1">Tags (comma separated)</p>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
          type="submit"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

        {msg && <p className="mt-4 text-center text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
