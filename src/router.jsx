import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AssignmentList from "./pages/student/AssignmentList";
import AssignmentsByYear from "./pages/student/AssignmentsByYear";
import CreateAssignment from "./pages/teacher/CreateAssignment";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // 🏠 Default Landing Page
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // ===== STUDENT =====
      {
        path: "student",
        element: (
          <PrivateRoute role="ROLE_STUDENT">
            <Navigate to="/student/assignments" replace />
          </PrivateRoute>
        ),
      },
      {
        path: "student/assignments",
        element: (
          <PrivateRoute role="ROLE_STUDENT">
            <div className="w-full max-w-7xl mx-auto px-4 py-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">My Assignments</h2>
              <AssignmentList />
            </div>
          </PrivateRoute>
        ),
      },

      // ===== TEACHER =====
      {
        path: "teacher",
        element: (
          <PrivateRoute role="ROLE_TEACHER">
            <Navigate to="/teacher/create-assignment" replace />
          </PrivateRoute>
        ),
      },
      {
        path: "teacher/create-assignment",
        element: (
          <PrivateRoute role="ROLE_TEACHER">
            <CreateAssignment />
          </PrivateRoute>
        ),
      },

      // ===== NEW ROUTES =====
      {
        path: "aboutus",
        element: <AboutUs />
      },
      {
        path: "contactus",
        element: <ContactUs />
      },
      {
        path: "courseyear/:year",
        element: (
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <AssignmentsByYear />
          </div>
        )
      },

      { path: "*", element: <Navigate to="/login" /> },
    ],
  },
]);