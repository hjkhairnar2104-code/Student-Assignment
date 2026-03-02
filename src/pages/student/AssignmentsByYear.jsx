import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentsBySubject, clearAssignments } from "../../store/assignmentSlice";
import { subjectMap } from "../../utils/subjectMap";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentsByYear() {
    const { year } = useParams();
    const dispatch = useDispatch();

    const [selectedSubject, setSelectedSubject] = useState(null);

    const { assignmentsBySubject, loading, error } = useSelector(
        (state) => state.assignment
    );

    const yearData = subjectMap[year] || { "1": [], "2": [] };
    const sem1Subjects = yearData["1"] || [];
    const sem2Subjects = yearData["2"] || [];
    const hasSubjects = sem1Subjects.length > 0 || sem2Subjects.length > 0;

    // Auto-select the first subject when the year changes and clear previous selections
    useEffect(() => {
        if (sem1Subjects.length > 0) {
            setSelectedSubject(sem1Subjects[0]);
            dispatch(fetchAssignmentsBySubject(sem1Subjects[0]));
        } else if (sem2Subjects.length > 0) {
            setSelectedSubject(sem2Subjects[0]);
            dispatch(fetchAssignmentsBySubject(sem2Subjects[0]));
        } else {
            setSelectedSubject(null);
            dispatch(clearAssignments());
        }
    }, [year, dispatch]);

    // Fetch assignments explicitly when a user clicks a subject in the sidebar
    const handleSubjectClick = (subj) => {
        setSelectedSubject(subj);
        dispatch(fetchAssignmentsBySubject(subj));
    };

    // Retrieve assignments for the currently searched subject from the Redux store
    const currentAssignments = selectedSubject ? (assignmentsBySubject[selectedSubject] || []) : [];

    // Filter the retrieved assignments to only show those that match the current yearly URL param
    const numYear = Number(year);
    const filteredAssignments = currentAssignments.filter((a) => a.year === numYear);

    // Labels for rendering
    const yearLabels = {
        1: "First Year",
        2: "Second Year",
        3: "Third Year",
        4: "Fourth Year"
    };

    const displayYear = yearLabels[year] || `Year ${year}`;

    return (
        <div className="w-full flex flex-col md:flex-row gap-8">
            {/* Left Sidebar - Subject List */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                        {displayYear} Subjects
                    </h3>

                    {!hasSubjects ? (
                        <p className="text-sm text-slate-500 px-2 italic">No curriculum logged for this year.</p>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {/* Semester 1 Group */}
                            {sem1Subjects.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-2">Semester 1</h4>
                                    <nav className="flex flex-col gap-1">
                                        {sem1Subjects.map((subj) => {
                                            const isSelected = selectedSubject === subj;
                                            return (
                                                <button
                                                    key={subj}
                                                    onClick={() => handleSubjectClick(subj)}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors font-medium flex justify-between items-center
                                                        ${isSelected
                                                            ? "bg-slate-900 text-white shadow-sm"
                                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                        }`}
                                                >
                                                    <span>{subj}</span>
                                                    {isSelected && (
                                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            )}

                            {/* Semester 2 Group */}
                            {sem2Subjects.length > 0 && (
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-2">Semester 2</h4>
                                    <nav className="flex flex-col gap-1">
                                        {sem2Subjects.map((subj) => {
                                            const isSelected = selectedSubject === subj;
                                            return (
                                                <button
                                                    key={subj}
                                                    onClick={() => handleSubjectClick(subj)}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors font-medium flex justify-between items-center
                                                        ${isSelected
                                                            ? "bg-slate-900 text-white shadow-sm"
                                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                        }`}
                                                >
                                                    <span>{subj}</span>
                                                    {isSelected && (
                                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area - Grid */}
            <div className="flex-1">
                <div className="mb-8 border-b border-slate-200 pb-4">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {selectedSubject ? `${selectedSubject} Coursework` : `${displayYear} Coursework`}
                    </h2>
                    <p className="text-slate-500 mt-2">
                        View and download published assignments for {selectedSubject || 'this year'}.
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-8 bg-red-50 text-red-700 border border-red-200 rounded-md">
                        {error}
                    </div>
                )}

                {!loading && !error && selectedSubject && filteredAssignments.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <h3 className="text-lg font-medium text-slate-900">No Assignments Found</h3>
                        <p className="text-slate-500 mt-1">Check back later or ask your instructor to upload coursework for {selectedSubject}.</p>
                    </div>
                )}

                {!loading && !error && filteredAssignments.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredAssignments.map((assignment) => (
                            <AssignmentCard
                                key={assignment.id}
                                assignment={assignment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
