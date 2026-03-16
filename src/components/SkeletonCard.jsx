/**
 * SkeletonCard — shimmer placeholder card shown while assignment data loads.
 * Matches the approximate shape/size of student AssignmentCard.
 */
export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden relative">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-slate-100/80 to-transparent" />
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="h-5 bg-slate-100 rounded-lg w-3/4" />
                <div className="h-5 w-14 bg-indigo-50 rounded-full" />
            </div>
            {/* Subject */}
            <div className="h-4 bg-slate-100 rounded-lg w-1/2 mb-3" />
            {/* Desc lines */}
            <div className="space-y-2 mb-5">
                <div className="h-3 bg-slate-100 rounded-lg w-full" />
                <div className="h-3 bg-slate-100 rounded-lg w-5/6" />
            </div>
            {/* Deadline badge */}
            <div className="h-4 bg-orange-50 rounded-full w-24 mb-5" />
            {/* Button */}
            <div className="h-9 bg-slate-100 rounded-xl w-full" />
        </div>
    );
}
