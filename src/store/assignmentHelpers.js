// Helper functions for working with assignments

export const filterAssignmentsByYear = (assignments, year) => {
    return assignments.filter(a => a.year === year);
};

export const filterAssignmentsBySemester = (assignments, semester) => {
    return assignments.filter(a => a.semester === semester);
};

export const filterAssignmentsBySubject = (assignments, subject) => {
    return assignments.filter(a => a.subject === subject);
};

export const getActiveAssignments = (assignments) => {
    const now = new Date();
    return assignments.filter(a => new Date(a.deadline) > now);
};

export const getExpiredAssignments = (assignments) => {
    const now = new Date();
    return assignments.filter(a => new Date(a.deadline) <= now);
};

export const sortAssignmentsByDeadline = (assignments, ascending = true) => {
    return [...assignments].sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

export const formatDeadline = (deadline) => {
    if (!deadline) return "No Deadline Set";
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const getDeadlineStatus = (deadline) => {
    if (!deadline) return "no-deadline";
    const now = new Date();
    const dueDate = new Date(deadline);
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'expired';
    if (diffDays === 0) return 'due-today';
    if (diffDays <= 3) return 'approaching';
    return 'upcoming';
};
