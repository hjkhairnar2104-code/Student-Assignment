import { isNewAssignment, getCountdown } from "./AssignmentUtils";

export default function AssignmentCard({ assignment }) {
  const countdown = getCountdown(assignment.deadline);
  const expired = countdown === "Expired";

  return (
    <div
      className="
        relative rounded-2xl p-6
        bg-gradient-to-br
        from-white/90 to-white/70
        dark:from-[#11162a] dark:to-[#0b1020]
        backdrop-blur-xl
        border border-black/5 dark:border-white/10
        shadow-md hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
        group
      "
    >
      {/* ===== NEW badge ===== */}
      {isNewAssignment(assignment.createdAt) && (
        <span
          className="
            absolute top-4 right-4
            text-xs px-2 py-1 rounded-full
            bg-green-500 text-white
            animate-pulse
          "
        >
          NEW
        </span>
      )}

      {/* ===== Header ===== */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold leading-snug">
          {assignment.title}
        </h3>
      </div>

      {/* ===== Meta ===== */}
      <div className="mt-1 text-xs opacity-70 space-y-1">
        <p>👨‍🏫 {assignment.teacherName}</p>
        <p>
          🎓 Year {assignment.year}
          {assignment.semester && ` • Sem ${assignment.semester}`}
        </p>
      </div>

      {/* ===== Description ===== */}
      <p className="text-sm mt-3 opacity-80 line-clamp-2">
        {assignment.description}
      </p>

      {/* ===== Deadline ===== */}
      <div className="mt-4 flex items-center gap-2 text-sm">
        ⏳
        <span
          className={`font-medium ${
            expired ? "text-red-500" : "text-indigo-500"
          }`}
        >
          {countdown}
        </span>
      </div>

      {/* ===== Progress Bar ===== */}
      <div className="mt-4">
        <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
          <div
            className={`
              h-full transition-all duration-500
              ${expired ? "bg-red-500" : "bg-indigo-500"}
            `}
            style={{ width: expired ? "100%" : "70%" }}
          />
        </div>

        <div className="flex justify-between text-xs mt-1 opacity-70">
          <span>Status</span>
          <span className={expired ? "text-red-500" : "text-indigo-500"}>
            {expired ? "Closed" : assignment.codeVisible ? "Open" : "Locked"}
          </span>
        </div>
      </div>

      {/* ===== PDF Button ===== */}
      {assignment.pdfUrl && (
        <a
          href={`http://localhost:8080${assignment.pdfUrl}`}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex items-center justify-center gap-2
            mt-5 w-full px-4 py-2 rounded-xl
            bg-indigo-600 hover:bg-indigo-500
            text-white text-sm font-medium
            transition
            group-hover:scale-[1.02]
          "
        >
          📄 View Assignment PDF
        </a>
      )}
    </div>
  );
}