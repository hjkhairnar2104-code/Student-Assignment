import { createSelector } from '@reduxjs/toolkit';

// Base selectors
export const selectAuth = (state) => state.auth;
export const selectAssignment = (state) => state.assignment;

// Auth selectors
export const selectUser = createSelector([selectAuth], (auth) => auth.user);
export const selectIsAuthenticated = createSelector([selectAuth], (auth) => auth.isAuthenticated);
export const selectUserRole = createSelector([selectUser], (user) => user?.role);
export const selectUserYear = createSelector([selectUser], (user) => user?.year);
export const selectUserSemester = createSelector([selectUser], (user) => user?.semester);
export const selectAuthLoading = createSelector([selectAuth], (auth) => auth.loading);
export const selectAuthError = createSelector([selectAuth], (auth) => auth.error);

// Assignment selectors
export const selectAssignments = createSelector([selectAssignment], (assignment) => assignment.assignments);
export const selectTeacherAssignments = createSelector([selectAssignment], (assignment) => assignment.teacherAssignments);
export const selectSubjects = createSelector([selectAssignment], (assignment) => assignment.subjects);
export const selectAssignmentsBySubject = createSelector([selectAssignment], (assignment) => assignment.assignmentsBySubject);
export const selectAssignmentLoading = createSelector([selectAssignment], (assignment) => assignment.loading);
export const selectAssignmentError = createSelector([selectAssignment], (assignment) => assignment.error);

// Derived selectors
export const selectAssignmentsForCurrentStudent = createSelector(
    [selectAssignments, selectUserYear, selectUserSemester],
    (assignments, year, semester) => {
        return assignments.filter(a => a.year === year && a.semester === semester);
    }
);

export const selectSubjectsWithAssignments = createSelector(
    [selectSubjects, selectAssignmentsBySubject],
    (subjects, assignmentsBySubject) => {
        return subjects.map(subject => ({
            subject,
            count: assignmentsBySubject[subject]?.length || 0,
            assignments: assignmentsBySubject[subject] || [],
        }));
    }
);

export const selectUpcomingAssignments = createSelector(
    [selectAssignments],
    (assignments) => {
        const now = new Date();
        return assignments
            .filter(a => new Date(a.deadline) > now)
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
);

export const selectOverdueAssignments = createSelector(
    [selectAssignments],
    (assignments) => {
        const now = new Date();
        return assignments
            .filter(a => new Date(a.deadline) <= now)
            .sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    }
);
