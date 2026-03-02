import { useState } from "react";
import { isNewAssignment, getCountdown } from "./AssignmentUtils";
import API from "../../api/api";

// Deterministically pick an accent hue from the subject name
const SUBJECT_COLORS = [
  {
    bg: "from-violet-500 to-indigo-600",
    light: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    bg: "from-sky-500 to-cyan-600",
    light: "bg-sky-50 text-sky-700 border-sky-200",
  },
  {
    bg: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    bg: "from-amber-500 to-orange-600",
    light: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    bg: "from-rose-500 to-pink-600",
    light: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    bg: "from-fuchsia-500 to-purple-600",
    light: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  },
];

function getAccent(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return SUBJECT_COLORS[Math.abs(h) % SUBJECT_COLORS.length];
}

export default function AssignmentCard({ assignment }) {
  const [loading, setLoading] = useState(false);

  const countdown = getCountdown(assignment.deadline);
  const expired = countdown === "Expired";

  const assignmentId = assignment.id ?? assignment.assignmentId;
  const accent = getAccent(assignment.subject || assignment.title);

  // ── Helpers ────────────────────────────────────────────────
  const fetchBlob = async (url) => {
    const res = await API.get(url, {
      responseType: "blob",
    });
    return res;
  };

  const handleView = async () => {
    if (!assignmentId) {
      alert("Assignment ID missing.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchBlob(
        `/file/assignment-pdf/view/${assignmentId}`,
      );
      const url = URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" }),
      );
      window.open(url, "_blank");
    } catch {
      alert("Failed to open PDF.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!assignmentId) {
      alert("Assignment ID missing.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchBlob(
        `/file/assignment-pdf/${assignmentId}`,
      );
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("download", `assignment-${assignmentId}.pdf`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      alert("Failed to download PDF.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* ── NEW badge ── */}
      {isNewAssignment(assignment.createdAt) && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white tracking-wide shadow-sm">
          NEW
        </span>
      )}

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Subject + Year chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {assignment.subject && (
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${accent.light}`}
            >
              {assignment.subject}
            </span>
          )}
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Yr {assignment.year}
            {assignment.semester ? ` · Sem ${assignment.semester}` : ""}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 pr-6 mb-1">
          {assignment.title}
        </h3>

        {/* Teacher */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {assignment.teacherName || "Teacher"}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1 mb-4">
          {assignment.description || "No description provided."}
        </p>

        {/* Deadline + Status row */}
        <div className="flex items-center justify-between mb-3">
          <div
            className={`flex items-center gap-1.5 text-xs font-semibold ${expired ? "text-red-600" : "text-amber-600"}`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {countdown}
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
              expired
                ? "bg-red-50 text-red-600 border-red-200"
                : assignment.codeVisible
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {expired ? "Closed" : assignment.codeVisible ? "Open" : "Locked"}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 rounded-full bg-slate-100 overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${expired ? "from-red-400 to-red-600" : accent.bg}`}
            style={{ width: expired ? "100%" : "65%" }}
          />
        </div>
      </div>

      {/* ── Footer Action Buttons ── */}
      <div className="px-5 pb-5 pt-0 flex gap-2">
        <button
          onClick={handleView}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50
                     text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:border-slate-300
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View PDF
        </button>

        <button
          onClick={handleDownload}
          disabled={loading}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white
                      bg-gradient-to-r ${accent.bg} hover:opacity-90 shadow-sm
                      transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <svg
              className="animate-spin w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          )}
          {loading ? "Loading…" : "Download"}
        </button>
      </div>
    </div>
  );
}
