import { useState } from "react";
import api from "../utils/api";      
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", data);

      if (res.message && !res.token) {
        throw new Error(res.message);
      }

      login(res.token, res.user);
      navigate("/student");

    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      
      {/* --- Left Column: The Form --- */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-20 xl:px-24 bg-white relative">
        
        {/* Brand Logo (Consistent with Login) */}
        <div className="absolute top-8 left-8 sm:left-12 lg:left-20 flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-md">
            <span className="font-serif font-bold text-lg">C</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">CourseMaster</span>
        </div>

        <div className="w-full max-w-sm mx-auto mt-16">
          <h2 className="text-4xl font-serif font-bold mb-2 text-slate-900">Begin your journey</h2>
          <p className="text-slate-500 mb-8">Join our community of professionals and lifelong learners.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all placeholder-stone-400"
                placeholder="John Doe"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Work Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all placeholder-stone-400"
                placeholder="name@company.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all placeholder-stone-400"
                placeholder="Create a strong password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
              <p className="text-[10px] text-slate-400 mt-1">Must be at least 8 characters.</p>
            </div>

            <button
              disabled={loading}
              className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-md hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 active:scale-[0.98] mt-2"
            >
              {loading ? (
                 <span className="flex items-center justify-center gap-2">
                 <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Creating Account...
               </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500">
            Already a member?{" "}
            <Link to="/login" className="text-slate-900 font-bold hover:underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* --- Right Column: The Lifestyle Image --- */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" 
          alt="University Architecture" 
          className="w-full h-full object-cover opacity-50 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-20 left-12 right-12 text-white">
          <p className="font-serif text-3xl leading-snug font-medium mb-4">
            "The beautiful thing about learning is that no one can take it away from you."
          </p>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">— B.B. King</p>
        </div>
      </div>

    </div>
  );
}