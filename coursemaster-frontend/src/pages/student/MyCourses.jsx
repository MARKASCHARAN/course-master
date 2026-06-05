import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

export default function MyCourses() {
  const { token } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/students/me/courses", token);

      console.log("MY COURSES RESPONSE:", res); // Debug

      // SAFETY: ensure always an array
      if (Array.isArray(res)) {
        setCourses(res);
      } else {
        setCourses([]);
      }

    } catch (err) {
      console.error("ERROR fetching courses:", err);
      setCourses([]); // fallback
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">You haven't enrolled in any courses.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((enroll) => {
            const lessons = enroll.course?.lessons || [];
            const firstLesson = lessons.length > 0 ? lessons[0] : null;

            return (
              <div
                key={enroll._id}
                className="bg-white shadow rounded-xl p-4 border hover:shadow-lg transition"
              >
                <h2 className="text-lg font-bold text-blue-600">
                  {enroll.course.title}
                </h2>

                <p className="text-gray-600 mt-1">
                  Instructor:{" "}
                  <span className="font-medium">
                    {enroll.course.instructor}
                  </span>
                </p>

                <p className="text-gray-600 mt-1">
                  Batch:{" "}
                  <span className="font-medium">{enroll.batchName}</span>
                </p>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${enroll.progress}%` }}
                    />
                  </div>
                  <p className="text-sm mt-1 text-gray-700 font-medium">
                    {enroll.progress}% completed
                  </p>
                </div>

                {/* Continue Learning */}
                {firstLesson ? (
                  <Link
                    to={`/student/lesson/${firstLesson}`}
                    className="block mt-4 bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <p className="mt-4 text-sm text-red-600">
                    No lessons added yet
                  </p>
                )}

                {/* View Course */}
                <Link
                  to={`/student/course/${enroll.course._id}`}
                  className="block mt-3 bg-gray-700 text-white py-2 rounded-lg text-center hover:bg-gray-800"
                >
                  View Course
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
