import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Menu, X, ChevronDown, 
    LayoutDashboard, Settings, LogOut, Command,
    BookOpen, Users, GraduationCap, 
    ShieldCheck, LineChart, Sparkles
} from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200/50 shadow-sm"
            : "bg-white border-transparent"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">
                C
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-slate-900">
              CourseMaster
            </span>
          </Link>

          {/* Desktop Nav - Mega Menu Triggers */}
          <div className="hidden md:flex items-center gap-8 h-full">
            <MegaMenuTrigger 
                label="Products" 
                menuId="products" 
                activeMenu={activeMenu} 
                setActiveMenu={setActiveMenu} 
            />
            <NavLink to="/mentors" label="Mentors" />
            <NavLink to="/pricing" label="Solutions" />
            <NavLink to="/resources" label="Resources" />
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 tracking-wide"
                >
                  SIGN IN
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 rounded-sm tracking-wide"
                >
                  BOOK A DEMO
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 py-1 hover:opacity-80 transition-opacity"
                >
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                        {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                </button>
                {/* Profile Dropdown logic remains similar but simplified style */}
                <ProfileDropdown 
                    isOpen={isProfileOpen} 
                    user={user} 
                    logout={logout}
                    close={() => setIsProfileOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mega Menu Content */}
        <AnimatePresence>
            {activeMenu === 'products' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto flex">
                        {/* Main Columns */}
                        <div className="flex-1 grid grid-cols-2 gap-12 p-10">
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                                    Learning
                                </h3>
                                <div className="space-y-6">
                                    <MenuLink 
                                        to="/courses" 
                                        icon={BookOpen} 
                                        title="Explore Courses" 
                                        desc="Browse thousands of expert-led courses" 
                                    />
                                    <MenuLink 
                                        to="/paths" 
                                        icon={LineChart} 
                                        title="Learning Paths" 
                                        desc="Guided curriculums for your career" 
                                    />
                                    <MenuLink 
                                        to="/certifications" 
                                        icon={ShieldCheck} 
                                        title="Certifications" 
                                        desc="Earn recognized credentials" 
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">
                                    Community
                                </h3>
                                <div className="space-y-6">
                                    <MenuLink 
                                        to="/mentors" 
                                        icon={Users} 
                                        title="Find Mentors" 
                                        desc="1-on-1 guidance from experts" 
                                    />
                                    <MenuLink 
                                        to="/forums" 
                                        icon={Sparkles} 
                                        title="Student Hub" 
                                        desc="Connect with fellow learners" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured Highglight Panel */}
                        <div className="w-80 bg-slate-50 p-10 border-l border-slate-100 hidden lg:block">
                            <div className="bg-blue-600 rounded-xl p-6 text-white shadow-xl shadow-blue-900/10 overflow-hidden relative group cursor-pointer">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors" />
                                <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-24 h-24 bg-black/10 rounded-full blur-xl" />
                                
                                <h4 className="font-bold text-lg mb-2 relative z-10">New: Business Pro</h4>
                                <p className="text-blue-100 text-sm mb-4 relative z-10 leading-relaxed">
                                    Unlock enterprise features for your entire team. 
                                </p>
                                <span className="inline-flex items-center text-xs font-bold uppercase tracking-wide bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors">
                                    Learn More
                                </span>
                            </div>
                            <div className="mt-8">
                                <h4 className="font-bold text-slate-900 mb-2">Latest Article</h4>
                                <p className="text-slate-500 text-sm hover:text-blue-600 cursor-pointer transition-colors">
                                    "How to master React in 2024 with these simple steps..."
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <MobileMenu 
                user={user} 
                logout={logout} 
                close={() => setIsMobileMenuOpen(false)} 
            />
        )}
      </AnimatePresence>
    </>
  );
}

function MegaMenuTrigger({ label, menuId, activeMenu, setActiveMenu }) {
    return (
        <button 
            className={`h-full flex items-center gap-1.5 text-sm font-semibold tracking-wide transition-colors ${
                activeMenu === menuId ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
            }`}
            onMouseEnter={() => setActiveMenu(menuId)}
            onClick={() => setActiveMenu(activeMenu === menuId ? null : menuId)}
        >
            {label}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === menuId ? "rotate-180" : ""}`} />
        </button>
    )
}

function NavLink({ to, label }) {
    return (
        <Link 
            to={to} 
            className="h-full flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 tracking-wide transition-colors"
        >
            {label}
        </Link>
    );
}

function MenuLink({ to, icon: Icon, title, desc }) {
    return (
        <Link to={to} className="flex items-start gap-4 group">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {desc}
                </p>
            </div>
        </Link>
    )
}

// Simplified for brevity, but functional
function ProfileDropdown({ isOpen, user, logout, close }) {
    if (!isOpen) return null;
    return (
         <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
                <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <div className="p-1">
                {user.role === 'student' && <DropdownLink to="/student" icon={LayoutDashboard} label="Dashboard" onClick={close} />}
                {user.role === 'admin' && <DropdownLink to="/admin" icon={Command} label="Admin" onClick={close} />}
                <DropdownLink to="/settings" icon={Settings} label="Settings" onClick={close} />
                <button
                    onClick={() => { logout(); close(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign out
                </button>
            </div>
         </div>
    )
}

function DropdownLink({ to, icon: Icon, label, onClick }) {
    return (
        <Link 
            to={to} 
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md transition-colors"
        >
            <Icon className="w-4 h-4" />
            {label}
        </Link>
    )
}

function MobileMenu({ user, logout, close }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col pt-20 px-6 pb-6 md:hidden overflow-y-auto"
        >
            <button onClick={close} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6" />
            </button>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Products</h3>
                    <div className="space-y-4 pl-2">
                        <MobileLink to="/courses" label="Explore Courses" />
                        <MobileLink to="/paths" label="Learning Paths" />
                        <MobileLink to="/certifications" label="Certifications" />
                    </div>
                </div>
                
                <div className="h-px bg-slate-100" />
                
                <MobileLink to="/mentors" label="Find Mentors" />
                <MobileLink to="/pricing" label="Solutions" />

                {user ? (
                    <>
                        <div className="h-px bg-slate-100" />
                        <div className="flex items-center gap-4 py-2">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
                                {user.name?.[0]}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{user.name}</p>
                                <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                        </div>
                        <MobileLink to={user.role === 'admin' ? '/admin' : '/student'} label="Dashboard" />
                        <button onClick={logout} className="w-full text-left py-2 text-red-600 font-semibold">
                            Sign Out
                        </button>
                    </>
                ) : (
                    <div className="pt-4 grid gap-3">
                        <Link to="/login" className="flex items-center justify-center w-full py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-sm">
                            SIGN IN
                        </Link>
                        <Link to="/register" className="flex items-center justify-center w-full py-3 bg-blue-600 text-white font-bold rounded-sm shadow-lg shadow-blue-600/20">
                            BOOK A DEMO
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

function MobileLink({ to, label }) {
    return (
        <Link to={to} className="block py-2 text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
            {label}
        </Link>
    )
}