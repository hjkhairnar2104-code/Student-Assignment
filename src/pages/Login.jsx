import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await dispatch(
        loginUser({ email, password })
      ).unwrap();

      if (res.role === "ROLE_TEACHER") {
        navigate("/teacher");
      } else if (res.role === "ROLE_STUDENT") {
        navigate("/student");
      } else {
        setError("Role not assigned. Contact admin.");
      }
    } catch (err) {
      setError(err || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-sm">
            <span className="text-2xl font-bold text-white">V</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="text-slate-500 mt-2">
            Please enter your details to sign in
          </p>
        </div>

        {/* Form Card */}
        <div className="clean-panel p-8">
          <form onSubmit={handleLogin} className="space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 block">
                Email Address
              </label>
              <input
                type="email"
                className="clean-input"
                placeholder="teacher@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-900 block">
                  Password
                </label>
                <Link to="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                className="clean-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="clean-button w-full h-11 text-base relative"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : "Sign in"}
              </span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-slate-900 hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}