import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api";
import Loader from "../../components/Loader";

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${courseId}`);
      setCourse(res);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (loading) return <Loader />;
  if (!course) return <p className="text-center text-red-600">Course not found</p>;

  return (
    <div
  key={enroll._id}
  className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl transition-all duration-300"
>
  {/* Title */}
  <h2 className="text-xl font-bold text-gray-900">{enroll.course.title}</h2>

  {/* Instructor */}
  <p className="text-gray-600 mt-1">
    <span className="font-medium">Instructor:</span> {enroll.course.instructor}
  </p>

  {/* Batch */}
  <p className="text-gray-600 mt-1">
    <span className="font-medium">Batch:</span> {enroll.batchName}
  </p>

  {/* Progress Bar */}
  <div className="mt-4">
    <div className="h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-blue-600 rounded-full transition-all"
        style={{ width: `${enroll.progress}%` }}
      ></div>
    </div>
    <p className="text-sm mt-1 text-gray-700 font-medium">
      {enroll.progress}% completed
    </p>
  </div>

  {/* Buttons */}
  <div className="mt-5 flex flex-col gap-3">
    {hasLessons ? (
      <Link
        to={`/student/lesson/${enroll.course.lessons[0]}`}
        className="w-full text-center bg-blue-600 text-white py-2 rounded-lg 
        hover:bg-blue-700 transition font-medium"
      >
        Continue Learning
      </Link>
    ) : (
      <p className="text-sm text-red-600">No lessons added yet</p>
    )}

    <Link
      to={`/student/course/${enroll.course._id}`}
      className="w-full text-center bg-gray-800 text-white py-2 rounded-lg 
      hover:bg-black transition font-medium"
    >
      View Course
    </Link>
  </div>
</div>

  );
}
