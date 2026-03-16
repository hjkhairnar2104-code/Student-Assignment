import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "../components/RippleButton";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, type: "spring", stiffness: 200, damping: 24 }
  }),
};

const GlowInput = ({ ...props }) => (
  <motion.input
    whileFocus={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.5)" }}
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-md"
    {...props}
  />
);

const GlowSelect = ({ children, ...props }) => (
  <select
    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer appearance-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23818cf8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
      backgroundPosition: "right 0.75rem center",
      backgroundSize: "1.25em 1.25em",
      backgroundRepeat: "no-repeat",
    }}
    {...props}
  >
    {children}
  </select>
);

const FiUser = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const FiBookOpen = ({ className }) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>);

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "", year: "", semester: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.role) { alert("Please select a role"); return; }
    try {
      const payload = { name: form.name, email: form.email, password: form.password, role: form.role };
      if (form.role === "ROLE_STUDENT") {
        payload.year = parseInt(form.year, 10);
        payload.semester = form.semester ? parseInt(form.semester, 10) : null;
      }
      await dispatch(signupUser(payload)).unwrap();
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) { alert(err); }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-transparent">
      <div className="w-full max-w-lg">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-7 text-white"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 via-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-indigo-500/40 border border-white/20"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
          </motion.div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Create your account</h2>
          <p className="text-slate-400 mt-1.5 text-sm">Join the platform to manage submissions</p>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/40 p-8 sm:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Full Name</label>
              <GlowInput name="name" value={form.name} onChange={handleChange} required placeholder="Abhishek Nanaware" />
            </motion.div>

            {/* Email */}
            <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
              <GlowInput name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
            </motion.div>

            {/* Password */}
            <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Password</label>
              <GlowInput name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
            </motion.div>

            {/* Role — Pill Toggle */}
            <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">I am a...</label>
              <div className="flex gap-4">
                {[
                  { value: "ROLE_STUDENT", label: "Student", icon: FiUser },
                  { value: "ROLE_TEACHER", label: "Teacher", icon: FiBookOpen },
                ].map(({ value, label, icon: Icon }) => (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => setForm({ ...form, role: value })}
                    whileTap={{ scale: 0.96 }}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border transition-all duration-300 flex items-center justify-center gap-2 ${
                      form.role === value
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 border-transparent text-white shadow-xl shadow-indigo-500/30"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Conditional Student Fields */}
            <AnimatePresence>
              {form.role === "ROLE_STUDENT" && (
                <motion.div
                  key="student-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="overflow-hidden space-y-5"
                >
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Course Year</label>
                    <GlowSelect name="year" value={form.year} onChange={handleChange} required>
                      <option value="">Select Year</option>
                      <option value="1">First Year</option>
                      <option value="2">Second Year</option>
                      <option value="3">Third Year</option>
                      <option value="4">Final Year</option>
                    </GlowSelect>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1">Semester</label>
                    <GlowSelect name="semester" value={form.semester} onChange={handleChange} required>
                      <option value="">Select Semester</option>
                      <option value="1">Semester 1 (Odd)</option>
                      <option value="2">Semester 2 (Even)</option>
                    </GlowSelect>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible" className="pt-2">
              <RippleButton
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 border border-indigo-400/30"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating account...
                    </>
                  ) : "Create Account"}
                </span>
              </RippleButton>
            </motion.div>

          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="text-center mt-8 text-sm text-slate-400"
        >
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Sign in</Link>
        </motion.p>
      </div>
    </div>
  );
}