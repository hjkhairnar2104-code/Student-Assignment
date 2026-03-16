import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Logout from "../components/Logout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);
  const assignments = useSelector((state) => state.assignment.assignments || []);
  const location = useLocation();
  const isCreateRoute = location.pathname.includes("create-assignment");

  // Build chart data: assignment count per year
  const chartData = [1, 2, 3, 4].map((yr) => ({
    year: `Year ${yr}`,
    count: assignments.filter((a) => Number(a.year) === yr).length,
  }));
  const BAR_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#34d399"];

  const showChart = !isCreateRoute && assignments.length > 0;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/80 text-slate-900 pb-12">

      {/* ── Header ── */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20"
                >
                  🧑‍🏫
                </motion.div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Teacher Dashboard
                </h1>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                {user?.name && (
                  <span className="font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    Welcome back, {user.name}
                  </span>
                )}
                <span className="text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Create and manage assignments
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {!isCreateRoute && (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="create-assignment"
                    className="clean-button h-10 px-5 relative overflow-hidden group shadow-lg shadow-indigo-500/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      New Assignment
                    </span>
                  </Link>
                </motion.div>
              )}
              <div className="md:hidden"><Logout /></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recharts assignment distribution (only when assignments exist + not on create) ── */}
      {showChart && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg p-6 mb-8">
            <h2 className="text-base font-bold text-slate-900 mb-1">Assignment Distribution</h2>
            <p className="text-sm text-slate-500 mb-5">Published assignments by year</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} barSize={32}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} width={28} />
                <Tooltip
                  cursor={{ fill: "rgba(99,102,241,0.05)", radius: 8 }}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "8px 14px" }}
                  labelStyle={{ fontWeight: 700, color: "#1e293b" }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* ── Page Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Outlet />
      </div>
    </div>
  );
}