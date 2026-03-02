import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAssignment,
  createAssignmentWithPdf,
} from "../../store/assignmentSlice";
import { subjectMap } from "../../utils/subjectMap";

export default function CreateAssignment() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.assignment);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pdf, setPdf] = useState(null);

  // The subjectMap is now imported globally for consistency across components

  // Determine available subjects based on selection
  const availableSubjects = (year && semester && subjectMap[year]?.[semester]) || [];

  // Reset subject when year or semester changes
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setSubject("");
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setSubject("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map strings to integers to satisfy backend schema
    const numYear = parseInt(year, 10);
    const numSemester = parseInt(semester, 10);

    try {
      if (pdf) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("year", numYear);
        formData.append("semester", numSemester);
        formData.append("subject", subject);
        formData.append("deadline", deadline);
        formData.append("pdf", pdf);

        await dispatch(createAssignmentWithPdf(formData)).unwrap();
      } else {
        await dispatch(
          createAssignment({
            title,
            description,
            year: numYear,
            semester: numSemester,
            subject,
            deadline,
          })
        ).unwrap();
      }

      alert("Assignment created successfully 🎉");

      setTitle("");
      setDescription("");
      setYear("");
      setSemester("");
      setSubject("");
      setDeadline("");
      setPdf(null);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="clean-panel p-8 sm:p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">📝 Create Assignment</h2>
          <p className="text-slate-500 mt-2">
            Publish coursework, materials, and deadlines for your students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 block">Assignment Title</label>
            <input
              placeholder="e.g., Assignment 1: React Fundamentals"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="clean-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 block">Target Year</label>
              <select
                value={year}
                onChange={handleYearChange}
                required
                className="clean-input cursor-pointer appearance-none bg-no-repeat"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="">Select Year...</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Final Year</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 block">Target Semester</label>
              <select
                value={semester}
                onChange={handleSemesterChange}
                required
                className="clean-input cursor-pointer appearance-none bg-no-repeat"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="">Select Semester...</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 block">Subject</label>
            {availableSubjects.length > 0 ? (
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="clean-input cursor-pointer appearance-none bg-no-repeat"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="">Select a subject...</option>
                {availableSubjects.map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            ) : (
              <input
                placeholder={year && semester ? "Enter Subject manually" : "Select Year & Semester first"}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={!(year && semester)}
                className="clean-input"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 block">Description</label>
            <textarea
              placeholder="Provide context, requirements, and instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="clean-input min-h-[100px] resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 block">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="clean-input text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-900 block">Assignment Document (PDF)</label>
            <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 flex items-center justify-center">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="clean-button w-full h-11 text-base mt-4"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </span>
            ) : "🚀 Publish Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
}