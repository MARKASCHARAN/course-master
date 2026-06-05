import React from 'react';

// Mock Data (Ratings removed)
const featuredCourses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    students: "12k Students",
    price: "$19.99",
    category: "Development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Gary Simon",
    students: "8.5k Students",
    price: "$24.99",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Data Science & Machine Learning",
    instructor: "Andrew Ng",
    students: "22k Students",
    price: "$29.99",
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- Hero Section (Editorial Style) --- */}
      <main>
        <div className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 bg-stone-50 border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Master your craft with <br />
              <span className="italic text-slate-700">world-class expertise.</span>
            </h1>
            
            <p className="mt-6 text-xl text-slate-600 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
              Access a curated library of courses taught by industry leaders. 
              Elevate your skills through a rigorous, proven curriculum.
            </p>
            
            <div className="flex justify-center gap-4">
              <button className="bg-slate-900 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-800 transition shadow-xl shadow-slate-900/10">
                Browse Library
              </button>
              <button className="bg-white text-slate-900 border border-stone-300 px-8 py-4 rounded-lg font-medium text-lg hover:bg-stone-50 transition">
                View Syllabus
              </button>
            </div>
          </div>
        </div>

        {/* --- Trusted By (Social Proof) --- */}
        <div className="py-10 border-b border-stone-200 bg-white">
           <p className="text-center text-xs font-bold tracking-widest text-stone-400 uppercase mb-6">Trusted by teams at</p>
           <div className="flex justify-center gap-12 opacity-40 grayscale">
              {/* Simple placeholders for logos to keep code clean */}
              <span className="text-xl font-bold font-serif text-slate-600">Google</span>
              <span className="text-xl font-bold font-serif text-slate-600">Spotify</span>
              <span className="text-xl font-bold font-serif text-slate-600">Stripe</span>
              <span className="text-xl font-bold font-serif text-slate-600">Airbnb</span>
           </div>
        </div>

        {/* --- Featured Courses (Minimalist Grid) --- */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-stone-200 pb-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900">Featured Curricula</h2>
              <p className="mt-2 text-slate-600"> rigorous courses designed for professionals.</p>
            </div>
            <a href="#" className="hidden sm:block text-slate-900 font-semibold border-b border-slate-900 pb-0.5 hover:opacity-70 transition">
              View all courses 
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCourses.map((course) => (
              <div key={course.id} className="group flex flex-col bg-white">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100 mb-5">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur-sm border border-stone-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 text-slate-900">
                        {course.category}
                     </span>
                  </div>
                </div>

                {/* Content - No Ratings */}
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 leading-snug mb-2 group-hover:text-slate-600 transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">
                    Head Instructor: <span className="text-slate-900 font-medium">{course.instructor}</span>
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <span className="text-sm font-medium text-slate-500">{course.students}</span>
                    <span className="text-lg font-bold text-slate-900">{course.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <button className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1">
                View all courses
            </button>
          </div>
        </section>
      </main>

      {/* --- Minimal Footer --- */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold">C</span>
            <span className="font-serif text-lg">CourseMaster</span>
          </div>
          <p className="text-slate-400 text-sm">© 2024 CourseMaster Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}