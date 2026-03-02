import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const location = useLocation();

  const { user, loading } = useSelector(
    (state) => state.auth
  );

  const userRole = user?.role;

  // 1️⃣ While auth state is loading
  if (loading) {
    return <div>Loading...</div>; // replace with spinner if you want
  }

  // 2️⃣ Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3️⃣ Role mismatch → unauthorized
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // 4️⃣ Authorized
  return children;
}