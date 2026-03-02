import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";

export default function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isCreateRoute = location.pathname.includes("create-assignment");

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 text-slate-900 pb-12">

      {/* ===== HEADER ===== */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            {/* Title & Welcome */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-2xl shadow-sm">
                  🧑‍🏫
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Teacher Dashboard
                </h1>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                {user?.name && (
                  <span className="font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Welcome back, {user.name}
                  </span>
                )}
                <span className="text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Create and manage assignments
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {!isCreateRoute && (
                <Link
                  to="create-assignment"
                  className="clean-button h-10 px-5 relative overflow-hidden group shadow-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    New Assignment
                  </span>
                </Link>
              )}

              <div className="md:hidden">
                <Logout />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Outlet />
      </div>
    </div>
  );
}