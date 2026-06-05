import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import Loader from "../../components/Loader";

export default function LessonPlayer() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLesson = async () => {
    try {
      const res = await api.get(`/courses/lesson/${lessonId}`);
      setLesson(res.data.lesson);
      setQuiz(res.data.quiz);
    } catch (err) {
      console.error(err);
      setMsg("Failed to load lesson.");
    }
    setLoading(false);
  };

  const completeLesson = async () => {
    try {
      await api.post(`/students/lessons/${lessonId}/complete`);
      setMsg("Lesson marked as complete!");
    } catch (err) {
      setMsg("Error marking lesson.");
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  if (loading) return <Loader />;

  if (!lesson)
    return <p className="text-center text-red-500 mt-10">Lesson not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {lesson.title}
      </h1>

      {/* VIDEO */}
      <div className="w-full rounded-lg overflow-hidden shadow mb-6">
        <iframe
          src={lesson.videoUrl.replace("watch?v=", "embed/")}
          className="w-full h-72"
          allowFullScreen
        ></iframe>
      </div>

      {/* QUIZ SECTION */}
      {quiz && quiz.questions && (
        <div className="bg-white p-6 shadow rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Quiz</h2>

          {quiz.questions.map((q, index) => (
            <div key={q._id} className="mb-4">
              <p className="font-medium mb-2">{index + 1}. {q.question}</p>

              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 p-2 border rounded-lg mb-1 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={i}
                    onChange={() => {
                      setSelectedAnswers((prev) => ({
                        ...prev,
                        [index]: i,
                      }));
                    }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={completeLesson}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Mark as Complete
          </button>
        </div>
      )}

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
  );
}
