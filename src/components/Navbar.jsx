import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
  const role = localStorage.getItem("role");

  return (
    <nav
      className="
        sticky top-0 z-50
        flex items-center justify-between
        px-8 py-4
        bg-gradient-to-r from-[#0b1020] via-[#111836] to-[#0b1020]
        border-b border-slate-700/50
        text-white
        backdrop-blur
      "
    >
      {/* ===== LEFT (Brand) ===== */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">📘</span>
        <span className="text-lg font-bold tracking-wide">
          Student Assignment
        </span>
      </div>

      {/* ===== CENTER (Links) ===== */}
      <div className="flex items-center gap-8 text-sm font-medium">
        {role === "ROLE_STUDENT" && (
          <Link
            to="/student"
            className="
              relative group
              hover:text-indigo-400 transition
            "
          >
            Dashboard
            <span
              className="
                absolute -bottom-1 left-0
                w-0 h-[2px] bg-indigo-500
                transition-all group-hover:w-full
              "
            />
          </Link>
        )}

        {role === "ROLE_TEACHER" && (
          <>
            <Link
              to="/teacher"
              className="
                relative group
                hover:text-indigo-400 transition
              "
            >
              Dashboard
              <span
                className="
                  absolute -bottom-1 left-0
                  w-0 h-[2px] bg-indigo-500
                  transition-all group-hover:w-full
                "
              />
            </Link>

            <Link
              to="/teacher/create-assignment"
              className="
                px-4 py-2 rounded-xl
                bg-emerald-600 hover:bg-emerald-500
                transition
              "
            >
              ➕ Create Assignment
            </Link>
          </>
        )}
      </div>

      {/* ===== RIGHT (Actions) ===== */}
      <div className="flex items-center gap-4">
        <span
          className="
            text-xs px-3 py-1 rounded-full
            bg-indigo-600/20 text-indigo-300
            border border-indigo-500/30
          "
        >
          {role === "ROLE_STUDENT" ? "Student" : "Teacher"}
        </span>

        <Logout />
      </div>
    </nav>
  );
}