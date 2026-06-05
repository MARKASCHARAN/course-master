import { useEffect, useState } from "react";
import api from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard";

export default function StudentDashboard() {
  const { user } = useAuth(); // Assuming useAuth provides the user object
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      // Ensure we pass the token if the interceptor doesn't handle it automatically
      // based on your previous snippets, api instance usually handles headers
      const res = await api.get("/students/me/courses");
      setCourses(Array.isArray(res) ? res : []);
    } catch (err) {
      console.log("Error loading courses", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-500 font-medium text-sm">Loading your library...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-slate-900 pb-20">
      
      {/* --- 1. Header Section --- */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Student Portal
              </p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                My Learning
              </h1>
            </div>
            {courses.length > 0 && (
              <div className="text-right">
                 <p className="text-sm text-slate-500">
                   You are enrolled in <span className="font-bold text-slate-900">{courses.length}</span> active courses.
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- 2. Content Area --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        
        {courses.length === 0 ? (
          
          /* Empty State (When no courses found) */
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">
              Your library is empty
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              It looks like you haven't enrolled in any courses yet. Browse our catalog to start your learning journey.
            </p>
            <Link 
              to="/courses" 
              className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition shadow-lg shadow-slate-900/10"
            >
              Browse Course Catalog
            </Link>
          </div>

        ) : (
          
          /* Course Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((enroll) => (
              <div key={enroll._id} className="transform transition duration-300 hover:-translate-y-1">
                {/* We pass a prop 'classic' or just style the Card internally.
                   Assuming CourseCard handles its own internal styling, 
                   we just wrap it for layout here.
                */}
                <CourseCard
                  course={enroll.course}
                  progress={enroll.progress}
                  batchName={enroll.batchName}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}