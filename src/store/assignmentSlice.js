import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../api/api";

// ============================================
// ASYNC THUNKS
// ============================================

// ===== TEACHER THUNKS =====

// Create Assignment (without PDF)
export const createAssignment = createAsyncThunk(
  'assignment/create',
  async (assignmentData, { rejectWithValue }) => {
    try {
      try {
        const response = await API.post(`/assignment/create`, assignmentData);
        return response.data;
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          const response = await API.post(`/api/assignment/create`, assignmentData);
          return response.data;
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.response?.data || 'Failed to create assignment');
    }
  }
);

// Create Assignment with PDF
export const createAssignmentWithPdf = createAsyncThunk(
  'assignment/createWithPdf',
  async (formData, { rejectWithValue }) => {
    try {
      try {
        const response = await API.post(`/assignment/create-with-pdf`, formData);
        return response.data;
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          const response = await API.post(`/api/assignment/create-with-pdf`, formData);
          return response.data;
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.response?.data || 'Failed to create assignment with PDF');
    }
  }
);

// Get Teacher's Assignments
export const fetchTeacherAssignments = createAsyncThunk(
  'assignment/fetchTeacher',
  async (_, { rejectWithValue }) => {
    try {
      try {
        const response = await API.get(`/assignment/teacher`);
        return response.data;
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          const response = await API.get(`/api/assignment/teacher`);
          return response.data;
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assignments');
    }
  }
);

// ===== STUDENT THUNKS =====

// Get Subjects for Student
export const fetchStudentSubjects = createAsyncThunk(
  'assignment/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      try {
        const response = await API.get(`/assignment/student/subjects`);
        return response.data;
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          const response = await API.get(`/api/assignment/student/subjects`);
          return response.data;
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch subjects');
    }
  }
);

// Get Assignments by Subject
export const fetchAssignmentsBySubject = createAsyncThunk(
  'assignment/fetchBySubject',
  async (subject, { rejectWithValue }) => {
    try {
      try {
        const response = await API.get(`/assignment/student/by-subject`, { params: { subject } });
        return { subject, assignments: response.data };
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          const response = await API.get(`/api/assignment/student/by-subject`, { params: { subject } });
          return { subject, assignments: response.data };
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assignments');
    }
  }
);

// Get All Student Assignments (across all subjects)
export const fetchStudentAssignments = createAsyncThunk(
  'assignment/fetchAllStudent',
  async (_, { rejectWithValue }) => {
    try {
      // First fetch all subjects
      let subjectsResponse;
      try {
        subjectsResponse = await API.get(`/assignment/student/subjects`);
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          subjectsResponse = await API.get(`/api/assignment/student/subjects`);
        } else {
          throw err;
        }
      }
      const subjects = subjectsResponse.data;

      // Then fetch assignments for each subject
      const assignmentsPromises = subjects.map(async (subject) => {
        try {
          const response = await API.get(`/assignment/student/by-subject`, { params: { subject } });
          return response.data;
        } catch (err) {
          if (err.response?.status === 404 || err.response?.status === 401) {
            const response = await API.get(`/api/assignment/student/by-subject`, { params: { subject } });
            return response.data;
          }
          throw err;
        }
      });

      const assignmentsArrays = await Promise.all(assignmentsPromises);
      const allAssignments = assignmentsArrays.flat();

      return allAssignments;
    } catch (error) {
      // Fallback: Just fetch generic assignments list if advanced subject aggregation fails endpoint format
      let fallbackRes;
      try {
        fallbackRes = await API.get(`/assignment/student`);
      } catch (err) {
        if (err.response && (err.response.status === 404 || err.response.status === 401)) {
          fallbackRes = await API.get(`/api/assignment/student`);
        } else {
          return rejectWithValue(error.response?.data?.message || 'Failed to fetch assignments');
        }
      }
      return fallbackRes.data;
    }
  }
);

// ===== COMMON THUNKS =====

// Unlock Code (Teacher only, but called from student view)
export const unlockCode = createAsyncThunk(
  'assignment/unlockCode',
  async (assignmentId, { rejectWithValue }) => {
    try {
      try {
        const response = await API.post(`/assignment/unlock-code/${assignmentId}`, {});
        return { assignmentId, message: response.data };
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          const response = await API.post(`/api/assignment/unlock-code/${assignmentId}`, {});
          return { assignmentId, message: response.data };
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unlock code');
    }
  }
);

// Check if Code is Visible
export const checkCodeVisible = createAsyncThunk(
  'assignment/checkCodeVisible',
  async (assignmentId, { rejectWithValue }) => {
    try {
      try {
        const response = await API.get(`/assignment/code-visible/${assignmentId}`);
        return { assignmentId, isVisible: response.data };
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401) {
          const response = await API.get(`/api/assignment/code-visible/${assignmentId}`);
          return { assignmentId, isVisible: response.data };
        }
        throw err;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check code visibility');
    }
  }
);

// Download PDF
export const downloadPdf = createAsyncThunk(
  'assignment/downloadPdf',
  async (assignmentId, { rejectWithValue }) => {
    try {
      let response;
      try {
        response = await API.get(`/file/assignment-pdf/${assignmentId}`, { responseType: 'blob' });
      } catch (err) {
        if (err.response?.status === 404) {
          response = await API.get(`/api/file/assignment-pdf/${assignmentId}`, { responseType: 'blob' });
        } else {
          throw err;
        }
      }

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `assignment-${assignmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      return { assignmentId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to download PDF');
    }
  }
);

// ============================================
// SLICE
// ============================================

const initialState = {
  // Teacher view
  teacherAssignments: [],

  // Student view
  subjects: [],
  assignments: [],
  assignmentsBySubject: {},

  // Common
  loading: false,
  error: null,
  success: null,
};

const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
    clearAssignments: (state) => {
      state.assignments = [];
      state.assignmentsBySubject = {};
      state.subjects = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== CREATE ASSIGNMENT =====
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Assignment Created Successfully";
        // Attempt to push to local array if it returns object directly instead of a message wrapper
        if (typeof action.payload === 'object' && !action.payload.message) {
          state.teacherAssignments.push(action.payload);
        }
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== CREATE ASSIGNMENT WITH PDF =====
      .addCase(createAssignmentWithPdf.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignmentWithPdf.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "PDF Assignment Created";
        if (typeof action.payload === 'object' && !action.payload.message) {
          state.teacherAssignments.push(action.payload);
        }
      })
      .addCase(createAssignmentWithPdf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH TEACHER ASSIGNMENTS =====
      .addCase(fetchTeacherAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherAssignments = action.payload;
      })
      .addCase(fetchTeacherAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH STUDENT SUBJECTS =====
      .addCase(fetchStudentSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchStudentSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH ASSIGNMENTS BY SUBJECT =====
      .addCase(fetchAssignmentsBySubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentsBySubject.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentsBySubject[action.payload.subject] = action.payload.assignments;
      })
      .addCase(fetchAssignmentsBySubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH ALL STUDENT ASSIGNMENTS =====
      .addCase(fetchStudentAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchStudentAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== UNLOCK CODE =====
      .addCase(unlockCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlockCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;

        // Update the assignment in both arrays
        const updateAssignment = (assignment) => {
          if (assignment.id === action.payload.assignmentId) {
            return { ...assignment, codeVisible: true };
          }
          return assignment;
        };

        state.assignments = state.assignments.map(updateAssignment);
        state.teacherAssignments = state.teacherAssignments.map(updateAssignment);

        // Update assignmentsBySubject
        Object.keys(state.assignmentsBySubject).forEach((subject) => {
          state.assignmentsBySubject[subject] = state.assignmentsBySubject[subject].map(updateAssignment);
        });
      })
      .addCase(unlockCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== CHECK CODE VISIBLE =====
      .addCase(checkCodeVisible.fulfilled, (state, action) => {
        const updateAssignment = (assignment) => {
          if (assignment.id === action.payload.assignmentId) {
            return { ...assignment, codeVisible: action.payload.isVisible };
          }
          return assignment;
        };

        state.assignments = state.assignments.map(updateAssignment);
        state.teacherAssignments = state.teacherAssignments.map(updateAssignment);

        Object.keys(state.assignmentsBySubject).forEach((subject) => {
          state.assignmentsBySubject[subject] = state.assignmentsBySubject[subject].map(updateAssignment);
        });
      });
  },
});

export const { clearMessages, clearAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;