import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashBoard";
import TeacherDashboard from "./pages/TeacherDashBoard";

import AssignmentList from "./pages/student/AssignmentList";
import CreateAssignment from "./pages/teacher/CreateAssignment"; // ✅ FIX

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <PrivateRoute role="ROLE_STUDENT">
              <StudentDashboard />
            </PrivateRoute>
          }
        >
          <Route path="assignments" element={<AssignmentList />} />
        </Route>

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            <PrivateRoute role="ROLE_TEACHER">
              <TeacherDashboard />
            </PrivateRoute>
          }
        >
          <Route path="create-assignment" element={<CreateAssignment />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}