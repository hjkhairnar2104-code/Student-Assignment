import AssignmentList from "./student/AssignmentList";
import useTheme from "./student/useTheme";
import Logout from "../components/Logout";

export default function StudentDashboard() {
  const { theme, toggleTheme } = useTheme();

  const year = localStorage.getItem("year");
  const semester = localStorage.getItem("semester");

  return (
    <div
      className={`
        min-h-screen transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-[#0b1020] via-[#111836] to-[#0b1020] text-white"
            : "bg-gradient-to-br from-[#f5f7fb] via-white to-[#eef1f8] text-gray-900"
        }
      `}
    >
      {/* ===== Header ===== */}
      <div
        className={`
          flex flex-wrap justify-between items-center gap-4
          px-8 py-5 border-b
          ${
            theme === "dark"
              ? "border-slate-700/50"
              : "border-slate-200"
          }
        `}
      >
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            🎓 Student Dashboard
          </h1>
          <p className="text-sm opacity-70">
            View & submit your assignments
          </p>

          {year && semester && (
            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-indigo-600 text-white">
              Year {year} • Semester {semester}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`
              px-4 py-2 rounded-xl font-medium transition
              ${
                theme === "dark"
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }
            `}
          >
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>

          <Logout />
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="px-8 py-8">
        <AssignmentList />
      </div>
    </div>
  );
}