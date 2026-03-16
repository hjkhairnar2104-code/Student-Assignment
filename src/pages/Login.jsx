import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import RippleButton from "../components/RippleButton";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 200, damping: 24 }
  }),
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();
      if (res.role === "ROLE_TEACHER") navigate("/teacher");
      else if (res.role === "ROLE_STUDENT") navigate("/student");
      else setError("Role not assigned. Contact admin.");
    } catch (err) {
      setError(err || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16 bg-transparent">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* ── LEFT: Illustration Panel ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col justify-center px-6"
        >
          {/* Decorative Assignment Illustration */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 rounded-[3rem] blur-3xl" />
            <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl shadow-black/50">
              {/* Mini dashboard preview */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-indigo-600 to-violet-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 border border-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">StudyStash — Portal</p>
                  <p className="text-base font-bold text-white tracking-tight">Student Dashboard</p>
                </div>
              </div>
              {[
                { title: "ML Assignment #3", tag: "Due Today", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
                { title: "DSA Lab Report", tag: "Submitted", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                { title: "OS Mini Project", tag: "Pending", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 mb-3 group hover:border-white/10 transition-all duration-300"
                >
                  <p className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{item.title}</p>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${item.color}`}>{item.tag}</span>
                </motion.div>
              ))}
              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex justify-between text-[11px] text-slate-400 mb-2 uppercase font-bold tracking-wider">
                  <span>Weekly Progress</span><span className="font-bold text-indigo-400">1 / 3 Done</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "33%" }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Manage smarter.</h2>
            <p className="text-slate-400 text-base max-w-xs mx-auto leading-relaxed">Track deadlines, submit work, and stay ahead — all in one clean workspace.</p>
          </div>
        </motion.div>

        {/* ── RIGHT: Login Form ──────────────────────────────────────── */}
        <div className="w-full">
          {/* Brand */}
          <motion.div
            custom={0} variants={itemVariants} initial="hidden" animate="visible"
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 via-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center mb-5 shadow-2xl shadow-indigo-500/40 border border-white/20"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </motion.div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h2>
            <p className="text-slate-400 mt-1.5 text-sm">Sign in to your StudyStash account</p>
          </motion.div>

          {/* Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/40 p-8 sm:p-10"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1 block">Email Address</label>
                <motion.input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.5)" }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-md"
                />
              </motion.div>

              {/* Password */}
              <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible" className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider ml-1 block">Password</label>
                  <Link to="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors tracking-tight">Forgot password?</Link>
                </div>
                <div className="relative">
                  <motion.input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    whileFocus={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.5)" }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all duration-300 backdrop-blur-md pr-12"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    {showPw ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Error */}
              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible" className="pt-2">
                <RippleButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed border border-indigo-400/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Signing in...
                      </>
                    ) : "Sign in"}
                  </span>
                </RippleButton>
              </motion.div>
            </form>
          </motion.div>

          <motion.p
            custom={4} variants={itemVariants} initial="hidden" animate="visible"
            className="text-center mt-8 text-sm text-slate-400"
          >
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign up free
            </Link>
          </motion.p>
        </div>
      </div>
    </div>
  );
}