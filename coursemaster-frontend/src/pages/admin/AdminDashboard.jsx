import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../../components/Loader";

export default function AdminDashboard() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Mock implementation for UI development
//   const fetchStats = async () => {
//     // Simulate network delay
//     setTimeout(() => {
//       setStats({
//         courses: 12,
//         lessons: 45,
//         batches: 3
//       });
//       setLoading(false);
//     }, 500);
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   if (loading) return <div className="flex justify-center items-center h-screen bg-stone-50"><Loader /></div>;

//   if (!stats)
//     return (
//       <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
//         Unable to load dashboard data. Please try again.
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-stone-50 font-sans text-slate-900 pb-12">
      
//       {/* --- Header Section --- */}
//       <div className="bg-white border-b border-stone-200">
//         <div className="max-w-7xl mx-auto px-6 py-10">
//           <h1 className="text-3xl font-serif font-bold text-slate-900">
//             Admin Overview
//           </h1>
//           <p className="mt-2 text-slate-500">
//             Manage your curriculum, track performance, and organize batches.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 mt-10">
        
//         {/* --- 1. Key Metrics --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <StatCard 
//             label="Total Courses" 
//             value={stats.courses} 
//             icon={<BookIcon />}
//           />
//           <StatCard 
//             label="Total Lessons" 
//             value={stats.lessons} 
//             icon={<VideoIcon />}
//           />
//           <StatCard 
//             label="Active Batches" 
//             value={stats.batches} 
//             icon={<LayersIcon />}
//           />
//         </div>

//         {/* --- 2. Quick Actions --- */}
//         <div className="mb-6">
//             <h2 className="text-lg font-bold uppercase tracking-wider text-slate-500 mb-6">
//                 Management Console
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
//                 <ActionCard 
//                     to="/admin/create-course"
//                     title="Create Course"
//                     desc="Design a new curriculum"
//                     icon={<PlusIcon />}
//                     color="bg-slate-900 text-white"
//                 />

//                 <ActionCard 
//                     to="/admin/add-lesson"
//                     title="Add Lesson"
//                     desc="Upload video content"
//                     icon={<PlayCircleIcon />}
//                     color="bg-white border border-stone-200 text-slate-900 hover:border-slate-400"
//                 />

//                 <ActionCard 
//                     to="/admin/add-batch"
//                     title="New Batch"
//                     desc="Schedule a cohort"
//                     icon={<CalendarIcon />}
//                     color="bg-white border border-stone-200 text-slate-900 hover:border-slate-400"
//                 />

//                 <ActionCard 
//                     to="/admin/add-quiz"
//                     title="Create Quiz"
//                     desc="Assess student progress"
//                     icon={<ClipboardIcon />}
//                     color="bg-white border border-stone-200 text-slate-900 hover:border-slate-400"
//                 />

//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // --- Sub-Components for Clean Code ---

// function StatCard({ label, value, icon }) {
//     return (
//         <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm flex items-start justify-between">
//             <div>
//                 <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-1">{label}</p>
//                 <p className="text-4xl font-serif font-bold text-slate-900">{value}</p>
//             </div>
//             <div className="p-3 bg-stone-50 rounded-md text-slate-600">
//                 {icon}
//             </div>
//         </div>
//     );
// }

// function ActionCard({ to, title, desc, icon, color }) {
//     return (
//         <Link
//           to={to}
//           className={`group flex flex-col justify-between p-6 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-1 ${color}`}
//         >
//           <div className="mb-4">
//              <div className="mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
//                 {icon}
//              </div>
//              <h3 className="text-lg font-bold">{title}</h3>
//              <p className="text-sm opacity-70 mt-1">{desc}</p>
//           </div>
          
//           <div className="flex items-center text-sm font-bold opacity-60 group-hover:opacity-100">
//              Proceed &rarr;
//           </div>
//         </Link>
//     );
}

// --- Icons (Inline SVGs for portability) ---

const BookIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const VideoIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const LayersIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const PlusIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
);
const PlayCircleIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const CalendarIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const ClipboardIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);