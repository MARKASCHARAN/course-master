import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AddQuiz() {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [msg, setMsg] = useState("");

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);

  const loadCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  const loadLessons = async (id) => {
    const res = await api.get(`/courses/${id}`);
    setLessons(res.lessons || []);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const updateQuestion = (idx, field, value) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  const submitQuiz = async () => {
    try {
      await api.post(
        `/admin/courses/${courseId}/lessons/${lessonId}/quizzes`,
        { questions }
      );
      setMsg("Quiz created!");
    } catch (err) {
      setMsg("Error creating quiz");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>

      {/* Select Course */}
      <label className="block mb-4">
        <p className="font-semibold">Select Course</p>
        <select
          className="border p-2 rounded w-full"
          value={courseId}
          onChange={(e) => {
            setCourseId(e.target.value);
            loadLessons(e.target.value);
          }}
        >
          <option value="">-- select --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      {/* Select Lesson */}
      <label className="block mb-4">
        <p className="font-semibold">Select Lesson</p>
        <select
          className="border p-2 rounded w-full"
          value={lessonId}
          onChange={(e) => setLessonId(e.target.value)}
        >
          <option value="">-- select --</option>
          {lessons.map((l) => (
            <option key={l._id} value={l._id}>
              {l.title}
            </option>
          ))}
        </select>
      </label>

      {/* Questions */}
      {questions.map((q, idx) => (
        <div key={idx} className="bg-white p-4 shadow rounded-xl mb-4">
          <p className="font-semibold mb-2">Question {idx + 1}</p>

          <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Question text"
            value={q.question}
            onChange={(e) => updateQuestion(idx, "question", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            {q.options.map((opt, oIdx) => (
              <input
                key={oIdx}
                className="border p-2 rounded"
                placeholder={`Option ${oIdx + 1}`}
                value={opt}
                onChange={(e) => updateOption(idx, oIdx, e.target.value)}
              />
            ))}
          </div>

          <label className="block mt-3">
            <p className="font-semibold">Correct Option Index (0–3)</p>
            <input
              type="number"
              className="border p-2 rounded w-28"
              value={q.correctIndex}
              onChange={(e) =>
                updateQuestion(idx, "correctIndex", Number(e.target.value))
              }
              min={0}
              max={3}
            />
          </label>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg mb-4"
      >
        ➕ Add Another Question
      </button>

      <button
        onClick={submitQuiz}
        className="w-full bg-orange-600 text-white py-3 rounded-lg"
      >
        Create Quiz
      </button>

      {msg && <p className="mt-4 text-center text-green-600">{msg}</p>}
    </div>
  );
}
