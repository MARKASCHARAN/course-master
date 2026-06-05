import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AddBatch() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    startDate: "",
  });

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addBatch = async (e) => {
    e.preventDefault();
    if (!courseId) return setMsg("Select course first!");

    try {
      await api.post(`/admin/courses/${courseId}/batches`, form);
      setMsg("Batch added!");
      setForm({ name: "", startDate: "" });
    } catch (err) {
      setMsg("Error adding batch");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Batch</h1>

      <label className="block mb-4">
        <p className="font-semibold mb-1">Select Course</p>
        <select
          className="border p-2 rounded w-full"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option value="">-- select --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <form className="bg-white p-6 shadow rounded-xl" onSubmit={addBatch}>
        <label className="block mb-3">
          <p className="font-semibold">Batch Name</p>
          <input
            className="border p-2 rounded w-full"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-3">
          <p className="font-semibold">Start Date</p>
          <input
            type="date"
            className="border p-2 rounded w-full"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </label>

        <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
          Add Batch
        </button>

        {msg && <p className="text-center mt-3 text-green-600">{msg}</p>}
      </form>
    </div>
  );
}
