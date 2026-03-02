import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const isAuthenticated = !!role;
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef(null);

  const isActive = (path) => location.pathname.startsWith(path);

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      // In a real app we'd trigger a router navigation here, e.g., navigate(`/search?q=${searchQuery}`)
      console.log("Searching for:", searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className="
        sticky top-0 z-50 w-full
        bg-white
        border-b border-slate-200 shadow-sm
        text-slate-900
        transition-all duration-300
      "
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">

          {/* ===== LEFT (Brand) ===== */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="text-lg font-bold">V</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Vault
            </span>
          </Link>

          {/* ===== CENTER (Desktop Links) ===== */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              to="/"
              className={`relative px-1 py-2 transition-colors duration-300 ${isActive('/') && location.pathname === '/' ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Home
            </Link>

            {/* Course Year Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors duration-300">
                Course Year
                <svg className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {servicesOpen && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 rounded-md bg-white border border-slate-200 shadow-md py-1 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95">
                  <DropdownItem to="/courseyear/1">First Year</DropdownItem>
                  <DropdownItem to="/courseyear/2">Second Year</DropdownItem>
                  <DropdownItem to="/courseyear/3">Third Year</DropdownItem>
                  <DropdownItem to="/courseyear/4">Fourth Year</DropdownItem>
                </div>
              )}
            </div>

            <Link to="/aboutus" className={`relative px-1 py-2 transition-colors duration-300 ${isActive('/aboutus') ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}>
              About Us
            </Link>

            <Link to="/contactus" className={`relative px-1 py-2 transition-colors duration-300 ${isActive('/contactus') ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}>
              Contact Us
            </Link>

            {/* Role-based Links */}
            {role === "ROLE_STUDENT" && (
              <Link to="/student/assignments" className={`relative px-1 py-2 transition-colors duration-300 ${isActive('/student') ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}>
                My Assignments
              </Link>
            )}

            {role === "ROLE_TEACHER" && (
              <Link to="/teacher/create-assignment" className={`relative px-1 py-2 transition-colors duration-300 ${isActive('/teacher/create-assignment') ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}>
                Create Assignment
              </Link>
            )}
          </div>

          {/* ===== RIGHT (Actions & Search) ===== */}
          <div className="flex items-center gap-4 relative" ref={searchRef}>

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>

            {/* Search Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 md:right-auto md:left-0 top-12 w-64 md:w-[320px] rounded-md bg-white border border-slate-200 p-3 shadow-md animate-in fade-in slide-in-from-top-2 origin-top-right">
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search courses..."
                    className="w-full bg-white border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all placeholder-slate-400"
                  />
                  <svg className="absolute left-3 top-2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
              </div>
            )}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="hidden lg:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {role === "ROLE_STUDENT" ? "Student" : "Teacher"}
                </span>
                <Logout />
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="clean-button h-9 px-4">
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-md animate-in slide-in-from-top-2 origin-top">
          <div className="px-6 py-6 flex flex-col gap-5">
            <MobileNav to="/" setOpen={setMobileOpen}>Home</MobileNav>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between text-slate-600 hover:text-slate-900 font-medium"
              >
                Course Year
                <svg className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {servicesOpen && (
                <div className="ml-4 flex flex-col gap-3 pl-4 border-l border-slate-200">
                  <MobileNav to="/courseyear/1" setOpen={setMobileOpen} className="text-sm font-normal text-slate-500">First Year</MobileNav>
                  <MobileNav to="/courseyear/2" setOpen={setMobileOpen} className="text-sm font-normal text-slate-500">Second Year</MobileNav>
                  <MobileNav to="/courseyear/3" setOpen={setMobileOpen} className="text-sm font-normal text-slate-500">Third Year</MobileNav>
                  <MobileNav to="/courseyear/4" setOpen={setMobileOpen} className="text-sm font-normal text-slate-500">Fourth Year</MobileNav>
                </div>
              )}
            </div>

            <MobileNav to="/aboutus" setOpen={setMobileOpen}>About Us</MobileNav>
            <MobileNav to="/contactus" setOpen={setMobileOpen}>Contact Us</MobileNav>

            {isAuthenticated ? (
              <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-4">
                <MobileNav to={`/${role === 'ROLE_STUDENT' ? 'student/assignments' : 'teacher/create-assignment'}`} setOpen={setMobileOpen} className="text-slate-900">
                  {role === 'ROLE_STUDENT' ? 'My Assignments' : 'Create Assignment'}
                </MobileNav>
                <div onClick={() => setMobileOpen(false)}>
                  <Logout />
                </div>
              </div>
            ) : (
              <div className="pt-4 mt-2 border-t border-slate-200 flex flex-col gap-3">
                <MobileNav to="/login" setOpen={setMobileOpen} className="font-normal text-slate-600">Log in</MobileNav>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="clean-button w-full text-center">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ===== Reusable Components ===== */

const DropdownItem = ({ to, children }) => (
  <Link
    to={to}
    className="relative flex items-center px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
  >
    {children}
  </Link>
);

const MobileNav = ({ to, setOpen, children, className = "" }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className={`text-slate-600 hover:text-slate-900 font-medium transition-colors ${className}`}
  >
    {children}
  </Link>
);