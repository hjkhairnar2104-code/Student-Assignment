import { useState } from "react";
import {
  createAssignment,
  createAssignmentWithPdf,
} from "../../api/assignmentApi";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [deadline, setDeadline] = useState("");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (pdf) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("year", year);
        formData.append("semester", semester);
        formData.append("deadline", deadline);
        formData.append("pdf", pdf);

        await createAssignmentWithPdf(formData);
      } else {
        await createAssignment({
          title,
          description,
          year,
          semester,
          deadline,
        });
      }

      alert("Assignment created successfully 🎉");

      setTitle("");
      setDescription("");
      setYear("");
      setSemester("");
      setDeadline("");
      setPdf(null);
    } catch (err) {
      console.error(err);
      alert("Failed to create assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div
        className="
          bg-gradient-to-br from-[#0b1020] via-[#111836] to-[#0b1020]
          border border-slate-700/50
          rounded-3xl shadow-2xl
          p-10 text-white
        "
      >
        {/* ===== Header ===== */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-wide flex items-center gap-2">
            📝 Create Assignment
          </h2>
          <p className="text-sm opacity-70 mt-2">
            Publish assignments by selecting academic year and semester
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ===== Title ===== */}
          <div>
            <label className="block text-sm mb-2 opacity-70">
              Assignment Title
            </label>
            <input
              type="text"
              placeholder="e.g. Data Structures – Assignment 3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="
                w-full px-4 py-3 rounded-xl
                bg-slate-800 border border-slate-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

          {/* ===== Description ===== */}
          <div>
            <label className="block text-sm mb-2 opacity-70">
              Description
            </label>
            <textarea
              placeholder="Explain the assignment briefly..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="
                w-full px-4 py-3 rounded-xl
                bg-slate-800 border border-slate-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                resize-none
              "
            />
          </div>

          {/* ===== Year & Semester ===== */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2 opacity-70">
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              >
                <option value="">Select Year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Final Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 opacity-70">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-slate-800 border border-slate-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>
            </div>
          </div>

          {/* ===== Deadline ===== */}
          <div>
            <label className="block text-sm mb-2 opacity-70">
              Submission Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="
                w-full px-4 py-3 rounded-xl
                bg-slate-800 border border-slate-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

          {/* ===== PDF Upload ===== */}
          <div>
            <label className="block text-sm mb-3 opacity-70">
              Assignment PDF (optional)
            </label>

            <label
              className="
                flex items-center justify-between
                px-5 py-4 rounded-2xl cursor-pointer
                bg-slate-800 border border-dashed border-slate-600
                hover:border-indigo-500 transition
              "
            >
              <span className="text-sm opacity-80 truncate">
                {pdf ? `📄 ${pdf.name}` : "Click to upload assignment PDF"}
              </span>
              <span className="text-xs bg-indigo-600 px-4 py-1 rounded-full">
                Browse
              </span>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setPdf(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* ===== Submit ===== */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-4 rounded-2xl font-semibold
              bg-indigo-600 hover:bg-indigo-500
              transition disabled:opacity-60
              text-lg
            "
          >
            {loading ? "Creating Assignment..." : "🚀 Publish Assignment"}
          </button>
        </form>
      </div>
    </div>
  );
}