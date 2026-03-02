import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from "../api/api";

// ============================================
// ASYNC THUNKS
// ============================================

// Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // The old auth route could be `/auth/login` or `/api/auth/login`. 
      // We will try `/auth/login` first, and if 404, we will try `/api/auth/login`.
      let response;
      try {
        response = await API.post(`/auth/login`, { email, password });
      } catch (err) {
        if (err.response && (err.response.status === 404 || err.response.status === 401)) {
          response = await API.post(`/api/auth/login`, { email, password });
        } else {
          throw err;
        }
      }

      const resData = response.data;

      // Support multiple token shapes (jwt vs token)
      const token = resData.token || resData.jwt;

      // Support multiple role shapes (res.role vs res.user.role)
      const role = resData.role || (resData.user && resData.user.role);
      const userEmail = resData.email || (resData.user && resData.user.email);
      const name = resData.name || (resData.user && resData.user.name);

      if (token) localStorage.setItem('token', token);
      if (role) localStorage.setItem('role', role);
      if (userEmail) localStorage.setItem('email', userEmail);
      if (name) localStorage.setItem('name', name);
      if (resData.year) localStorage.setItem('year', resData.year);
      if (resData.semester) localStorage.setItem('semester', resData.semester);

      // Make sure we pass the normalized role back to the Login.jsx
      return { ...resData, role, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.response?.data || 'Login failed');
    }
  }
);

// Signup User
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      let response;
      try {
        response = await API.post(`/api/auth/register`, userData);
      } catch (err) {
        if (err.response && (err.response.status === 404 || err.response.status === 401)) {
          response = await API.post(`/auth/register`, userData);
        } else {
          throw err;
        }
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.response?.data || 'Signup failed');
    }
  }
);

// Get Current User
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return rejectWithValue('No token found');

      let response;
      try {
        response = await API.get(`/auth/me`);
      } catch (err) {
        if (err.response && (err.response.status === 404 || err.response.status === 401)) {
          response = await API.get(`/api/auth/me`);
        } else {
          throw err;
        }
      }
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('year');
      localStorage.removeItem('semester');
      return rejectWithValue(error.response?.data?.message || 'Failed to get user');
    }
  }
);

// ============================================
// SLICE
// ============================================

const initialState = {
  user: localStorage.getItem('email') ? {
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
    name: localStorage.getItem('name'),
    year: localStorage.getItem('year') ? parseInt(localStorage.getItem('year'), 10) : null,
    semester: localStorage.getItem('semester') ? parseInt(localStorage.getItem('semester'), 10) : null,
  } : null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('year');
      localStorage.removeItem('semester');

      // Reset state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = {
          email: action.payload.email,
          role: action.payload.role,
          name: action.payload.name,
          year: action.payload.year,
          semester: action.payload.semester,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;