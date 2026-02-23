import { useEffect, useState } from "react";
import { getStudentAssignments } from "../../api/assignmentApi";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentAssignments()
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load assignments");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-gray-400 animate-pulse">Loading...</p>;

  if (error)
    return (
      <div className="bg-red-900/40 text-red-300 p-4 rounded">
        {error}
      </div>
    );

  if (assignments.length === 0)
    return (
      <div className="bg-slate-800 text-gray-400 p-6 rounded text-center">
        No assignments available 🚀
      </div>
    );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {assignments.map((a) => (
        <AssignmentCard key={a.assignmentId} assignment={a} />
      ))}
    </div>
  );
}