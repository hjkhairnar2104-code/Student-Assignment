export default function AssignmentCard({ assignment, onDownloadPdf }) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-1 overflow-hidden">

      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {assignment.title}
          </h3>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${assignment.codeVisible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {assignment.codeVisible ? "🔓 Unlocked" : "🔒 Locked"}
          </span>
        </div>

        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
          {assignment.description}
        </p>

        <div className="flex items-center gap-3 mt-5 pb-5 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <span className="text-gray-500">📅</span>
            <span>Deadline:</span>
            <span className="text-gray-200">{assignment.deadline}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          {assignment.assignmentPdfPath && (
            <button
              onClick={() => onDownloadPdf(assignment.id)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all duration-300 hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}