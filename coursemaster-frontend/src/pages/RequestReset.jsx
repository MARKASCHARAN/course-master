import { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/request-reset", { email });
      setMessage(res.message || "If that email exists, we have sent a reset link.");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      
      {/* --- Left Column: The Form --- */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-20 xl:px-24 bg-white relative">
        
        {/* Brand Logo */}
        <div className="absolute top-8 left-8 sm:left-12 lg:left-20 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-md">
                <span className="font-serif font-bold text-lg">C</span>
            </div>
            <span className="font-serif font-bold text-xl tracking-tight">CourseMaster</span>
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto mt-12">
            
          {/* Conditional Rendering: Success vs Form */}
          {message ? (
            <div className="text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900">Check your inbox</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We have sent password reset instructions to <span className="font-bold text-slate-900">{email}</span>.
              </p>
              <div className="space-y-4">
                <button 
                    onClick={() => setMessage("")} 
                    className="w-full bg-white border border-slate-200 text-slate-900 font-medium py-3 rounded-md hover:bg-slate-50 transition"
                >
                    Try another email
                </button>
                <Link to="/login" className="block text-sm text-slate-500 hover:text-slate-900">
                    Skip, I remembered my password
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-serif font-bold mb-3 text-slate-900">Reset Password</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </p>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-slate-900 text-white font-medium py-3.5 rounded-md hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 active:scale-[0.98]"
                >
                  {loading ? "Sending Link..." : "Send Reset Instructions"}
                </button>
              </form>

              <div className="mt-8 text-center border-t border-stone-100 pt-6">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Return to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- Right Column: Atmospheric Image --- */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=1200&q=80" 
          alt="Minimalist Architecture" 
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-20 left-12 right-12 text-white">
          <p className="font-serif text-3xl leading-snug font-medium mb-4">
            "Discovery consists of seeing what everybody has seen and thinking what nobody has thought."
          </p>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">— Albert Szent-Györgyi</p>
        </div>
      </div>

    </div>
  );
}