// src/api/assignmentApi.js
import API from "./axios";

// ===============================
// STUDENT VIEW ASSIGNMENTS (AUTO)
// ===============================
export const getStudentAssignments = () => {
  return API.get("/assignment/student");
};

// ===============================
// DOWNLOAD ASSIGNMENT PDF
// ===============================
export const downloadAssignmentPdf = (assignmentId) =>
  API.get(`/file/assignment-pdf/${assignmentId}`, {
    responseType: "blob",
  });

// ===============================
// CREATE ASSIGNMENT (WITHOUT PDF)
// ===============================
export const createAssignment = (data) => {
  return API.post("/assignment/create", {
    ...data,
    year: Number(data.year),
  });
};

// ===============================
// CREATE ASSIGNMENT (WITH PDF)
// ===============================
export const createAssignmentWithPdf = (formData) => {
  return API.post("/assignment/create-with-pdf", formData);
};