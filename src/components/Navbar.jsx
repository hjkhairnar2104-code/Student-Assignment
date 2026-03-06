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
      console.log("Searching for:", searchQuery);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">

          {/* ===== BRAND ===== */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold">
              V
            </div>
            <span className="text-lg font-bold">Vault</span>
          </Link>

          {/* ===== DESKTOP NAV ===== */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">

            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>

            {/* Course Year */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-slate-500 hover:text-slate-900">
                Course Year
                <Chevron open={servicesOpen} />
              </button>

              {servicesOpen && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-white border rounded-md shadow-md">
                  <DropdownItem to="/courseyear/1">First Year</DropdownItem>
                  <DropdownItem to="/courseyear/2">Second Year</DropdownItem>
                  <DropdownItem to="/courseyear/3">Third Year</DropdownItem>
                  <DropdownItem to="/courseyear/4">Fourth Year</DropdownItem>
                </div>
              )}
            </div>

            <NavLink to="/aboutus" active={isActive("/aboutus")}>About Us</NavLink>
            <NavLink to="/contactus" active={isActive("/contactus")}>Contact Us</NavLink>

            {/* ROLE LINKS */}
            {role === "ROLE_STUDENT" && (
              <NavLink to="/student/assignments" active={isActive("/student")}>
                My Assignments
              </NavLink>
            )}

            {role === "ROLE_TEACHER" && (
              <>
                <NavLink to="/teacher/assignments" active={isActive("/teacher/assignments")}>
                  My Assignments
                </NavLink>
                <NavLink to="/teacher/create-assignment" active={isActive("/teacher/create-assignment")}>
                  Create Assignment
                </NavLink>
              </>
            )}
          </div>

          {/* ===== RIGHT ===== */}
          <div className="flex items-center gap-4" ref={searchRef}>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-slate-100"
            >
              🔍
            </button>

            {searchOpen && (
              <div className="absolute right-4 top-20 w-64 bg-white border rounded-md p-3 shadow-md">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search..."
                  className="w-full border rounded-md px-3 py-1.5 text-sm"
                />
              </div>
            )}

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">
                  {role === "ROLE_STUDENT" ? "Student" : "Teacher"}
                </span>
                <Logout />
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <Link to="/login">Login</Link>
                <Link to="/signup" className="clean-button">Sign up</Link>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="px-6 py-6 flex flex-col gap-4">

            <MobileNav to="/" setOpen={setMobileOpen}>Home</MobileNav>
            <MobileNav to="/courseyear/1" setOpen={setMobileOpen}>First Year</MobileNav>
            <MobileNav to="/courseyear/2" setOpen={setMobileOpen}>Second Year</MobileNav>
            <MobileNav to="/courseyear/3" setOpen={setMobileOpen}>Third Year</MobileNav>
            <MobileNav to="/courseyear/4" setOpen={setMobileOpen}>Fourth Year</MobileNav>
            <MobileNav to="/aboutus" setOpen={setMobileOpen}>About Us</MobileNav>
            <MobileNav to="/contactus" setOpen={setMobileOpen}>Contact Us</MobileNav>

            {role === "ROLE_STUDENT" && (
              <MobileNav to="/student/assignments" setOpen={setMobileOpen}>
                My Assignments
              </MobileNav>
            )}

            {role === "ROLE_TEACHER" && (
              <>
                <MobileNav to="/teacher/assignments" setOpen={setMobileOpen}>
                  My Assignments
                </MobileNav>
                <MobileNav to="/teacher/create-assignment" setOpen={setMobileOpen}>
                  Create Assignment
                </MobileNav>
              </>
            )}

            {isAuthenticated ? <Logout /> : null}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ===== Helpers ===== */

const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`px-1 py-2 ${
      active ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-900"
    }`}
  >
    {children}
  </Link>
);

const DropdownItem = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
  >
    {children}
  </Link>
);

const MobileNav = ({ to, setOpen, children }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="text-slate-600 hover:text-slate-900 font-medium"
  >
    {children}
  </Link>
);

const Chevron = ({ open }) => (
  <svg
    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);