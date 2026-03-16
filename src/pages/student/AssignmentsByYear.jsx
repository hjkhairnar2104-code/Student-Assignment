import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentsBySubject, clearAssignments } from "../../store/assignmentSlice";
import { subjectMap } from "../../utils/subjectMap";
import AssignmentCard from "./AssignmentCard";
import SkeletonCard from "../../components/SkeletonCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTrail, animated } from "@react-spring/web";
import { motion, AnimatePresence } from "framer-motion";

export default function AssignmentsByYear() {
    const { year } = useParams();
    const dispatch = useDispatch();

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [listRef] = useAutoAnimate({ duration: 300 });

    const { assignmentsBySubject, loading, error } = useSelector(
        (state) => state.assignment
    );

    const yearData = subjectMap[year] || { "1": [], "2": [] };
    const sem1Subjects = yearData["1"] || [];
    const sem2Subjects = yearData["2"] || [];
    const hasSubjects = sem1Subjects.length > 0 || sem2Subjects.length > 0;

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

    const handleSubjectClick = (subj) => {
        setSelectedSubject(subj);
        dispatch(fetchAssignmentsBySubject(subj));
    };

    const currentAssignments = selectedSubject ? (assignmentsBySubject[selectedSubject] || []) : [];
    const numYear = Number(year);
    const filteredAssignments = currentAssignments.filter((a) => a.year === numYear);

    const yearLabels = { 1: "First Year", 2: "Second Year", 3: "Third Year", 4: "Fourth Year" };
    const displayYear = yearLabels[year] || `Year ${year}`;

    /* Spring trail for card grid */
    const trail = useTrail(filteredAssignments.length, {
        from: { opacity: 0, y: 30, scale: 0.95 },
        to:   { opacity: 1, y: 0,  scale: 1 },
        config: { mass: 1, tension: 280, friction: 24 },
        reset: true,
    });

    return (
        <div className="w-full flex flex-col md:flex-row gap-8">
            {/* ── Sidebar ── */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 p-4 sticky top-28">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                        {displayYear} Subjects
                    </h3>

                    {!hasSubjects ? (
                        <p className="text-sm text-slate-500 px-2 italic">No curriculum logged for this year.</p>
                    ) : (
                        <div ref={listRef} className="flex flex-col gap-5">
                            {[{ label: "Semester 1", subjects: sem1Subjects }, { label: "Semester 2", subjects: sem2Subjects }]
                                .filter(({ subjects }) => subjects.length > 0)
                                .map(({ label, subjects }) => (
                                    <div key={label}>
                                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 px-2">{label}</h4>
                                        <nav className="flex flex-col gap-1">
                                            {subjects.map((subj) => {
                                                const isSelected = selectedSubject === subj;
                                                return (
                                                    <motion.button
                                                        key={subj}
                                                        onClick={() => handleSubjectClick(subj)}
                                                        whileHover={{ x: isSelected ? 0 : 3 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all font-medium flex justify-between items-center ${
                                                            isSelected
                                                                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20"
                                                                : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                                                        }`}
                                                    >
                                                        <span>{subj}</span>
                                                        {isSelected && (
                                                            <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1">
                <div className="mb-8 border-b border-slate-200 pb-4">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {selectedSubject ? `${selectedSubject} Coursework` : `${displayYear} Coursework`}
                    </h2>
                    <p className="text-slate-500 mt-2">
                        View and download published assignments for {selectedSubject || "this year"}.
                    </p>
                </div>

                {/* Loading skeletons */}
                {loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-8 bg-red-50 text-red-700 border border-red-200 rounded-xl">
                        {error}
                    </div>
                )}

                {!loading && !error && selectedSubject && filteredAssignments.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-slate-50/80 rounded-2xl border border-dashed border-slate-300"
                    >
                        <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="text-lg font-semibold text-slate-900">No Assignments Found</h3>
                        <p className="text-slate-500 mt-1">Check back later or ask your instructor to upload coursework for {selectedSubject}.</p>
                    </motion.div>
                )}

                {/* Assignment cards with spring trail */}
                {!loading && !error && filteredAssignments.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {trail.map((style, i) => (
                            <animated.div key={filteredAssignments[i].id} style={style}>
                                <AssignmentCard assignment={filteredAssignments[i]} />
                            </animated.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
