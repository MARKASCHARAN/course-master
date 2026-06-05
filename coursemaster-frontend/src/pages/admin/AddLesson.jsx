import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AddLesson() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState({
    title: "",
    videoUrl: "",
    order: "",
  });

  const [msg, setMsg] = useState("");

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses");

      console.log("COURSES RAW RESPONSE:", res);

      if (Array.isArray(res)) {
        setCourses(res);
      } else if (res?.data && Array.isArray(res.data)) {
        setCourses(res.data);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.log("LOAD COURSES ERROR:", err);
    }
  };

  useEffect(() => {
    loadCourses();   // ✅ FIXED
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitLesson = async (e) => {
    e.preventDefault();
    if (!selected) return setMsg("Select a course first!");

    try {
      await api.post(`/admin/courses/${selected}/lessons`, {
        ...form,
        order: Number(form.order),
      });

      setMsg("Lesson added!");
      setForm({ title: "", videoUrl: "", order: "" });
    } catch (err) {
      setMsg("Error adding lesson");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Lesson to Course</h1>

      <div className="mb-5">
        <p className="font-semibold mb-1">Select Course</p>
        <select
          className="border p-2 rounded w-full"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- Select --</option>

          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={submitLesson} className="bg-white p-6 shadow rounded-xl">
        <label className="block mb-3">
          <p className="font-semibold">Lesson Title</p>
          <input
            name="title"
            className="border p-2 rounded w-full"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-3">
          <p className="font-semibold">Video URL</p>
          <input
            name="videoUrl"
            className="border p-2 rounded w-full"
            value={form.videoUrl}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-3">
          <p className="font-semibold">Order</p>
          <input
            type="number"
            name="order"
            className="border p-2 rounded w-full"
            value={form.order}
            onChange={handleChange}
            required
          />
        </label>

        <button className="w-full bg-green-600 text-white py-2 rounded-lg">
          Add Lesson
        </button>

        {msg && <p className="mt-3 text-center text-blue-600">{msg}</p>}
      </form>
    </div>
  );
}
