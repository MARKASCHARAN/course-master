import { Link } from "react-router-dom";

export default function CourseCard({ course, progress = 0, batchName }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition border">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
      <p className="text-gray-600 mb-3">{course.instructor}</p>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{progress}% Completed</p>
      </div>

      {/* Batch Info */}
      {batchName && (
        <p className="text-sm text-gray-500 mb-3">
          <span className="font-medium">Batch:</span> {batchName}
        </p>
      )}

      {/* Button */}
      <Link
        to={`/student/courses`}
        className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Course
      </Link>
    </div>
  );
}
