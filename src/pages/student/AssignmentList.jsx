import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentAssignments } from "../../store/assignmentSlice";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentList() {
  const dispatch = useDispatch();

  const { assignments, loading, error } = useSelector(
    (state) => state.assignment
  );

  useEffect(() => {
    dispatch(fetchStudentAssignments());
  }, [dispatch]);

  if (loading) return <p>Loading assignments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assignments.map((assignment, index) => (
        <AssignmentCard
          key={assignment.id || index}
          assignment={assignment}
        />
      ))}
    </div>
  );
}