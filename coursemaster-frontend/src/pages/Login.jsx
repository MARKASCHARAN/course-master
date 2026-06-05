import { useState } from "react";
import api from "../utils/api";   
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", data);
      
      // Handle API structure inconsistencies if necessary
      if (res.message && !res.token) {
        throw new Error(res.message);
      }

      login(res.token, res.user);

      // Redirect based on role
      if (res.user.role === "admin") navigate("/admin");
      else navigate("/student");

    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      
      {/* --- Left Column: The Form --- */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-20 xl:px-24 bg-white relative">
        
        {/* Brand Logo (Top Left) */}
        <div className="absolute top-8 left-8 sm:left-12 lg:left-20 flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-md">
            <span className="font-serif font-bold text-lg">C</span>
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">CourseMaster</span>
        </div>

        <div className="w-full max-w-sm mx-auto mt-12">
          <h2 className="text-4xl font-serif font-bold mb-2 text-slate-900">Welcome back</h2>
          <p className="text-slate-500 mb-10">Please enter your details to sign in.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Email Address
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

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                  Password
                </label>
                <Link 
                  to="/request-reset" 
                  className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-2"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none transition-all placeholder-stone-400"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-md hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-slate-900 font-bold hover:underline underline-offset-2">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* --- Right Column: Editorial Image (Hidden on Mobile) --- */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1497294815431-9365093b7331?auto=format&fit=crop&w=1200&q=80" 
          alt="Library" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-20 left-12 right-12 text-white">
          <p className="font-serif text-3xl leading-snug font-medium mb-4">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </p>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">— Malcolm X</p>
        </div>
      </div>

    </div>
  );
}