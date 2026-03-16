import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiArchive } from "react-icons/fi";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { animated } from "@react-spring/web";
import Logout from "./Logout";
import MagneticElement from "./MagneticElement";
import useMagnetic from "../hooks/useMagnetic";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const isAuthenticated = !!role;
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);
  const servicesRef = useRef(null);

  // Magnetic logo
  const { ref: logoRef, style: logoStyle, handlers: logoHandlers } = useMagnetic(0.3);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
  });

  const isActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "bg-[#050510]/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Scroll Progress Bar - THE ONE LINE */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-indigo-500 to-violet-600 origin-left z-[60]"
        style={{ scaleX }}
      />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">

          {/* ===== BRAND ===== */}
          <Link to="/" className="flex items-center gap-2 group relative z-10">
            <animated.div
              ref={logoRef}
              style={logoStyle}
              {...logoHandlers}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-indigo-600 to-violet-700 text-white shadow-xl shadow-indigo-500/30 cursor-pointer select-none border border-white/20"
            >
              <FiArchive className="w-5 h-5" />
            </animated.div>
            <motion.span
              whileHover={{ x: 2 }}
              className="text-lg font-bold text-white"
            >
              StudyStash
            </motion.span>
          </Link>

          {/* ===== DESKTOP NAV ===== */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>

            {/* Course Year dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium"
              >
                Course Year
                <Chevron open={servicesOpen} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-[#13132b]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    {["First Year", "Second Year", "Third Year", "Fourth Year"].map((label, i) => (
                      <DropdownItem
                        key={i}
                        to={`/courseyear/${i + 1}`}
                        onClick={() => setServicesOpen(false)}
                        delay={i * 40}
                      >
                        {label}
                      </DropdownItem>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/aboutus" active={isActive("/aboutus")}>About Us</NavLink>
            <NavLink to="/contactus" active={isActive("/contactus")}>Contact Us</NavLink>

            {role === "ROLE_STUDENT" && (
              <NavLink to="/student/assignments" active={isActive("/student")}>My Assignments</NavLink>
            )}
            {role === "ROLE_TEACHER" && (
              <>
                <NavLink to="/teacher/assignments" active={isActive("/teacher/assignments")}>My Assignments</NavLink>
                <NavLink to="/teacher/create-assignment" active={isActive("/teacher/create-assignment")}>Create</NavLink>
              </>
            )}
          </div>

          {/* ===== RIGHT ===== */}
          <div className="flex items-center gap-3" ref={searchRef}>
            {/* Search button */}
            <MagneticElement stiffness={250} damping={12}>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(99,102,241,0.05)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-indigo-400 transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </motion.button>
            </MagneticElement>

            {/* Search popover */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                   className="absolute right-4 top-20 w-72 bg-[#13132b]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl shadow-black/50 max-w-[calc(100vw-2rem)]"
                >
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      placeholder="Search assignments, subjects…"
                      className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 px-1">Press Enter to search</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30"
                >
                  {role === "ROLE_STUDENT" ? "🎓 Student" : "📚 Teacher"}
                </motion.span>
                <Logout />
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
            >
              <motion.div
                animate={mobileOpen ? "open" : "closed"}
                className="flex flex-col gap-1.5 w-5"
              >
                <motion.span
                  variants={{ open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.25 }}
                  className="block w-full h-0.5 bg-white rounded"
                />
                <motion.span
                  variants={{ open: { opacity: 0, x: -8 }, closed: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.25 }}
                  className="block w-full h-0.5 bg-white rounded"
                />
                <motion.span
                  variants={{ open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } }}
                  transition={{ duration: 0.25 }}
                  className="block w-full h-0.5 bg-white rounded"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="md:hidden bg-[#0d0d1a]/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl shadow-black overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {[
                { to: "/", label: "Home" },
                { to: "/aboutus", label: "About Us" },
                { to: "/contactus", label: "Contact Us" },
              ].map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <MobileNav to={to} setOpen={setMobileOpen}>{label}</MobileNav>
                </motion.div>
              ))}

              {/* Mobile Course Year */}
              <div>
                <button
                  onClick={() => setMobileCourseOpen(!mobileCourseOpen)}
                  className="flex items-center justify-between w-full text-slate-300 hover:text-white font-medium py-1"
                >
                  Course Year <Chevron open={mobileCourseOpen} />
                </button>
                <AnimatePresence>
                  {mobileCourseOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 flex flex-col gap-3 pl-4 border-l border-white/10 ml-2 overflow-hidden"
                    >
                      {["First Year", "Second Year", "Third Year", "Fourth Year"].map((label, i) => (
                        <MobileNav key={i} to={`/courseyear/${i + 1}`} setOpen={setMobileOpen}>
                          {label}
                        </MobileNav>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {role === "ROLE_STUDENT" && (
                <MobileNav to="/student/assignments" setOpen={setMobileOpen}>My Assignments</MobileNav>
              )}
              {role === "ROLE_TEACHER" && (
                <>
                  <MobileNav to="/teacher/assignments" setOpen={setMobileOpen}>My Assignments</MobileNav>
                  <MobileNav to="/teacher/create-assignment" setOpen={setMobileOpen}>Create Assignment</MobileNav>
                </>
              )}

              {!isAuthenticated ? (
                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white border border-white/10 hover:bg-white/5 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/10">
                  <Logout />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══ Sub-components ═══════════════════════════════════════════ */

const NavLink = ({ to, active, children }) => (
  <Link
    to={to}
    className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
      active ? "text-white" : "text-slate-400 hover:text-white"
    }`}
  >
    {children}
    {active && (
      <motion.span
        layoutId="nav-underline"
        className="absolute -bottom-[26px] left-0 w-full h-[2px] bg-indigo-500 rounded-full"
      />
    )}
  </Link>
);

const DropdownItem = ({ to, children, onClick, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: delay / 1000 }}
  >
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
    >
      {children}
    </Link>
  </motion.div>
);

const MobileNav = ({ to, setOpen, children }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className="text-slate-300 hover:text-white font-medium transition-colors py-1"
  >
    {children}
  </Link>
);

const Chevron = ({ open }) => (
  <motion.svg
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.25 }}
    className="w-4 h-4 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </motion.svg>
);