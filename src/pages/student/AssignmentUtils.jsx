import { createSelector } from "@reduxjs/toolkit";

/* ===============================
   Selector: Is assignment NEW
   (within last 24 hours)
   =============================== */
const _selectIsNewAssignment = () =>
  createSelector(
    [(assignment) => assignment.createdAt],
    (createdAt) => {
      if (!createdAt) return false;

      const now = new Date();
      const created = new Date(createdAt);
      const diffHours = (now - created) / (1000 * 60 * 60);

      return diffHours < 24;
    }
  );

/* ===============================
   Selector: Countdown till deadline
   =============================== */
const _selectCountdown = () =>
  createSelector(
    [(assignment) => assignment.deadline],
    (deadline) => {
      if (!deadline) return "No deadline";

      const now = new Date();
      const end = new Date(deadline);
      const diff = end - now;

      if (diff <= 0) return "Expired";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      if (days > 0) return `${days}d ${hours}h left`;
      if (hours > 0) return `${hours}h ${minutes}m left`;

      return `${minutes}m left`;
    }
  );

/* ======================================================
   ✅ PUBLIC EXPORTS (what components actually import)
   ====================================================== */

// OLD-style helpers (so AssignmentCard works as-is)
export const isNewAssignment = (createdAt) =>
  _selectIsNewAssignment()({ createdAt });

export const getCountdown = (deadline) =>
  _selectCountdown()({ deadline });

// OPTIONAL: selector-style exports (for future use)
export const selectIsNewAssignment = _selectIsNewAssignment;
export const selectCountdown = _selectCountdown;