export default function AssignmentCard({ assignment, onDownloadPdf }) {
  return (
    <div className="border border-slate-700 rounded-lg p-4 bg-slate-900">

      <h3 className="text-lg font-semibold text-white">
        {assignment.title}
      </h3>

      <p className="text-sm text-slate-400 mt-1">
        {assignment.description}
      </p>

      <div className="flex justify-between mt-3 text-sm text-slate-400">
        <span>Deadline: {assignment.deadline}</span>
        <span>
          {assignment.codeVisible ? "Code Unlocked" : "Code Locked"}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        {assignment.assignmentPdfPath && (
          <button
            onClick={() => onDownloadPdf(assignment.id)}
            className="px-3 py-1.5 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}