// ===============================
// Check if assignment is NEW
// (within last 24 hours)
// ===============================
export const isNewAssignment = (createdAt) => {
  if (!createdAt) return false;

  const now = new Date();
  const created = new Date(createdAt);

  const diffHours = (now - created) / (1000 * 60 * 60);

  return diffHours < 24;
};

// ===============================
// Countdown till deadline
// ===============================
export const getCountdown = (deadline) => {
  if (!deadline) return "No deadline";

  const now = new Date();
  const end = new Date(deadline);
  const diff = end - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) {
    return `${days}d ${hours}h left`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m left`;
  }

  return `${minutes}m left`;
};