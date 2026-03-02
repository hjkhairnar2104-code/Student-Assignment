import { useSelector } from "react-redux";
import AssignmentList from "./student/AssignmentList";
import Logout from "../components/Logout";

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);

  const year = user?.year;
  const semester = user?.semester;

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
                  🎓
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Student Dashboard
                </h1>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm flex-wrap">
                {user?.name && (
                  <span className="font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Welcome, {user.name}
                  </span>
                )}
                {year && (
                  <span className="font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    Year {year} {semester ? `• Semester ${semester}` : ''}
                  </span>
                )}
                <span className="text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Track your progress and submit assignments
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <div className="md:hidden">
                <Logout />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AssignmentList />
      </div>

    </div>
  );
}