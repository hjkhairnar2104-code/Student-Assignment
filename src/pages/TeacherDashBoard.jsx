import { Link, Outlet } from "react-router-dom";
import Logout from "../components/Logout";

export default function TeacherDashboard() {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-[#0b1020] via-[#111836] to-[#0b1020]
        text-white
      "
    >
      {/* ===== Header ===== */}
      <div className="flex flex-wrap justify-between items-center gap-4 px-8 py-5 border-b border-slate-700/50">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            🧑‍🏫 Teacher Dashboard
          </h1>
          <p className="text-sm opacity-70">
            Create and manage assignments
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="create-assignment"
            className="
              px-4 py-2 rounded-xl font-medium
              bg-emerald-600 hover:bg-emerald-500
              transition
            "
          >
            ➕ Create Assignment
          </Link>

          <Logout />
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
}