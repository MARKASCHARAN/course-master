import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../../components/Loader";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCourse = async () => {
    const res = await api.get(`/courses/${courseId}`);
    setCourse(res.course);
    setLoading(false);
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  if (loading) return <Loader />;

  if (!course)
    return <p className="text-center text-red-600 mt-10">Course not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-3">{course.title}</h1>
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>

      <h2 className="text-xl font-bold mb-3">Lessons</h2>
      <ul className="space-y-2">
        {course.lessons.map((id, idx) => (
          <li
            key={id}
            className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
          >
            <span>Lesson {idx + 1}</span>

            <a
              href={`/student/lesson/${id}`}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Watch
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
