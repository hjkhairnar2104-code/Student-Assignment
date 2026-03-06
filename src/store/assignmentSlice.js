import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../api/api";

// ============================================
// ASYNC THUNKS
// ============================================

// ----- TEACHER -----

export const createAssignment = createAsyncThunk(
  'assignment/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post('/assignment/create', data);
      return res.data;
    } catch (err) {
      try {
        const res = await API.post('/api/assignment/create', data);
        return res.data;
      } catch {
        return rejectWithValue('Failed to create assignment');
      }
    }
  }
);

export const createAssignmentWithPdf = createAsyncThunk(
  'assignment/createWithPdf',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post('/assignment/create-with-pdf', formData);
      return res.data;
    } catch (err) {
      try {
        const res = await API.post('/api/assignment/create-with-pdf', formData);
        return res.data;
      } catch {
        return rejectWithValue('Failed to create assignment with PDF');
      }
    }
  }
);

export const fetchTeacherAssignments = createAsyncThunk(
  'assignment/fetchTeacher',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/assignment/teacher');
      return res.data;
    } catch {
      try {
        const res = await API.get('/api/assignment/teacher');
        return res.data;
      } catch {
        return rejectWithValue('Failed to fetch teacher assignments');
      }
    }
  }
);

// ----- STUDENT -----

export const fetchStudentSubjects = createAsyncThunk(
  'assignment/fetchSubjects',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/assignment/student/subjects');
      return res.data;
    } catch {
      try {
        const res = await API.get('/api/assignment/student/subjects');
        return res.data;
      } catch {
        return rejectWithValue('Failed to fetch subjects');
      }
    }
  }
);

export const fetchAssignmentsBySubject = createAsyncThunk(
  'assignment/fetchBySubject',
  async (subject, { rejectWithValue }) => {
    try {
      const res = await API.get('/assignment/student/by-subject', {
        params: { subject },
      });
      return { subject, assignments: res.data };
    } catch {
      try {
        const res = await API.get('/api/assignment/student/by-subject', {
          params: { subject },
        });
        return { subject, assignments: res.data };
      } catch {
        return rejectWithValue('Failed to fetch assignments');
      }
    }
  }
);

export const fetchStudentAssignments = createAsyncThunk(
  'assignment/fetchAllStudent',
  async (_, { rejectWithValue }) => {
    try {
      const subjectsRes = await API.get('/assignment/student/subjects');
      const subjects = subjectsRes.data;

      const responses = await Promise.all(
        subjects.map((s) =>
          API.get('/assignment/student/by-subject', { params: { subject: s } })
        )
      );

      return responses.flatMap(r => r.data);
    } catch {
      return rejectWithValue('Failed to fetch assignments');
    }
  }
);

// ----- COMMON -----

export const unlockCode = createAsyncThunk(
  'assignment/unlockCode',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.post(`/assignment/unlock-code/${id}`);
      return { id, message: res.data };
    } catch {
      try {
        const res = await API.post(`/api/assignment/unlock-code/${id}`);
        return { id, message: res.data };
      } catch {
        return rejectWithValue('Failed to unlock code');
      }
    }
  }
);
export const deleteAssignment = createAsyncThunk(
  "assignment/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/assignment/${id}`);
      return id;
    } catch {
      try {
        await API.delete(`/api/assignment/${id}`);
        return id;
      } catch {
        return rejectWithValue("Failed to delete assignment");
      }
    }
  }
);
export const downloadPdf = createAsyncThunk(
  'assignment/downloadPdf',
  async (id, { rejectWithValue }) => {
    try {
      let res;
      try {
        res = await API.get(`/file/assignment-pdf/${id}`, { responseType: 'blob' });
      } catch {
        res = await API.get(`/api/file/assignment-pdf/${id}`, { responseType: 'blob' });
      }

      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `assignment-${id}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return id;
    } catch {
      return rejectWithValue('Failed to download PDF');
    }
  }
);

// ============================================
// SLICE
// ============================================

const initialState = {
  teacherAssignments: [],
  subjects: [],
  assignments: [],
  assignmentsBySubject: {},
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
    // ✅ addCase FIRST
    builder
      .addCase(fetchStudentSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
      })
      .addCase(fetchAssignmentsBySubject.fulfilled, (state, action) => {
        state.assignmentsBySubject[action.payload.subject] =
          action.payload.assignments;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.teacherAssignments = state.teacherAssignments.filter(
          (a) => a.assignmentId !== action.payload
        )
      })
      .addCase(fetchStudentAssignments.fulfilled, (state, action) => {
        state.assignments = action.payload;
      })
      .addCase(fetchTeacherAssignments.fulfilled, (state, action) => {
        // If backend returns raw array
        if (Array.isArray(action.payload)) {
          state.teacherAssignments = action.payload;
        }
        // If backend returns ApiResponse { success, data }
        else if (action.payload?.data) {
          state.teacherAssignments = action.payload.data;
        }
        else {
          state.teacherAssignments = [];
        }
      })



    // ✅ addMatcher AFTER all addCase
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearMessages, clearAssignments } = assignmentSlice.actions;
export default assignmentSlice.reducer;